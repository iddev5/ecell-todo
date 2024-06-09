import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import * as path from 'path';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "./todoController.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api", createTodo);
app.get("/api", getTodos);
app.put("/api/:id", updateTodo);
app.delete("/api/:id", deleteTodo);

const PORT = process.env.PORT || 8080;
app.listen(
  PORT,
  console.log(`App is running on port http://localhost:${PORT}`)
);

/*if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(import.meta.dirname, "../../frontend", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(import.meta.dirname, "../../frontend", "build", "index.html"));
  });
}*/
