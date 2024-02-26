"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { taskFormSchema } from "@/schemas";
import { TodosContext } from "@/store/todos-context";
import { useContext } from "react";
import { generateRandomID } from "@/helpers";
import { Task } from "@/Types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { usePathname } from "next/navigation";

export default function EditTask({ params }: { params: { taskSlug: string } }) {
  const { editTask, tasks } = useContext(TodosContext);
  const { taskSlug: taskId } = params;
  const [task] = tasks.filter((task) => task.id === taskId);
  const router = useRouter();
  console.log("Pathname", taskId);
  console.log(task);

  // Define Submit Handler
  function onSubmit(values: z.infer<typeof taskFormSchema>) {
    const { description, displayDay, frequency, task, deadline } = values;

    const data: Task = {
      id: generateRandomID(),
      displayDay,
      frequency,
      task,
      description,
      deadline,
    };

    editTask(data);
    router.push("/tasks");
  }

  return (
    <div className="mx-auto w-7/12 pb-8">
      <div className="container">
        <h4 className="pb-8 pt-4">Edit Task:</h4>
        <TaskForm id="edit-task" submitHandler={onSubmit} task={task} />
        <div className="flex justify-between pt-8">
          <Button asChild>
            <Link href="/tasks">Go Back</Link>
          </Button>
          <Button form="edit-task" type="submit">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
