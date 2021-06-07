import { v4 as uuidv4 } from "uuid";

export default function reducer(state, action) {
  switch (action.type) {
    // when a TODO is toggled, mark/unmark its `complete` property
    case "TOGGLE_TODO": {
      const toggledTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...action.payload, complete: !action.payload.complete }
          : todo
      );

      return {
        ...state,
        todos: toggledTodos,
      };
    }

    // when a TODO is added
    case "ADD_TODO": {
      // prevent adding an empty TODO
      if (!action.payload) {
        return state;
      }

      // prevent adding a TODO which already exists
      if (
        state.todos.findIndex(
          (todo) => todo.text.toLowerCase() === action.payload.toLowerCase()
        ) > -1
      ) {
        return state;
      }

      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false,
      };
      const addedTodos = [...state.todos, newTodo];

      return {
        ...state,
        todos: addedTodos,
      };
    }

    // when a TODO is deleted
    case "REMOVE_TODO": {
      const filteredTodos = state.todos.filter((todo) => {
        return todo.id !== action.payload.id;
      });

      return {
        ...state,
        todos: filteredTodos,
      };
    }

    // when no case matches, return the state as it is
    default: {
      return state;
    }
  }
}
