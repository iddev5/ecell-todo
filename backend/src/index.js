import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "./todoController.js";
import admin from "./firebase.js";
import User from "./userModel.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api", createTodo);
app.get("/api", getTodos);
app.put("/api/:id", updateTodo);
app.delete("/api/:id", deleteTodo);

app.post("/api/auth/google", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  console.log(token);

  if (!token) {
    res.sendStatus(401).json({ error: 'No token' });
  }

  try {
    const decoded = admin.auth().verifyIdToken(token);
    const { uid, name, email } = decoded;

    let user = User.findOne({ uid: uid });
    console.log(decoded, user);

    if (!user) {
      const newUser = new User({
        uid: uid,
        name: name,
        email: email,
      })
      await newUser.save();
    }
  } catch (e) {
    return res.sendStatus(401).json({ error: e })
  }

  res.sendStatus(200);
});

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
