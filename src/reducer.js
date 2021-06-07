export default function reducer(state, action) {
  switch (action.type) {
    // when a TODO is chosen to be edited, it is set as the currentTodo
    case "SET_CURRENT_TODO": {
      return {
        ...state,
        currentTodo: action.payload,
      };
    }

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

    // when all saved TODOs are displayed
    case "GET_TODOS": {
      return {
        ...state,
        todos: action.payload,
      };
    }

    // when a TODO is added
    case "ADD_TODO": {
      const addedTodos = [...state.todos, action.payload];

      return {
        ...state,
        todos: addedTodos,
      };
    }

    // when a TODO is updated
    case "UPDATE_TODO": {
      // prevent updating to an empty TODO
      if (!action.payload) {
        return {
          ...state,
          currentTodo: {},
        };
      }

      // prevent updating to a TODO which already exists
      if (
        state.todos.findIndex(
          (todo) => todo.text.toLowerCase() === action.payload.toLowerCase()
        ) > -1
      ) {
        return {
          ...state,
          currentTodo: {},
        };
      }

      const updatedTodo = {
        ...state.currentTodo,
        text: action.payload,
      };
      const updatedTodoIndex = state.todos.findIndex(
        (todo) => todo.id === state.currentTodo.id
      );
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1),
      ];

      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos,
      };
    }

    // when a TODO is deleted
    case "REMOVE_TODO": {
      const filteredTodos = state.todos.filter((todo) => {
        return todo.id !== action.payload.id;
      });

      // if currentTodo is removed, set currentTodo to initial state (empty object)
      const removedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;

      return {
        ...state,
        todos: filteredTodos,
        currentTodo: removedTodo,
      };
    }

    // when no case matches, return the state as it is
    default: {
      return state;
    }
  }
}
