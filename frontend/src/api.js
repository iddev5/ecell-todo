import axios from 'axios';
import { setTodo, addTodo, deleteTodo as deleteTodoState, updateTodo as updateTodoState, toggleComplete } from './features/todoSlice';

const host = process.env.REACT_APP_HOST || "";

const getTodos = () => async dispatch => {
    const response = await axios.get(`${host}/api/`);
    dispatch(setTodo(response.data));
}

const createTodo = (title, desc="") => async dispatch => {
    if (title === undefined || title === "")
        return;

    const new_todo = {
        title: title,
        desc: desc,
    };

    const response = await axios.post(`${host}/api/`, new_todo);
    dispatch(addTodo(response.data));
}

const deleteTodo = (id) => async dispatch => {
    await axios.delete(`${host}/api/${id}/`);
    dispatch(deleteTodoState(id));
}

const updateTodo = (id, form_data) => async dispatch => {
    // TODO: fix PUT returning old data
    const response = await axios.put(`${host}/api/${id}/`, form_data);

    dispatch(
      updateTodoState({
        _id: id,
        title: form_data.title,
        desc: form_data.desc,
      })
    );
}

const markCompleted = (id, completed) => async dispatch => {
    const response = await axios.put(`${host}/api/${id}/`, { completed: completed });

    dispatch(toggleComplete(id));
}

export default { getTodos, createTodo, deleteTodo, updateTodo, markCompleted };