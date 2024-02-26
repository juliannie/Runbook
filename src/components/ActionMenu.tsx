import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { TableCellParams } from "@/Types/types";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function ActionMenu({
  getValue,
  row,
  column,
  table,
}: TableCellParams) {
  const { id } = row.original;

  function deleteTaskHandler() {
    table.options.meta?.deleteTask(id);
    console.log("Deleting task", id);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem>
          <Link href={`/tasks/${id}/edit`}>Edit Task</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={deleteTaskHandler}>
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
