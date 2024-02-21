"use client";
import { createContext, useState } from "react";
import { Todo, TODOS } from "@/store/TODOS";

export type updateDataParam = {
  rowIndex: number;
  columnId: string;
  value: string;
};

type TodosContextObj = {
  todos: Todo[];
  viewDetails: () => void;
  updateData: ({ rowIndex, columnId, value }: updateDataParam) => void;
};

export const TodosContext = createContext<TodosContextObj>({
  todos: [],
  viewDetails: () => {},
  updateData: ({ rowIndex, columnId, value }: updateDataParam) => {},
});

export default function TodosContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>(TODOS);

  function updateData({ rowIndex, columnId, value }: updateDataParam) {
    setTodos((prev) =>
      prev.map((todo, index) =>
        index === rowIndex ? { ...todo, [columnId]: value } : todo
      )
    );
  }

  function viewDetails() {
    console.log("Viewing Details");
  }

  const contextValue: TodosContextObj = {
    todos,
    viewDetails,
    updateData,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
}
