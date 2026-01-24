import { Schema, model } from "mongoose";

const projectSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = model("Project", projectSchema);

export default Project;
