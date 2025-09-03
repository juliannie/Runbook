"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskFormSchema } from "@/schemas";
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
import { Task } from "@/Types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FREQUENCIES } from "@/Types/constants";

export default function TaskForm({
  id,
  submitHandler,
  task = undefined,
}: {
  id: string;
  submitHandler: (values: any) => void;
  task: Task | undefined;
}) {
  // Define form
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: task
      ? {
          displayDay: String(task.displayDay),
          frequency: task.frequency,
          task: task.task,
          description: task.description,
          deadline: String(task.deadline),
        }
      : {
          displayDay: "",
          frequency: "",
          task: "",
          description: "",
          deadline: "",
        },
  });
  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8"
      >
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {FREQUENCIES.map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
      </form>
    </Form>
  );
}
