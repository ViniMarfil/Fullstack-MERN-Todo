import ThemeToggler from "./components/ThemeToggler";

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 text-gray-900 dark:from-slate-600 dark:via-slate-700 dark:to-slate-800 dark:text-gray-100">
        <div className="absolute right-4 top-4">
          <ThemeToggler />
        </div>
        <h1 className="text-4xl font-bold">Hi my man</h1>
      </div>
    </>
  );
}

export default App;
