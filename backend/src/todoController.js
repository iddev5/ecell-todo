import Todo from "./todoModel.js";
import asyncHandler from "express-async-handler";

// CREATE
export const createTodo = asyncHandler(async (req, res) => {
  const count = await Todo.countDocuments();

  const todoData = {
    hash: count + 1,
    title: req.body.title,
    desc: req.body.desc,
  };

  let todo = new Todo(todoData);
  await todo.save();
  res.json(todo);
});

// READ
export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

// UPDATE
export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
  // TODO: try to return the updated todo
  res.json(todo);
});

// DELETE
export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  res.json(todo);
});
