import { useTheme } from "../context/ThemeContext";

export default function ThemeToggler() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    
    <button
      onClick={toggleDarkMode}
      className="flex h-8 w-14 items-center rounded-full  bg-slate-200 p-1 shadow cursor-pointer transition-colors duration-300 focus:ring-0 dark:bg-slate-800  hover:shadow-slate-700/50 dark:hover:shadow-slate-200/50"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Button on the track */}
      <div
        className={`flex h-6 w-6 transform items-center justify-center rounded-full  bg-white shadow-md transition-transform duration-300 dark:bg-slate-700 ${
          darkMode ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {darkMode ? (
          // Sun icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-slate-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <g stroke="currentColor" strokeLinecap="round">
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
          </svg>
        ) : (
          // Moon icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-slate-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              stroke="none"
              fill="currentColor"
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
