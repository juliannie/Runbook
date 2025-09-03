"use client";
import { useQuery } from "@tanstack/react-query";

export function useTaskOccurrences(dateUTC: string) {
  return useQuery({
    queryKey: ["task-occurrences", dateUTC],
    queryFn: async () => {
      const response = await fetch(`/api/task-occurrences?dateUTC=${dateUTC}`);
      if (!response.ok) {
        throw new Error("Failed to fetch task occurrences");
      }
      return response.json();
    },
  });
}
