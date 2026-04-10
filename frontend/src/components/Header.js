import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const location = useLocation();
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 dark:border-gray-800 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg md:text-2xl font-black tracking-tight text-gray-900 dark:text-white"
        >
          ITEM <span className="text-blue-600 dark:text-cyan-400">MANAGER</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            to="/"
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
              isActive("/")
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-gray-800"
            }`}
          >
            Início
          </Link>

          <Link
            to="/manager"
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
              isActive("/manager")
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-gray-800"
            }`}
          >
            Manager
          </Link>

          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:scale-[1.03] transition"
          >
            {dark ? "☀ Claro" : "🌙 Escuro"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
