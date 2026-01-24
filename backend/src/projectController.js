import Project from "./projectModel.js";
import asyncHandler from "express-async-handler";

// CREATE
export const createProject = asyncHandler(async (req, res) => {
  let project = new Project(req.body);
  await project.save();
  res.json(project);
});

// READ
export const getProjects = asyncHandler(async (req, res) => {
  const projs = await Project.find({ uid: req.params.uid });
  res.json(projs);
});

// DELETE
export const deleteProject = asyncHandler(async (req, res) => {
  const proj = await Project.findByIdAndDelete(req.params.id);
  res.json(proj);
});
