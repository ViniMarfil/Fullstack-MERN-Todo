import { useTheme } from "../context/ThemeContext";

export default function ThemeToggler() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded bg-slate-200 dark:bg-slate-800"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
