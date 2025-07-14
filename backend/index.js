const express = require("express");
const app = express();
const PORT = 3001;
app.use(express.json());

let newId = 3;
const DUMMY_TODOS = [
  { id: 1, text: "Learn React", completed: true },
  { id: 2, text: "Build a Todo App", completed: false },
];
let todos = [...DUMMY_TODOS];

app.get("/", (req, res) =>{
    res.send("The backend is functional! You beautiful being!")
})

//Get all todos
app.get("/todos", (req, res) =>{
    res.json(todos);
})

//Add todo
app.post("/todos", (req, res) =>{
    const newTodo = {id: newId++, ...req.body  }
    todos.push(newTodo);
    res.status(201).json(newTodo);
})

//Edit todo
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const { text, completed } = req.body;
  todos = todos.map(todo =>
    todo.id === todoId ? { ...todo, text, completed } : todo
  );
  res.json({ id: todoId, text, completed });
});

//Delete todo
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== todoId);
  res.status(204).end();
});

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
