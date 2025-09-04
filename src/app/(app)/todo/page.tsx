// src/app/(app)/todo/page.tsx
"use client";

import { useMemo } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useMyTasks } from "@/hooks/useMyTasks";
import { useTaskOccurrences } from "@/hooks/useTaskOccurrences";
import { isDue } from "@/lib/isDue";

export default function TodoPage() {
  const { data: allTasks = [], isLoading, error } = useMyTasks();

  // Compute "today" once in UTC (drop time)
  const todayUTC = useMemo(() => {
    const now = new Date();
    return new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
  }, []);

  // Tasks due today (using business-day logic)
  const dueTasks = useMemo(
    () => allTasks.filter((task) => isDue(todayUTC, task)),
    [allTasks, todayUTC]
  );

  // Load occurrences for today
  const { data: occurrences = [] } = useTaskOccurrences(todayUTC.toISOString());

  // Merge tasks with occurrences to build "todos"
  const todos = useMemo(() => {
    return dueTasks.map((task) => {
      const occurrence = occurrences.find((occ: any) => occ.taskId === task.id);

      return {
        id: task.id,
        deadline: todayUTC.toDateString(),
        task: task.task,
        description: task.description,
        assignedTo: occurrence?.assigneeName || task.assignedTo || "",
        status: (occurrence?.status || task.status) as
          | "pending"
          | "processing"
          | "completed"
          | "failed",
        comment: occurrence?.comment || task.comment || "",
      };
    });
  }, [dueTasks, occurrences, todayUTC]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-sm text-muted-foreground">Loading tasks…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-sm text-red-600">
          Failed to load tasks: {String(error)}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <DataTable columns={columns} data={todos} updateTodoData={() => {}} />
    </div>
  );
}
