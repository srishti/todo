import React from "react";

const TodosContext = React.createContext({
  todos: [],
  currentTodo: {},
});

export default TodosContext;
