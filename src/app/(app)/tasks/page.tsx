"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useTasks, useDeleteTask } from "@/hooks/useTasks";

/**
 * Lists ALL tasks owned by the signed-in user (not just "due today").
 * CRUD actions are handled by the table cells + useDeleteTask().
 */
export default function TasksPage() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const { mutate: deleteTask } = useDeleteTask();

  const rows = useMemo(() => tasks, [tasks]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-sm text-muted-foreground">Loading tasks…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-sm text-red-600">Failed to load tasks.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-end">
        <Button asChild className="min-h-[44px]">
          <Link href="/tasks/add">Add Task</Link>
        </Button>
      </div>

      <div className="py-4">
        <DataTable columns={columns} data={rows} deleteTask={deleteTask} />
      </div>
    </div>
  );
}
