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

export default function ActionMenu({
  getValue,
  row,
  column,
  table,
}: TableCellParams) {
  function deleteTaskHandler() {
    const { id } = row.original;
    table.options.meta?.deleteTask(id);
    console.log("Deleting task", id);
  }

  function editTaskHandler() {
    const task = row.original;
    table.options.meta?.editTask(task);
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
        <DropdownMenuItem onClick={editTaskHandler}>Edit Task</DropdownMenuItem>

        <DropdownMenuItem onClick={deleteTaskHandler}>
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
