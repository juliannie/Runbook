// src/app/api/mytasks/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";

type Frequency = "D" | "W" | "M" | "Q" | "Y";

// --- Working-day utilities (UTC-safe) ---
const isWeekend = (date: Date) => {
  const d = date.getUTCDay(); // 0=Sun..6=Sat
  return d === 0 || d === 6;
};

const addDaysUTC = (date: Date, n: number) => {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + n);
  return d;
};

const startOfMonthUTC = (date: Date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
const endOfMonthUTC = (date: Date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));

const startOfQuarterUTC = (date: Date) => {
  const qStartMonth = Math.floor(date.getUTCMonth() / 3) * 3;
  return new Date(Date.UTC(date.getUTCFullYear(), qStartMonth, 1));
};
const endOfQuarterUTC = (date: Date) => {
  const qStart = startOfQuarterUTC(date);
  return new Date(
    Date.UTC(qStart.getUTCFullYear(), qStart.getUTCMonth() + 3, 0)
  );
};

const startOfYearUTC = (date: Date) =>
  new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
const endOfYearUTC = (date: Date) =>
  new Date(Date.UTC(date.getUTCFullYear(), 12, 0));

const listWorkingDays = (start: Date, end: Date) => {
  const days: Date[] = [];
  let d = new Date(
    Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())
  );
  const last = new Date(
    Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate())
  );
  while (d <= last) {
    if (!isWeekend(d)) days.push(new Date(d));
    d = addDaysUTC(d, 1);
  }
  return days;
};

const isoWeekday = (date: Date) => {
  // 1=Mon..7=Sun
  const day = date.getUTCDay();
  return day === 0 ? 7 : day;
};

// --- Due-today logic (supports negatives: -1 last workday, etc.) ---
function isDueToday(
  todayUTC: Date,
  frequency: Frequency,
  displayDay: number[] = []
): boolean {
  if (frequency === "D") {
    return !isWeekend(todayUTC);
  }

  if (frequency === "W") {
    // ISO weekdays (1..7); treat -1 as "last working day" (Fri)
    const wd = isoWeekday(todayUTC);
    const normalized = new Set<number>();
    for (const n of displayDay) {
      if (n === -1) normalized.add(5); // Friday as last working day
      else normalized.add(n);
    }
    return normalized.has(wd);
  }

  const calcByWorkIndex = (start: Date, end: Date) => {
    const workdays = listWorkingDays(start, end);
    const indices = new Set<number>(
      displayDay.map((n) => (n > 0 ? n : workdays.length + 1 + n))
    );
    const idxToday = workdays.findIndex(
      (d) =>
        d.getUTCFullYear() === todayUTC.getUTCFullYear() &&
        d.getUTCMonth() === todayUTC.getUTCMonth() &&
        d.getUTCDate() === todayUTC.getUTCDate()
    );
    return idxToday >= 0 && indices.has(idxToday + 1); // 1-based
  };

  if (frequency === "M") {
    return calcByWorkIndex(startOfMonthUTC(todayUTC), endOfMonthUTC(todayUTC));
  }
  if (frequency === "Q") {
    return calcByWorkIndex(
      startOfQuarterUTC(todayUTC),
      endOfQuarterUTC(todayUTC)
    );
  }
  if (frequency === "Y") {
    return calcByWorkIndex(startOfYearUTC(todayUTC), endOfYearUTC(todayUTC));
  }

  return false;
}

export async function GET() {
  try {
    const user = await requireAuth();

    // Evaluate "today" in UTC (drop time)
    const now = new Date();
    const todayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );

    // Only this user's tasks
    const tasks = await prisma.task.findMany({
      where: { ownerId: user.id },
      orderBy: { id: "desc" },
    });

    const dueToday = tasks.filter((t) =>
      isDueToday(
        todayUTC,
        t.frequency as Frequency,
        (t.displayDay as any as number[]) ?? []
      )
    );

    return NextResponse.json(dueToday);
  } catch (err) {
    const message = (err as Error).message || "Internal Server Error";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
