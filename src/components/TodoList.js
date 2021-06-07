import React, { useContext } from "react";
import TodosContext from "../context";

export default function TodoList() {
  const { state } = useContext(TodosContext);

  const title =
    state.todos.length > 0 ? `${state.todos.length} TODOs` : "Nothing To Do!";

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold mt-5">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map((todo) => {
          return (
            <li
              key={todo.id}
              className="flex items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4"
            >
              <span className="flex-1 cursor-pointer">{todo.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
