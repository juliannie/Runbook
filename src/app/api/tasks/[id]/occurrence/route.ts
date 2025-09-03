export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Query occurrences for a task (optionally by date)
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const dateUTCParam = searchParams.get("dateUTC"); // optional

  // Verify task belongs to user (prevents leaking someone's taskId)
  const task = await prisma.task.findFirst({
    where: { id: params.id, ownerId: userId },
    select: { id: true },
  });
  if (!task)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  let where: any = { taskId: params.id, ownerId: userId };
  if (dateUTCParam) {
    const date = new Date(dateUTCParam);
    if (Number.isNaN(date.getTime())) {
      return NextResponse.json({ error: "Invalid dateUTC" }, { status: 400 });
    }
    const start = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    where.dateUTC = { gte: start, lt: end };
  }

  const occurrences = await prisma.taskOccurrence.findMany({
    where,
    orderBy: { dateUTC: "asc" },
  });

  return NextResponse.json(occurrences);
}

// Upsert an occurrence for a task+dateUTC
const UpsertOccurrenceSchema = z.object({
  dateUTC: z.string(), // ISO date/time; we normalize to UTC day midnight
  status: z.enum(["pending", "processing", "completed", "failed"]).optional(),
  assigneeName: z.string().optional(),
  comment: z.string().optional(),
  completedAt: z.string().optional(), // ISO
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = UpsertOccurrenceSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Verify task belongs to user
  const task = await prisma.task.findFirst({
    where: { id: params.id, ownerId: userId },
    select: { id: true },
  });
  if (!task)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  // Normalize date to midnight UTC
  const at = new Date(parsed.data.dateUTC);
  if (Number.isNaN(at.getTime())) {
    return NextResponse.json({ error: "Invalid dateUTC" }, { status: 400 });
  }
  const dateUTC = new Date(
    Date.UTC(at.getUTCFullYear(), at.getUTCMonth(), at.getUTCDate())
  );

  const occurrence = await prisma.taskOccurrence.upsert({
    where: { taskId_dateUTC: { taskId: task.id, dateUTC } },
    update: {
      status: parsed.data.status,
      assigneeName: parsed.data.assigneeName,
      comment: parsed.data.comment,
      completedAt: parsed.data.completedAt
        ? new Date(parsed.data.completedAt)
        : undefined,
      ownerId: userId,
    },
    create: {
      taskId: task.id,
      dateUTC,
      status: parsed.data.status ?? "pending",
      assigneeName: parsed.data.assigneeName,
      comment: parsed.data.comment,
      completedAt: parsed.data.completedAt
        ? new Date(parsed.data.completedAt)
        : undefined,
      ownerId: userId,
    },
  });

  return NextResponse.json(occurrence, { status: 201 });
}

// Partial update an occurrence (by dateUTC)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = UpsertOccurrenceSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Verify task belongs to user
  const task = await prisma.task.findFirst({
    where: { id: params.id, ownerId: userId },
    select: { id: true },
  });
  if (!task)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  const at = new Date(parsed.data.dateUTC);
  if (Number.isNaN(at.getTime())) {
    return NextResponse.json({ error: "Invalid dateUTC" }, { status: 400 });
  }
  const dateUTC = new Date(
    Date.UTC(at.getUTCFullYear(), at.getUTCMonth(), at.getUTCDate())
  );

  const updated = await prisma.taskOccurrence.updateMany({
    where: { taskId: task.id, dateUTC, ownerId: userId },
    data: {
      status: parsed.data.status,
      assigneeName: parsed.data.assigneeName,
      comment: parsed.data.comment,
      completedAt: parsed.data.completedAt
        ? new Date(parsed.data.completedAt)
        : undefined,
    },
  });

  if (updated.count === 0) {
    return NextResponse.json(
      { error: "Occurrence not found" },
      { status: 404 }
    );
  }

  const occurrence = await prisma.taskOccurrence.findFirst({
    where: { taskId: task.id, dateUTC, ownerId: userId },
  });
  return NextResponse.json(occurrence);
}
