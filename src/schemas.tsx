import { z } from "zod";

export const taskFormSchema = z.object({
  displayDay: z
    .string()
    .min(1, {
      message:
        "Working Day cannot be empty. Enter at least one number. Multiple numbers can be seperated by commas.",
    })
    .transform((value) => value.split(",").map(Number))
    .pipe(z.number().array()),
  frequency: z.union([
    z.literal("D", {
      errorMap: () => ({ message: "Frequency must be D, W, M, Q or Y." }),
    }),
    z.literal("W"),
    z.literal("M"),
    z.literal("Q"),
    z.literal("Y"),
  ]),
  task: z
    .string()
    .min(1, { message: "Task cannot be empty." })
    .min(3, { message: "Taskname must have at least 3 characters." })
    .max(32, { message: "Taskname must not exceed 32 characters." }),
  description: z
    .string()
    .min(1, { message: "Description cannot be empty." })
    .min(5, { message: "Description must have at least 5 characters." })
    .max(250, { message: "Description cannot be empty." }),
  deadline: z
    .string()
    .min(1, {
      message:
        "Deadline cannot be empty. Enter at least one number. Multiple numbers can be seperated by commas.",
    })
    .transform((value) => value.split(",").map(Number))
    .pipe(z.number().array()),
});
