import { Schema, model } from "mongoose";

const todoSchema = Schema(
  {
    hash: {
      type: Number,
      required: true,
    },
    pid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    status: {
      type: String,
      default: "open",
    },
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);

export default Todo;
