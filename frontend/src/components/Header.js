import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
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

  return (
    <header className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
      <h1 className="text-xl font-bold text-black dark:text-white">
        ITEM MANAGER
      </h1>

      <div className="flex gap-4">
        <Link
          to="/manager"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Manager
        </Link>

        <button
          onClick={() => setDark(!dark)}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Header;
