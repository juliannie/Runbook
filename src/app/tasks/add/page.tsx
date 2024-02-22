"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TodosContext } from "@/store/todos-context";
import { useContext } from "react";
import { generateRandomID } from "@/helpers";
import { Task } from "@/Types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
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

export default function AddTask() {
  const { addTask } = useContext(TodosContext);
  const router = useRouter();

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayDay: "",
      frequency: "",
      task: "",
      description: "",
      deadline: "",
    },
  });
  // Define Submit Handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { description, displayDay, frequency, task, deadline } = values;

    const data: Task = {
      id: generateRandomID(),
      displayDay,
      frequency,
      task,
      description,
      deadline,
    };

    addTask(data);
    router.push("/tasks");
  }

  return (
    <div className="mx-auto w-7/12 pb-8">
      <div className="container">
        <h4 className="pb-8 pt-4">Add a new Task to the Database:</h4>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="displayDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Working Day(s) to be Displayed</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 1, -1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Display the task on a certain working day(s) based on the
                    frequency.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <FormControl>
                    <Input placeholder="D|W|M|Q|Y" {...field} />
                  </FormControl>
                  <FormDescription>Frequency to display task.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Buy milk" {...field} />
                  </FormControl>
                  <FormDescription>Name of the Task.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Go to the supermarket and buy 1l of whole milk"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Detailed description of the Task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 7" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the WD on which the task has a deadline.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button asChild>
                <Link href="/tasks">Go Back</Link>
              </Button>
              <Button type="submit">Add new Task</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
