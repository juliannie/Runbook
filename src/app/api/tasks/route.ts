// src/app/api/tasks/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";
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
  try {
    const user = await requireAuth();

    const tasks = await prisma.task.findMany({
      where: { ownerId: user.id },
      orderBy: { id: "desc" }, // adjust if you later add createdAt
    });

    return NextResponse.json(tasks);
  } catch (err) {
    const message = (err as Error).message || "Internal Server Error";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAuth();

    const body = await req.json().catch(() => null);
    const parsed = CreateTaskSchema.safeParse(body);
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
        ownerId: user.id, // ← always bind to the current user
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    const message = (err as Error).message || "Internal Server Error";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
