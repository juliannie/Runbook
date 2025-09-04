// src/lib/isDue.server.ts
import "server-only";
import type { Task } from "@/Types/types";
import {
  isBusinessDay,
  matchesNthBusinessDay,
  toUtcMidnight,
} from "@/lib/bizday";

/**
 * Returns true if a task is due on the given UTC calendar day (00:00Z).
 * Supports negative indices for M/Q/Y (e.g. -1 = last business day of the period).
 * Weekly supports ISO business day 1..5, with -1 treated as Friday.
 */
export function isDue(dateUTC: Date, task: Task): boolean {
  const today = toUtcMidnight(dateUTC);

  // All tasks run on business days only.
  if (!isBusinessDay(today)) return false;

  switch (task.frequency) {
    case "D": {
      // Every business day.
      return true;
    }

    case "W": {
      // Weekly: displayDay uses 1..5 (Mon..Fri). -1 = last business day of week => Friday.
      const businessDayOfWeek = getBusinessDayOfWeek(today); // 1..5
      const set = new Set(
        (task.displayDay ?? []).map((n) => (n === -1 ? 5 : n))
      );
      return set.has(businessDayOfWeek);
    }

    case "M": {
      // Monthly: n-th business day of the month (supports negatives).
      return (task.displayDay ?? []).some((n) =>
        matchesNthBusinessDay(today, n, "M")
      );
    }

    case "Q": {
      // Quarterly: n-th business day of the quarter (supports negatives).
      return (task.displayDay ?? []).some((n) =>
        matchesNthBusinessDay(today, n, "Q")
      );
    }

    case "Y": {
      // Yearly: n-th business day of the year (supports negatives).
      return (task.displayDay ?? []).some((n) =>
        matchesNthBusinessDay(today, n, "Y")
      );
    }
  }
  return false;
}

/** Monday=1 … Friday=5. Only called on business days. */
function getBusinessDayOfWeek(dateUTC: Date): 1 | 2 | 3 | 4 | 5 {
  const d = dateUTC.getUTCDay(); // 0..6 (Sun..Sat)
  // Since we already guard with isBusinessDay, valid are Mon..Fri (1..5).
  // Map directly: Mon(1)->1 … Fri(5)->5.
  // Type assertion is safe due to guard above.
  return d as 1 | 2 | 3 | 4 | 5;
}
