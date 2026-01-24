import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Project {
  _id: string;
  uid: string,
  name: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectState {
  projects: Array<Project>;
  currentProject: Project | null;
}

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    currentProject: null,
  } as ProjectState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    setProjects: (state, action: PayloadAction<Array<Project>>) => {
      state.projects = action.payload;
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((project) => project._id !== action.payload);
    },
    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload;
    },
  },
});

export const {
  addProject,
  setProjects,
  deleteProject,
  setCurrentProject,
} = projectSlice.actions;

export default projectSlice.reducer;
