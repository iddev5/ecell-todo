import axios from "axios";
import {
  setTodo,
  addTodo,
  deleteTodo as deleteTodoState,
  updateTodo as updateTodoState,
  toggleComplete,
} from "../features/todoSlice";
import type { Dispatch } from "@reduxjs/toolkit";
import { auth } from "./firebase";

const host = import.meta.env.VITE_APP_HOST || "";

const getTodos = () => async (dispatch: Dispatch) => {
  const response = await axios.get(`${host}/api/`);
  dispatch(setTodo(response.data));
};

const createTodo =
  (title: string, desc: string = "") =>
  async (dispatch: Dispatch) => {
    if (title === undefined || title === "") return;

    const new_todo = {
      title: title,
      desc: desc,
    };

    const response = await axios.post(`${host}/api/`, new_todo);
    dispatch(addTodo(response.data));
  };

const deleteTodo = (id: string) => async (dispatch: Dispatch) => {
  await axios.delete(`${host}/api/${id}/`);
  dispatch(deleteTodoState(id));
};

const updateTodo = (id: string, form_data: { title: string; desc: string }) => async (dispatch: Dispatch) => {
  // TODO: fix PUT returning old data
  const response = await axios.put(`${host}/api/${id}/`, form_data);

  dispatch(
    updateTodoState({
      _id: id,
      title: form_data.title,
      desc: form_data.desc,
    })
  );
};

const markCompleted = (id: string, completed: boolean) => async (dispatch: Dispatch) => {
  const response = await axios.put(`${host}/api/${id}/`, {
    completed: completed,
  });

  dispatch(toggleComplete(id));
};

const setStatus = (id: string, status: string) => async (dispatch: Dispatch) => {
  const response = await axios.put(`${host}/api/${id}/`, {
    status: status,
  });

  dispatch(setStatus(id, status));
};

const createUser = () => async (_: Dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();

    const response = await axios.post(`${host}/api/auth/google`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
};

export default { getTodos, createTodo, deleteTodo, updateTodo, markCompleted, setStatus, createUser };
