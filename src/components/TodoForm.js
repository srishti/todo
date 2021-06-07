import React, { useContext, useState, useEffect } from "react";
import TodosContext from "../context";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo },
    dispatch,
  } = useContext(TodosContext);

  console.log({ todo, currentTodo });

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    }
  }, [currentTodo.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTodo.text) {
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      dispatch({ type: "ADD_TODO", payload: todo });
    }
    setTodo("");
  };

  return (
    <form className="flex justify-center p-5" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-black border-solid border-2"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
      />
    </form>
  );
}
