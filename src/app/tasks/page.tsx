"use client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useContext } from "react";
import { TodosContext } from "@/store/todos-context";
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
  const { tasks, deleteTask } = useContext(TodosContext);
  // console.log("Tasks");
  // console.log(tasks);
  return (
    <div className="container">
      <div className="flex justify-end mx-auto pt-4">
        <Button asChild>
          <Link href="/tasks/add">Add Task</Link>
        </Button>
      </div>
      <div className="mx-auto py-3">
        <DataTable columns={columns} data={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
}
