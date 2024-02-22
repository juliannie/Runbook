"use client";
import { createContext, useState } from "react";
import { TODOS } from "@/store/TODOS";
import { TASKS } from "@/store/TASKS";
import { Todo, Task } from "@/Types/types";

export type updateTodoDataParam = {
  rowIndex: number;
  columnId: string;
  value: string;
};

type TodosContextObj = {
  todos: Todo[];
  tasks: Task[];
  updateTodoData: ({ rowIndex, columnId, value }: updateTodoDataParam) => void;
  addTask: (data: Task) => void;
  deleteTask: (id: string) => void;
  editTask: (data: Task) => void;
};

export const TodosContext = createContext<TodosContextObj>({
  todos: [],
  tasks: [],
  updateTodoData: ({ rowIndex, columnId, value }: updateTodoDataParam) => {},
  deleteTask: (id: string) => {},
  addTask: (data: Task) => {},
  editTask: (data: Task) => {},
});

export default function TodosContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>(TODOS);
  const [tasks, setTasks] = useState<Task[]>(TASKS);

  function updateTodoData({ rowIndex, columnId, value }: updateTodoDataParam) {
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

  function deleteTask(id: string) {
    console.log("deleting Task with ID", id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function editTask(data: Task) {
    console.log(data);
  }

  const contextValue: TodosContextObj = {
    todos,
    tasks,
    updateTodoData,
    addTask,
    deleteTask,
    editTask,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
}
