// src/app/api/task-occurrences/route.ts
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/task-occurrences?dateUTC=2025-09-03
 * Returns occurrences for the signed-in user for the given UTC calendar day.
 */
export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const dateUTCParam = searchParams.get("dateUTC");
    if (!dateUTCParam) {
      return NextResponse.json(
        {
          error: "dateUTC parameter is required (e.g. 2025-09-03 or ISO date)",
        },
        { status: 400 }
      );
    }

    // Normalize to the UTC day [00:00, 24:00)
    const parsed = new Date(dateUTCParam);
    if (Number.isNaN(parsed.getTime())) {
      return NextResponse.json(
        { error: "Invalid dateUTC. Use an ISO date like 2025-09-03." },
        { status: 400 }
      );
    }

    const y = parsed.getUTCFullYear();
    const m = parsed.getUTCMonth();
    const d = parsed.getUTCDate();
    const dayStart = new Date(Date.UTC(y, m, d, 0, 0, 0, 0));
    const dayEnd = new Date(Date.UTC(y, m, d + 1, 0, 0, 0, 0));

    const occurrences = await prisma.taskOccurrence.findMany({
      where: {
        ownerId: userId, // tenant isolation
        dateUTC: { gte: dayStart, lt: dayEnd },
      },
      include: { task: true },
      orderBy: { dateUTC: "asc" },
    });

    return NextResponse.json(occurrences);
  } catch (err) {
    console.error("[task-occurrences][GET]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
