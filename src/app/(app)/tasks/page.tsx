"use client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useDeleteTask, useTasks } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// async function getData(): Promise<Todo[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       deadline: new Date().toDateString(),
//       task: "AGI01",
//       description: "Send reports for AGI01",
//       assignedTo: "Julian",
//       status: "pending",
//       comment: "This is a test",
//     },
//     // ...

//     // export type Todo = {
//     //   id: string;
//     //   deadline: string;
//     //   task: string;
//     //   description: string;
//     //   assignedTo: string;
//     //   status: "pending" | "processing" | "success" | "failed";
//     //   comment: string;
//     // };
//   ];
// }

export default function Tasks() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const { mutate: deleteTask } = useDeleteTask();
  // console.log("Tasks");
  // console.log(tasks);
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-end pt-4">
        <Button asChild className="min-h-[44px]">
          <Link href="/tasks/add">Add Task</Link>
        </Button>
      </div>
      <div className="py-3">
        {isLoading ? (
          <div className="p-6 text-sm text-muted-foreground">
            Loading tasks…
          </div>
        ) : error ? (
          <div className="p-6 text-sm text-red-600">Failed to load tasks.</div>
        ) : (
          <DataTable columns={columns} data={tasks} deleteTask={deleteTask} />
        )}
      </div>
    </div>
  );
}
