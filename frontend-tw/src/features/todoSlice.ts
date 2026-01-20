import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  _id: string;
  hash: number,
  title: string;
  desc: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoState {
  todos: Array<Todo>;
  sortOrder: string;
}

const sortTodos = (todos: Array<Todo>, sortOrder: string): Array<Todo> => {
  const completes = todos.filter((todo) => todo.status === "resolved");
  const incompletes = todos.filter((todo) => todo.status !== "resolved");

  completes.sort((a, b) => {
    const x = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    return sortOrder === "new" ? x : -x;
  });
  incompletes.sort((a, b) => {
    const x = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    return sortOrder === "new" ? x : -x;
  });

  return [...incompletes, ...completes];
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    sortOrder: "new",
  } as TodoState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      state.todos = sortTodos(state.todos, state.sortOrder);
    },
    setTodo: (state, action: PayloadAction<Array<Todo>>) => {
      state.todos = sortTodos(action.payload, state.sortOrder);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<{_id: string, title: string, desc: string}>) => {
      const index = state.todos.findIndex(
        (todo) => todo._id === action.payload._id
      );
      if (index !== -1) {
        state.todos[index].title = action.payload.title;
        state.todos[index].desc = action.payload.desc;

        state.todos = sortTodos(state.todos, state.sortOrder);
      }
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex(
        (todo) => todo._id === action.payload
      );
      if (index !== -1) {
        state.todos[index].completed = !state.todos[index].completed;

        state.todos = sortTodos(state.todos, state.sortOrder);
      }
    },
    changeSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
      state.todos = sortTodos(state.todos, state.sortOrder);
    },
  },
});

export const {
  addTodo,
  setTodo,
  deleteTodo,
  updateTodo,
  toggleComplete,
  changeSortOrder,
} = todoSlice.actions;

export default todoSlice.reducer;
