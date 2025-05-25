import { createSlice } from '@reduxjs/toolkit';

const sortTodos = (todos) => {
    const completes = todos.filter(todo => todo.completed === true);
    const incompletes = todos.filter(todo => todo.completed === false);

    completes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    incompletes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return [...incompletes, ...completes];
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            state.todos = sortTodos(state.todos);
        },
        setTodo: (state, action) => {
            state.todos = sortTodos(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo._id !== action.payload);
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo._id === action.payload._id);
            if (index !== -1) {
                state.todos[index].title = action.payload.title;
                state.todos[index].desc = action.payload.desc;

                state.todos = sortTodos(state.todos);
            }
        },
        toggleComplete: (state, action) => {
            const index = state.todos.findIndex(todo => todo._id === action.payload);
            if (index !== -1) {
                state.todos[index].completed = !state.todos[index].completed;

                state.todos = sortTodos(state.todos);
            }
        },
    }
})

export const { addTodo, setTodo, deleteTodo, updateTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer;