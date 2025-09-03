"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { taskFormSchema } from "@/schemas";
import { Task } from "@/Types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { useCreateTask } from "@/hooks/useTasks";

export default function AddTask() {
  const {
    mutateAsync: createTask,
    isPending,
    isError,
    error,
  } = useCreateTask();
  const router = useRouter();

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

    createTask(data).then(() => {
      router.push("/tasks");
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div>
        <h4 className="pb-8 pt-4">Add a new Task to the Database:</h4>
        <TaskForm id="add-task" submitHandler={onSubmit} />
        <div className="flex flex-col sm:flex-row justify-between pt-8 gap-4">
          <Button asChild className="min-h-[44px]">
            <Link href="/tasks">Go Back</Link>
          </Button>
          <Button
            form="add-task"
            type="submit"
            disabled={isPending}
            className="min-h-[44px]"
          >
            Add new Task
          </Button>
        </div>
        {isError && (
          <p className="pt-4 text-sm text-red-600">{String(error)}</p>
        )}
      </div>
    </div>
  );
}
