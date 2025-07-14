import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Todo from "./database/Todo.js";

const dbName = process.env.NODE_ENV === "test" ? "todos_test" : "todos";
mongoose.connect(`mongodb://localhost:27017/${dbName}`);

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("The backend is functional! You beautiful being!");
});

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  // Map _id to id for frontend compatibility
  const todosWithId = todos.map((todo) => ({
    id: todo._id,
    text: todo.text,
    completed: todo.completed,
  }));
  res.json(todosWithId);
});

// Add todo
app.post("/todos", async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ error: "Todo 'text' is required." });
  }
  const newTodo = await Todo.create({ text });
  // Map _id to id for frontend compatibility
  res.status(201).json({
    id: newTodo._id,
    text: newTodo.text,
    completed: newTodo.completed,
  });
});

// Edit todo
app.put("/todos/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Todo id is required." });
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid todo id." });
  }
  const { text, completed } = req.body;
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found." });
  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ error: "Todo 'text' is required." });
  }
  if (typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ error: "'completed' must be true or false." });
  }
  todo.text = text;
  todo.completed = completed;
  await todo.save();
  res.json({
    id: todo._id,
    text: todo.text,
    completed: todo.completed,
  });
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid todo id." });
  }
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found." });
  res.status(204).end();
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
