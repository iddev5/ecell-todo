import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
} from "./todoController.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.post("/api", createTodo);
app.get("/api", getTodos);
app.put("/api", updateTodo);
app.delete("/api", deleteTodo);

const PORT = process.env.PORT || 8080;
app.listen(
    PORT,
    console.log(`App is running on port http://localhost:${PORT}`)
);