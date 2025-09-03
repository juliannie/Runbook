export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const FrequencyEnum = z.enum(["D", "W", "M", "Q", "Y"]);
const CreateTaskSchema = z.object({
  task: z.string().min(1),
  description: z.string().default(""),
  frequency: FrequencyEnum,
  displayDay: z.array(z.number().int()).default([]), // stored as JSON
  deadline: z.array(z.number().int()).default([]), // stored as JSON
  status: z.string().default("pending"),
  assignedTo: z.string().default(""),
  comment: z.string().default(""),
});

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const tasks = await prisma.task.findMany({
    where: { ownerId: userId },
    orderBy: { id: "desc" },
  });

  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = CreateTaskSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const created = await prisma.task.create({
    data: {
      task: data.task,
      description: data.description,
      frequency: data.frequency,
      displayDay: data.displayDay as any,
      deadline: data.deadline as any,
      status: data.status,
      assignedTo: data.assignedTo,
      comment: data.comment,
      ownerId: userId,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
