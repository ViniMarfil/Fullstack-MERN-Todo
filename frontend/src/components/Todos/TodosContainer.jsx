import { useState } from "react";
import Modal from "../Modal";

//TODO, CLEAN UP THE LOGIC
const DUMMY_TODOS = [
  { id: 1, text: "Learn React", completed: true },
  { id: 2, text: "Build a Todo App", completed: false },
];

export default function TodosContainer() {
  const [todos, setTodos] = useState(DUMMY_TODOS);
  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");

  const [isModalWarnOpen, setIsModalWarnOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [todoToDelete, setTodoToDelete] = useState(null);

  //Add
  function addTodoHandler(e) {
    e.preventDefault();
    if (input.trim() === "") return;
    const newTodo = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput("");
  }

  //Edit
  function editTodoHandler(currentTodo) {
    setTodoToEdit(currentTodo);
    setEditInput(currentTodo.text);
    setIsModalEditOpen(true);
  }

  function cancelEditHandler() {
    setTodoToEdit(null);
    setIsModalEditOpen(false);
  }

  function confirmEditTodoHandler() {
    const edittedTodo = { ...todoToEdit, text: editInput };
    const newTodos = todos.map((todo) =>
      todo.id === edittedTodo.id ? { ...todo, text: edittedTodo.text } : todo,
    );

    setTodos(newTodos);
    setIsModalEditOpen(false);
    setTodoToEdit(null);
  }

  //Delete
  function deleteTodoHandler(todoId) {
    setTodoToDelete(todoId);
    setIsModalWarnOpen(true);
  }

  function confirmDeleteTodoHandler() {
    setTodos(todos.filter((todo) => todo.id !== todoToDelete));
    setIsModalWarnOpen(false);
    setTodoToDelete(null);
  }

  function cancelDeleteHandler() {
    setIsModalWarnOpen(false);
    setTodoToDelete(null);
  }

  return (
    <>
      {/* Edit modal */}
      <Modal isOpen={isModalEditOpen} onClose={cancelEditHandler}>
        <h2 className="mb-2 text-xl font-bold">Edit todo</h2>
        <input
          type="text"
          className="input-primary"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button className="btn-confirm mr-2" onClick={confirmEditTodoHandler}>
            Confirm
          </button>
          <button className="btn-neutral" onClick={cancelEditHandler}>
            Cancel
          </button>
        </div>
      </Modal>

      {/* Delete modal */}
      <Modal isOpen={isModalWarnOpen} onClose={cancelDeleteHandler}>
        <h2 className="mb-2 text-xl font-bold">Warning</h2>
        <p>Are you sure you want to delete this todo?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="btn-warning mr-2"
            onClick={confirmDeleteTodoHandler}
          >
            Delete
          </button>
          <button className="btn-neutral" onClick={cancelDeleteHandler}>
            Cancel
          </button>
        </div>
      </Modal>

      {/* Main container */}
      <div className="w-full max-w-lg rounded-lg border border-white/30 bg-slate-200/50 p-6 shadow-lg backdrop-blur-3xl dark:border-white/10 dark:bg-slate-800/50">
        <h2 className="mb-4 text-center text-2xl font-bold">Todos</h2>
        <form onSubmit={addTodoHandler} className="mb-4 flex gap-2">
          <input
            className="input-primary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a todo..."
          />

          <button
            type="submit"
            className="btn-primary"
            disabled={!input.trim()}
          >
            <span>Add</span>
          </button>
        </form>
        <ul>
          {todos.length === 0 && (
            <li className="text-center text-slate-400">No todos yet.</li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="my-2 flex items-center justify-between rounded-lg border border-white/30 bg-white/80 pl-3 pr-0 shadow backdrop-blur-md dark:border-white/10 dark:bg-slate-700/80"
            >
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 accent-green-400 checked:border-green-900"
                checked={todo.completed}
                onClick={() => {
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t,
                    ),
                  );
                }}
              />
              <span
                className={
                  "min-w-0 flex-1 truncate pr-2" +
                  (todo.completed ? " line-through" : "")
                }
              >
                {todo.text}
              </span>
              <EditButton onClick={() => editTodoHandler(todo)} />
              <DeleteButton onClick={() => deleteTodoHandler(todo.id)} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function EditButton({ onClick }) {
  return (
    <button
      className="flex h-8 w-8 cursor-pointer items-center justify-center border-l border-r border-white/40 bg-gradient-to-b from-green-400 via-green-500 to-green-600 text-xs font-bold text-slate-100 shadow hover:from-green-500 hover:via-green-600 hover:to-green-700 focus:outline-none"
      title="Edit"
      onClick={onClick}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full">
        <svg
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </span>
    </button>
  );
}

function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r-lg bg-gradient-to-b from-red-500 via-red-600 to-red-700 text-xs font-bold text-slate-100 shadow hover:from-red-600 hover:via-red-700 hover:to-red-800 focus:outline-none"
      title="Remove"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 9l6 6M15 9l-6 6"
          />
        </svg>
      </span>
    </button>
  );
}
