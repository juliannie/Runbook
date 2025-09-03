import { Frequency, Task } from "@/Types/types";

export type TaskDTO = Omit<Task, "id"> & { id?: string };

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

export const tasksApi = {
  async list(): Promise<Task[]> {
    return json<Task[]>(await fetch("/api/tasks", { cache: "no-store" }));
  },
  async get(id: string): Promise<Task> {
    return json<Task>(await fetch(`/api/tasks/${id}`, { cache: "no-store" }));
  },
  async create(data: TaskDTO): Promise<Task> {
    return json<Task>(
      await fetch(`/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    );
  },
  async update(id: string, data: TaskDTO): Promise<Task> {
    return json<Task>(
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    );
  },
  async remove(id: string): Promise<{ ok: true }> {
    return json<{ ok: true }>(
      await fetch(`/api/tasks/${id}`, { method: "DELETE" })
    );
  },
};
