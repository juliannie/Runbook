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

export type Task = {
  id: string;
  displayDay: number[];
  frequency: "D" | "W" | "M" | "Q" | "Y";
  task: string;
  description: string;
  deadline: number[];
};

export type TableCellParams = {
  getValue: () => any;
  row: Row<Todo> | Row<Task>;
  column: Column<Todo> | Column<Task>;
  table: any;
};
