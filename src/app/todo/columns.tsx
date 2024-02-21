"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Todo } from "@/Types/types";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownCell from "@/components/DropdownCell";
import EditableCell from "@/components/EditableCell";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Todo = {
//   id: string;
//   deadline: string;
//   task: string;
//   description: string;
//   assignedTo: string;
//   status: "pending" | "processing" | "success" | "failed";
//   comment: string;
// };

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: DropdownCell,
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
  },
  {
    accessorKey: "task",
    header: "Task",
  },
  {
    accessorKey: "assignedTo",
    header: "Assignee",
    cell: EditableCell,
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: EditableCell,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const todo = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(todo.id)}
  //           >
  //             Copy todo ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View todo details</DropdownMenuItem>
  //           {/* <NavigateButton row={row} /> */}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
