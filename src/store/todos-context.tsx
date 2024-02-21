"use client";
import { createContext, useState } from "react";
import { Todo, TODOS } from "@/store/TODOS";

type TodosContextObj = {
  todos: Todo[];
  viewDetails: () => void;
  changeStatus: () => void;
};

export const TodosContext = createContext<TodosContextObj>({
  todos: [],
  viewDetails: () => {},
  changeStatus: () => {},
});

export default function TodosContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>(TODOS);

  function changeStatus() {
    console.log("Changing Status");
  }

  function viewDetails() {
    console.log("Viewing Details");
  }

  const contextValue: TodosContextObj = {
    todos,
    viewDetails,
    changeStatus,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
}
