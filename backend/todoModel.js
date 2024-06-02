import { Schema, model } from "mongoose";

const todoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

const Todo = model("Todo", todoSchema);

export default Todo;
