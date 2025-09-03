"use client";
import { useQuery } from "@tanstack/react-query";
import { Task } from "@/Types/types";

export function useMyTasks() {
  return useQuery({
    queryKey: ["mytasks"],
    queryFn: async (): Promise<Task[]> => {
      const res = await fetch("/api/mytasks", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      return (await res.json()) as Task[];
    },
  });
}
