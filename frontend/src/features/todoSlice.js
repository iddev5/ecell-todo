import { createSlice } from '@reduxjs/toolkit';

const sortTodos = (todos, sortOrder) => {
    const completes = todos.filter(todo => todo.completed === true);
    const incompletes = todos.filter(todo => todo.completed === false);

    completes.sort((a, b) => { 
        const x = new Date(b.updatedAt) - new Date(a.updatedAt);
        return sortOrder === 'new' ? x : -x;
    });
    incompletes.sort((a, b) => { 
        const x = new Date(b.updatedAt) - new Date(a.updatedAt);
        return sortOrder === 'new' ? x : -x;
    });

    return [...incompletes, ...completes];
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        sortOrder: 'new',
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            state.todos = sortTodos(state.todos, state.sortOrder);
        },
        setTodo: (state, action) => {
            state.todos = sortTodos(action.payload, state.sortOrder);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo._id !== action.payload);
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo._id === action.payload._id);
            if (index !== -1) {
                state.todos[index].title = action.payload.title;
                state.todos[index].desc = action.payload.desc;

                state.todos = sortTodos(state.todos, state.sortOrder);
            }
        },
        toggleComplete: (state, action) => {
            const index = state.todos.findIndex(todo => todo._id === action.payload);
            if (index !== -1) {
                state.todos[index].completed = !state.todos[index].completed;

                state.todos = sortTodos(state.todos, state.sortOrder);
            }
        },
        changeSortOrder: (state, action) => {
            state.sortOrder = action.payload;
            state.todos = sortTodos(state.todos, state.sortOrder);
        },
    }
})

export const { addTodo, setTodo, deleteTodo, updateTodo, toggleComplete, changeSortOrder } = todoSlice.actions;

export default todoSlice.reducer;