export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Frequency = "D" | "W" | "M" | "Q" | "Y";

function isWeekend(date: Date) {
  const d = date.getUTCDay(); // 0=Sun..6=Sat
  return d === 0 || d === 6;
}

function addDaysUTC(date: Date, n: number) {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + n);
  return d;
}

function startOfMonthUTC(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}
function endOfMonthUTC(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));
}

function startOfQuarterUTC(date: Date) {
  const qStartMonth = Math.floor(date.getUTCMonth() / 3) * 3;
  return new Date(Date.UTC(date.getUTCFullYear(), qStartMonth, 1));
}
function endOfQuarterUTC(date: Date) {
  const qStart = startOfQuarterUTC(date);
  const qEnd = new Date(
    Date.UTC(qStart.getUTCFullYear(), qStart.getUTCMonth() + 3, 0)
  );
  return qEnd;
}

function startOfYearUTC(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
}
function endOfYearUTC(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), 12, 0));
}

function listWorkingDays(start: Date, end: Date) {
  // inclusive range by calendar day
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
}

function isoWeekday(date: Date) {
  // 1=Mon..7=Sun
  const day = date.getUTCDay();
  return day === 0 ? 7 : day;
}

function isDueToday(
  todayUTC: Date,
  frequency: Frequency,
  displayDay: number[] // business-day indices per frequency unit; negatives allowed
): boolean {
  if (frequency === "D") {
    // every working day
    return !isWeekend(todayUTC);
  }

  if (frequency === "W") {
    // displayDay contains ISO weekdays (1=Mon..7=Sun). Allow -1 to mean "last working day of week" (Fri)
    const wd = isoWeekday(todayUTC);
    const normalized = new Set<number>();
    for (const n of displayDay ?? []) {
      if (n === -1) normalized.add(5); // Fri as last working day
      else normalized.add(n);
    }
    return normalized.has(wd);
  }

  if (frequency === "M") {
    const start = startOfMonthUTC(todayUTC);
    const end = endOfMonthUTC(todayUTC);
    const workdays = listWorkingDays(start, end);
    // map positives and negatives to 1-based indices
    const indices = new Set<number>(
      (displayDay ?? []).map((n) => (n > 0 ? n : workdays.length + 1 + n))
    );
    const idxToday = workdays.findIndex(
      (d) =>
        d.getUTCFullYear() === todayUTC.getUTCFullYear() &&
        d.getUTCMonth() === todayUTC.getUTCMonth() &&
        d.getUTCDate() === todayUTC.getUTCDate()
    );
    return idxToday >= 0 && indices.has(idxToday + 1); // 1-based
  }

  if (frequency === "Q") {
    const start = startOfQuarterUTC(todayUTC);
    const end = endOfQuarterUTC(todayUTC);
    const workdays = listWorkingDays(start, end);
    const indices = new Set<number>(
      (displayDay ?? []).map((n) => (n > 0 ? n : workdays.length + 1 + n))
    );
    const idxToday = workdays.findIndex(
      (d) =>
        d.getUTCFullYear() === todayUTC.getUTCFullYear() &&
        d.getUTCMonth() === todayUTC.getUTCMonth() &&
        d.getUTCDate() === todayUTC.getUTCDate()
    );
    return idxToday >= 0 && indices.has(idxToday + 1);
  }

  if (frequency === "Y") {
    const start = startOfYearUTC(todayUTC);
    const end = endOfYearUTC(todayUTC);
    const workdays = listWorkingDays(start, end);
    const indices = new Set<number>(
      (displayDay ?? []).map((n) => (n > 0 ? n : workdays.length + 1 + n))
    );
    const idxToday = workdays.findIndex(
      (d) =>
        d.getUTCFullYear() === todayUTC.getUTCFullYear() &&
        d.getUTCMonth() === todayUTC.getUTCMonth() &&
        d.getUTCDate() === todayUTC.getUTCDate()
    );
    return idxToday >= 0 && indices.has(idxToday + 1);
  }

  return false;
}

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date(); // server time; we evaluate in UTC
  const todayUTC = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );

  // Pull only this user's tasks
  const tasks = await prisma.task.findMany({
    where: { ownerId: userId },
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
}
