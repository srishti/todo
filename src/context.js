import React from "react";
import { v4 as uuidv4 } from "uuid";

const TodosContext = React.createContext({
  todos: [
    { id: uuidv4(), text: "Eat breakfast", complete: false },
    { id: uuidv4(), text: "Do laundry", complete: false },
    { id: uuidv4(), text: "Finish project", complete: true },
  ],
  currentTodo: {},
});

export default TodosContext;
