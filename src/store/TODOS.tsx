import { generateRandomID } from "../../helpers";

export type Todo = {
  id: string;
  deadline: string;
  task: string;
  description: string;
  assignedTo: string;
  status: "pending" | "processing" | "completed" | "failed";
  comment: string;
};
export const TODOS: Todo[] = [
  {
    id: generateRandomID(),
    deadline: new Date().toDateString(),
    task: "AGI01",
    description: "Send reports for AGI01",
    assignedTo: "Julian",
    status: "processing",
    comment: "This is a test 1",
  },

  {
    id: generateRandomID(),
    deadline: new Date().toDateString(),
    task: "AGI02",
    description: "Send reports for AGI02",
    assignedTo: "Hans",
    status: "pending",
    comment: "This is a test 2",
  },
  {
    id: generateRandomID(),
    deadline: new Date().toDateString(),
    task: "AGI03",
    description: "Send reports for AGI03",
    assignedTo: "Peter",
    status: "processing",
    comment: "This is a test 3",
  },
  {
    id: generateRandomID(),
    deadline: new Date().toDateString(),
    task: "AGI04",
    description: "Send reports for AGI04",
    assignedTo: "Julian",
    status: "completed",
    comment: "This is a test 4",
  },
  {
    id: generateRandomID(),
    deadline: new Date().toDateString(),
    task: "AGI05",
    description: "Send reports for AGI05",
    assignedTo: "Peter",
    status: "failed",
    comment: "This is a test 5",
  },
];

export const STATUSES: string[] = [
  "pending",
  "processing",
  "completed",
  "failed",
];
