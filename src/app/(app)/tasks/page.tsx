// src/app/(app)/tasks/page.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useDeleteTask, useTasks } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";

export default function TasksPage() {
  // Client-side session gate (middleware should already protect this route)
  const { status } = useSession();

  const {
    data: tasks = [],
    isLoading: isTasksLoading,
    error: tasksError,
  } = useTasks();

  const { mutate: deleteTask } = useDeleteTask();

  // Prevent layout shift while auth status or data loads
  const isLoading = status === "loading" || isTasksLoading;

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="p-6 text-sm text-muted-foreground">Loading tasks…</div>
      );
    }

    if (tasksError) {
      return (
        <div className="p-6 text-sm text-red-600">
          Failed to load tasks: {String(tasksError)}
        </div>
      );
    }

    return <DataTable columns={columns} data={tasks} deleteTask={deleteTask} />;
  }, [isLoading, tasksError, tasks, deleteTask]);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-end pt-4">
        <Button asChild className="min-h-[44px]">
          <Link href="/tasks/add">Add Task</Link>
        </Button>
      </div>

      <div className="py-3">{content}</div>
    </div>
  );
}
