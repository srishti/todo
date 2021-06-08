import React, { useContext, useState, useEffect } from "react";
import TodosContext from "../context";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function TodoForm() {
  const [todoText, setTodoText] = useState("");
  const { state, dispatch } = useContext(TodosContext);

  useEffect(() => {
    if (state.currentTodo.text) {
      // if currentTodo is set (a TODO is selected for editing), set its text in input textbox
      setTodoText(state.currentTodo.text);
    } else {
      // if currentTodo is removed, empty input textbox
      setTodoText("");
    }
  }, [state.currentTodo.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // checking if text of added/updated TODO already exists
    const doesTodoExist =
      state.todos.findIndex(
        (t) => t.text.toLowerCase() === todoText.toLowerCase()
      ) > -1;

    if (!todoText || doesTodoExist) {
      // if text is empty or TODO already exists, reset currentTodo to initial value
      dispatch({ type: "SET_CURRENT_TODO", payload: {} });
    } else if (state.currentTodo.text) {
      // if currentTodo's text exists, edit the TODO
      const response = await axios.patch(
        `https://hooks-api-b40sfriga-srishti.vercel.app/todos/${state.currentTodo.id}`,
        {
          text: todoText,
        }
      );
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    } else {
      // if currentTodo's text does not exist, add the TODO
      const newTodo = {
        id: uuidv4(),
        text: todoText,
        complete: false,
      };
      const response = await axios.post(
        "https://hooks-api-b40sfriga-srishti.vercel.app/todos",
        newTodo
      );
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodoText("");
  };

  return (
    <form className="flex justify-center p-5 mt-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-black border-solid border-2"
        value={todoText}
        onChange={(event) => setTodoText(event.target.value)}
        placeholder="add or edit here"
      />
    </form>
  );
}
