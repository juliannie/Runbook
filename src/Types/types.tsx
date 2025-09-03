import { Column, Row } from "@tanstack/react-table";

export type Status = "pending" | "processing" | "completed" | "failed";

export type OccurrenceStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

export type Todo = {
  id: string;
  deadline: string;
  task: string;
  description: string;
  assignedTo: string;
  status: Status;
  comment: string;
};

export type Frequency = "D" | "W" | "M" | "Q" | "Y";

export type Task = {
  id: string;
  displayDay: number[];
  frequency: Frequency;
  task: string;
  description: string;
  deadline: number[];
  status: string;
  assignedTo: string;
  comment: string;
};

export type TaskOccurrence = {
  id: string;
  taskId: string;
  dateUTC: Date;
  status: OccurrenceStatus;
  assigneeId?: string | null;
  assigneeName?: string | null;
  comment?: string | null;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TableMeta = {
  deleteTask?: (id: string) => void;
};

export type TableCellParams = {
  getValue: () => unknown;
  row: Row<Task>;
  column: Column<Task>;
  table: { options: { meta?: TableMeta } };
};
