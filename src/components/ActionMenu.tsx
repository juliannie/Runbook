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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ActionMenu({
  getValue,
  row,
  column,
  table,
}: TableCellParams) {
  const { id } = row.original;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function deleteTaskHandler() {
    if (table.options.meta?.deleteTask) {
      table.options.meta.deleteTask(id);
    }
    console.log("Deleting task", id);
  }

  function handleEditTask(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    router.push(`/tasks/${id}/edit`);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 min-h-[44px] min-w-[44px] sm:h-8 sm:w-8 sm:p-0"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleEditTask}>Edit Task</DropdownMenuItem>
        <DropdownMenuItem onClick={deleteTaskHandler}>
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
