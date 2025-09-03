export type Period = "M" | "Q" | "Y";

export function toUtcMidnight(date: Date): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

export function isWeekend(dateUTC: Date): boolean {
  const day = dateUTC.getUTCDay();
  return day === 0 || day === 6; // Sun=0, Sat=6
}

export function isBusinessDay(dateUTC: Date): boolean {
  return !isWeekend(dateUTC);
}

export function isoWeekday(dateUTC: Date): number {
  const d = dateUTC.getUTCDay();
  return d === 0 ? 7 : d; // Monday=1..Sunday=7
}

export function listBusinessDaysInMonth(year: number, month0: number): Date[] {
  const dates: Date[] = [];
  const last = new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate();
  for (let d = 1; d <= last; d++) {
    const dt = new Date(Date.UTC(year, month0, d));
    if (isBusinessDay(dt)) dates.push(dt);
  }
  return dates;
}

export function listBusinessDaysInQuarter(
  year: number,
  quarterIndex0: number
): Date[] {
  const startMonth = quarterIndex0 * 3;
  let result: Date[] = [];
  for (let m = 0; m < 3; m++) {
    result = result.concat(listBusinessDaysInMonth(year, startMonth + m));
  }
  return result;
}

export function listBusinessDaysInYear(year: number): Date[] {
  let result: Date[] = [];
  for (let m = 0; m < 12; m++) {
    result = result.concat(listBusinessDaysInMonth(year, m));
  }
  return result;
}

export function matchesNthBusinessDay(
  dateUTC: Date,
  n: number,
  period: Period
): boolean {
  if (n === 0) return false;
  const year = dateUTC.getUTCFullYear();
  const month0 = dateUTC.getUTCMonth();
  const quarter0 = Math.floor(month0 / 3);

  let days: Date[] = [];
  if (period === "M") days = listBusinessDaysInMonth(year, month0);
  if (period === "Q") days = listBusinessDaysInQuarter(year, quarter0);
  if (period === "Y") days = listBusinessDaysInYear(year);

  if (days.length === 0) return false;

  let index: number;
  if (n > 0) index = n - 1;
  else index = days.length + n; // n negative

  if (index < 0 || index >= days.length) return false;

  const target = days[index];
  return (
    target.getUTCFullYear() === dateUTC.getUTCFullYear() &&
    target.getUTCMonth() === dateUTC.getUTCMonth() &&
    target.getUTCDate() === dateUTC.getUTCDate()
  );
}
