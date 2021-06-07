import React, { useContext } from "react";
import TodosContext from "../context";

export default function TodoList() {
  const { state } = useContext(TodosContext);

  const title =
    state.todos.length > 0 ? `${state.todos.length} TODOs` : "Nothing To Do!";

  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {state.todos.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
