"use client";
import { createContext, useState } from "react";
import { TODOS } from "@/store/TODOS";
import { TASKS } from "@/store/TASKS";
import { Todo, Task } from "@/Types/types";

export type updateDataParam = {
  rowIndex: number;
  columnId: string;
  value: string;
};

type TodosContextObj = {
  todos: Todo[];
  tasks: Task[];
  updateData: ({ rowIndex, columnId, value }: updateDataParam) => void;
  updateTasks: () => void;
  addTask: (data: Task) => void;
};

export const TodosContext = createContext<TodosContextObj>({
  todos: [],
  tasks: [],
  updateData: ({ rowIndex, columnId, value }: updateDataParam) => {},
  updateTasks: () => {},
  addTask: () => {},
});

export default function TodosContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>(TODOS);
  const [tasks, setTasks] = useState<Task[]>(TASKS);

  function updateData({ rowIndex, columnId, value }: updateDataParam) {
    setTodos((prev) =>
      prev.map((todo, index) =>
        index === rowIndex ? { ...todo, [columnId]: value } : todo
      )
    );
  }

  function addTask(data: Task) {
    console.log("Adding task");
    setTasks((prev) => [...prev, data]);
  }

  function updateTasks() {
    console.log("Updating Task");
  }

  const contextValue: TodosContextObj = {
    todos,
    tasks,
    updateData,
    updateTasks,
    addTask,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
}
