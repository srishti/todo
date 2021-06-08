import React, { useContext } from "react";
import TodosContext from "../context";
import axios from "axios";

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);

  const title =
    state.todos.length > 0 ? `${state.todos.length} TODOs` : "Nothing To Do!";

  const toggleTodoHandler = async (todo) => {
    const response = await axios.patch(
      `https://hooks-api-b40sfriga-srishti.vercel.app/todos/${todo.id}`,
      { complete: !todo.complete }
    );
    dispatch({ type: "TOGGLE_TODO", payload: response.data });
  };

  const editTodoHandler = (todo) => {
    dispatch({ type: "SET_CURRENT_TODO", payload: todo });
  };

  const deleteTodoHandler = async (todo) => {
    await axios.delete(
      `https://hooks-api-b40sfriga-srishti.vercel.app/todos/${todo.id}`
    );
    dispatch({ type: "REMOVE_TODO", payload: todo });
  };

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold mt-5">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map((todo) => {
          return (
            // TODO
            <li
              key={todo.id}
              className="flex items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4"
            >
              {/*  TODO text */}
              <span
                className={`flex-1 ml-16 cursor-pointer ${
                  todo.complete && "line-through text-grey-darkest"
                }`}
                onDoubleClick={() => toggleTodoHandler(todo)}
              >
                {todo.text}
              </span>
              {/* TODO edit icon */}
              <button>
                <img
                  src="https://img.icons8.com/edit"
                  alt="Edit Icon"
                  className="h-6 mr-2"
                  onClick={() => editTodoHandler(todo)}
                />
              </button>
              {/*  TODO delete icon */}
              <button onClick={() => deleteTodoHandler(todo)}>
                <img
                  src="https://img.icons8.com/delete"
                  alt="Delete Icon"
                  className="h-6 mr-2"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
