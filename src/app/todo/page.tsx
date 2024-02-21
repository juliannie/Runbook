"use client";
import { columns } from "./columns";
import { Todo } from "@/store/TODOS";
import { DataTable } from "./data-table";
import { useContext } from "react";
import { TodosContext } from "@/store/todos-context";

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

export default function DemoPage() {
  const { todos } = useContext(TodosContext);
  console.log(todos);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={todos} />
    </div>
  );
}
