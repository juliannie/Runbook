import { generateRandomID } from "../../helpers";
import { Task } from "@/Types/types";

export const TASKS: Task[] = [
  {
    id: 1,
    displayDay: [1],
    frequency: "D",
    task: "AGI01",
    description: "Daily task DISP1, DEAD1 - AGI01",
    deadline: [1],
  },

  {
    id: 2,
    displayDay: [1],
    frequency: "W",
    task: "AGI02",
    description: "Weekly task DISP1, DEAD1 - AGI02",
    deadline: [1],
  },
  {
    id: 3,
    displayDay: [1],
    frequency: "Q",
    task: "AGI03",
    description: "Quarterly task DISP1, DEAD1 - AGI03",
    deadline: [1],
  },
  {
    id: 4,
    displayDay: [1],
    frequency: "M",
    task: "AGI04",
    description: "Monthly task DISP1, DEAD1 - AGI04",
    deadline: [1],
  },
  {
    id: 5,
    displayDay: [1],
    frequency: "Y",
    task: "AGI05",
    description: " Yearly task DISP1, DEAD1 - AGI05",
    deadline: [1],
  },
  {
    id: 6,
    displayDay: [1, 2, 3],
    frequency: "M",
    task: "AGI06",
    description: "Monthly task DISP123, DEAD3 - AGI06",
    deadline: [3],
  },
  {
    id: 7,
    displayDay: [2, 3, 4],
    frequency: "W",
    task: "AGI07",
    description: "Monthly task DISP123, DEAD3 - AGI07",
    deadline: [4],
  },
];

export const FREQUENCIES: string[] = ["D", "W", "M", "Q", "Y"];
