// src/app/api/mytasks/route.ts
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isDue } from "@/lib/isDue.server";

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Evaluate “today” in UTC midnight
    const now = new Date();
    const todayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );

    // Only fetch this user's tasks
    const tasks = await prisma.task.findMany({
      where: { ownerId: userId },
      orderBy: { id: "desc" },
    });

    // Reuse shared server-only logic (supports negatives, business days)
    const dueToday = tasks.filter((t) => isDue(todayUTC, t as any));

    return NextResponse.json(dueToday);
  } catch (err) {
    console.error("[mytasks][GET]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
