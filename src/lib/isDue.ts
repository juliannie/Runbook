import { Task } from "@/Types/types";
import {
  isBusinessDay,
  matchesNthBusinessDay,
  toUtcMidnight,
} from "@/lib/bizday";

export function isDue(dateUTC: Date, task: Task): boolean {
  const today = toUtcMidnight(dateUTC);

  // ALL tasks are business days only (Monday-Friday)
  if (!isBusinessDay(today)) {
    return false;
  }

  switch (task.frequency) {
    case "D": {
      // Daily: every business day
      return true;
    }
    case "W": {
      // Weekly: match when today is the n-th business day of the week
      // displayDay[0] = 1st business day of week (Monday), 2 = Tuesday, etc.
      const businessDayOfWeek = getBusinessDayOfWeek(today);
      return (task.displayDay ?? []).includes(businessDayOfWeek);
    }
    case "M": {
      // Monthly: match when today is the n-th business day of the month
      return (task.displayDay ?? []).some((n) =>
        matchesNthBusinessDay(today, n, "M")
      );
    }
    case "Q": {
      // Quarterly: match when today is the n-th business day of the quarter
      return (task.displayDay ?? []).some((n) =>
        matchesNthBusinessDay(today, n, "Q")
      );
    }
    case "Y": {
      // Yearly: match when today is the n-th business day of the year
      return (task.displayDay ?? []).some((n) =>
        matchesNthBusinessDay(today, n, "Y")
      );
    }
  }
}

function getBusinessDayOfWeek(dateUTC: Date): number {
  // Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5
  const day = dateUTC.getUTCDay();
  return day === 0 ? 5 : day; // Sunday becomes 5, but we already check isBusinessDay
}
