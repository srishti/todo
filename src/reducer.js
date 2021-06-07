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

    // when no case matches, return the state as it is
    default: {
      return state;
    }
  }
}
