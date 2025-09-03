"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { taskFormSchema } from "@/schemas";
import { Task } from "@/Types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { useTask, useUpdateTask } from "@/hooks/useTasks";

export default function EditTask({ params }: { params: { taskSlug: string } }) {
  const { taskSlug: taskId } = params;
  const { data: task, isLoading, error: taskError } = useTask(taskId);
  const {
    mutateAsync: updateTask,
    isPending,
    isError,
    error: updateError,
  } = useUpdateTask();
  const router = useRouter();
  console.log("Pathname", taskId);
  console.log(task);

  // Define Submit Handler
  function onSubmit(values: z.infer<typeof taskFormSchema>) {
    const { description, displayDay, frequency, task, deadline } = values;

    const data = {
      displayDay,
      frequency,
      task,
      description,
      deadline,
    };

    updateTask({ id: taskId, data }).then(() => {
      router.push("/tasks");
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div>
        <h4 className="pb-8 pt-4">Edit Task:</h4>
        {isLoading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading…</div>
        ) : taskError ? (
          <div className="space-y-4">
            <p className="text-sm text-red-600">Failed to load task.</p>
            <Button asChild className="min-h-[44px]">
              <Link href="/tasks">Go Back</Link>
            </Button>
          </div>
        ) : task ? (
          <TaskForm id="edit-task" submitHandler={onSubmit} task={task} />
        ) : (
          <div className="space-y-4">
            <p>Task not found.</p>
            <Button asChild className="min-h-[44px]">
              <Link href="/tasks">Go Back</Link>
            </Button>
          </div>
        )}
        <div className="flex flex-col sm:flex-row justify-between pt-8 gap-4">
          <Button asChild className="min-h-[44px]">
            <Link href="/tasks">Go Back</Link>
          </Button>
          {task && (
            <Button
              form="edit-task"
              type="submit"
              disabled={isPending}
              className="min-h-[44px]"
            >
              Save Changes
            </Button>
          )}
        </div>
        {isError && (
          <p className="pt-4 text-sm text-red-600">{String(updateError)}</p>
        )}
      </div>
    </div>
  );
}
