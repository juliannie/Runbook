import { Column, Row } from "@tanstack/react-table";

export type Todo = {
  id: string;
  deadline: string;
  task: string;
  description: string;
  assignedTo: string;
  status: "pending" | "processing" | "completed" | "failed";
  comment: string;
};

export type TableCellParams = {
  getValue: () => any;
  row: Row<Todo>;
  column: Column<Todo>;
  table: any;
};
