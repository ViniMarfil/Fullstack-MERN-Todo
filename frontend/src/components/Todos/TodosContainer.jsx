import { useState } from "react";

export default function TodosContainer() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  function addTodo(e) {
    e.preventDefault();
    if (input.trim() === "") return;
    setTodos([...todos, input.trim()]);
    setInput("");
  }

  function removeTodo(idx) {
    setTodos(todos.filter((_, i) => i !== idx));
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-slate-200/50 dark:bg-slate-800/50 border border-white/30 dark:border-white/10 backdrop-blur-3xl p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-center">Todos</h2>
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          className="flex-1 rounded-lg bg-white/60 dark:bg-slate-700/60 border border-white/30 dark:border-white/10 backdrop-blur-md p-2 shadow-[inset_2px_2px_8px_#cbd5e1,inset_-2px_-2px_8px_#fff] dark:shadow-[inset_2px_2px_8px_#1e293b,inset_-2px_-2px_8px_#334155] focus:outline-none focus:ring-1 focus:ring-slate-300/30 focus:border-slate-400/40 dark:focus:ring-white/10 dark:focus:border-white/10 dark:text-white"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a todo..."
        />
        <button
          type="submit"
          className="relative overflow-hidden group rounded-lg bg-violet-500/80 hover:bg-violet-500/90 border border-white/30 px-4 py-2 text-white shadow-2xl shadow-violet-500/20 active:shadow-md active:scale-98 backdrop-blur-md cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Add</span>
        </button>
      </form>
      <ul>
        {todos.length === 0 && (
          <li className="text-slate-400 text-center">No todos yet.</li>
        )}
        {todos.map((todo, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between py-2 px-3 my-2 rounded-lg bg-white/80 dark:bg-slate-700/80 border border-white/30 dark:border-white/10 backdrop-blur-md shadow"
          >
            <span>{todo}</span>
            <button
              onClick={() => removeTodo(idx)}
              className="text-xs text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}