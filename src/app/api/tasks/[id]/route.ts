export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const FrequencyEnum = z.enum(["D", "W", "M", "Q", "Y"]);
const UpdateTaskSchema = z.object({
  task: z.string().min(1).optional(),
  description: z.string().optional(),
  frequency: FrequencyEnum.optional(),
  displayDay: z.array(z.number().int()).optional(),
  deadline: z.array(z.number().int()).optional(),
  status: z.string().optional(),
  assignedTo: z.string().optional(),
  comment: z.string().optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const task = await prisma.task.findFirst({
    where: { id: params.id, ownerId: userId },
  });
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(task);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = UpdateTaskSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const updated = await prisma.task.updateMany({
    where: { id: params.id, ownerId: userId },
    data: {
      ...parsed.data,
      ...(parsed.data.displayDay && {
        displayDay: parsed.data.displayDay as any,
      }),
      ...(parsed.data.deadline && { deadline: parsed.data.deadline as any }),
    },
  });

  if (updated.count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const task = await prisma.task.findFirst({
    where: { id: params.id, ownerId: userId },
  });

  return NextResponse.json(task);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const deleted = await prisma.task.deleteMany({
    where: { id: params.id, ownerId: userId },
  });
  if (deleted.count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
