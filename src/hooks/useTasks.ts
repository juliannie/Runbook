"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksApi, TaskDTO } from "@/lib/tasks-api";
import { Task } from "@/Types/types";

const queryKey = ["tasks"] as const;

export function useTasks() {
  return useQuery({ queryKey, queryFn: tasksApi.list });
}

export function useTask(id: string) {
  return useQuery({
    queryKey: [...queryKey, id],
    queryFn: () => tasksApi.get(id),
    enabled: !!id,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: TaskDTO) => tasksApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TaskDTO }) =>
      tasksApi.update(id, data),
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey });
      const previous = qc.getQueryData<Task[]>(queryKey);
      if (previous) {
        qc.setQueryData<Task[]>(queryKey, (old) =>
          (old ?? []).map((t) =>
            t.id === id ? { ...t, ...(data as Task) } : t
          )
        );
      }
      return { previous };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.previous) qc.setQueryData(queryKey, ctx.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey }),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tasksApi.remove(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey });
      const previous = qc.getQueryData<Task[]>(queryKey);
      if (previous) {
        qc.setQueryData<Task[]>(
          queryKey,
          previous.filter((t) => t.id !== id)
        );
      }
      return { previous };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.previous) qc.setQueryData(queryKey, ctx.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey }),
  });
}
