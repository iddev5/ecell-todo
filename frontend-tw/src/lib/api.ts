import axios from "axios";
import {
  setTodo,
  addTodo,
  deleteTodo as deleteTodoState,
  updateTodo as updateTodoState,
  toggleComplete,
} from "../features/todoSlice";
import {
  setProjects,
  addProject,
  deleteProject as deleteProjectState,
} from "../features/projectSlice";
import type { Dispatch } from "@reduxjs/toolkit";
import { auth } from "./firebase";

const host = import.meta.env.VITE_APP_HOST || "";

const getTodos = (pid: string) => async (dispatch: Dispatch) => {
  const response = await axios.get(`${host}/api/${pid}`);
  dispatch(setTodo(response.data));
};

const createTodo =
  (pid: string, title: string, desc: string = "") =>
  async (dispatch: Dispatch) => {
    if (title === undefined || title === "") return;

    const new_todo = {
      pid: pid,
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

const createProject =
  (uid: string, name: string, desc: string = "") =>
  async (dispatch: Dispatch) => {
    if (name === undefined || name === "") return;

    const new_proj = {
      uid: uid,
      name: name,
      desc: desc,
    };

    const response = await axios.post(`${host}/api/project`, new_proj);
    dispatch(addProject(response.data));
  };

const getProjects = (uid: string) => async (dispatch: Dispatch) => {
  const response = await axios.get(`${host}/api/project/${uid}`);
  dispatch(setProjects(response.data));
};

const deleteProject = (id: string) => async (dispatch: Dispatch) => {
  await axios.delete(`${host}/api/project/${id}/`);
  dispatch(deleteProjectState(id));
};

export default {
  getTodos, createTodo, deleteTodo, updateTodo, markCompleted, setStatus,
  createUser,
  createProject, getProjects, deleteProject,
};
