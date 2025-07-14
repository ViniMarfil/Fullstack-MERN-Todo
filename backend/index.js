import {
  checkIfIdExist,
  validateTodoId,
  validateTodoComplete,
  validateTodoText,
} from "./utils.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors());

let newId = 3;
const DUMMY_TODOS = [
  { id: 1, text: "Learn React", completed: true },
  { id: 2, text: "Build a Todo App", completed: false },
];
let todos = [...DUMMY_TODOS];

app.get("/", (req, res) => {
  res.send("The backend is functional! You beautiful being!");
});

//Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

//Add todo
app.post("/todos", (req, res) => {
  const { text } = req.body;

  if (!validateTodoText(text)) {
    return res.status(400).json({ error: "Todo 'text' is required." });
  }

  const newTodo = { id: newId++, text: text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//Edit todo
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const { text, completed } = req.body;

  //Validate Id
  if (!validateTodoId(todoId)) {
    return res.status(400).json({ error: "Invalid todo id." });
  }

  //Check if it exists
  if (!checkIfIdExist(todos, todoId)) {
    return res.status(404).json({ error: "Todo not found." });
  }

  //Validate text
  if (!validateTodoText(text)) {
    return res.status(400).json({ error: "Todo 'text' is required." });
  }

  //Validate complete
  if (!validateTodoComplete(completed)) {
    return res
      .status(400)
      .json({ error: "'completed' must be true or false." });
  }

  todos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, text, completed } : todo,
  );

  res.json({ id: todoId, text, completed });
});

//Delete todo
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);

  //Validate Id
  if (!validateTodoId(todoId)) {
    return res.status(400).json({ error: "Invalid todo id." });
  }

  //Check if it exists
  if (!checkIfIdExist(todos, todoId)) {
    return res.status(404).json({ error: "Todo not found." });
  }

  //Finally, delete
  todos = todos.filter((todo) => todo.id !== todoId);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
