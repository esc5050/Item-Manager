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
    <header className="sticky top-0 z-50 theme-surface-soft border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg md:text-2xl font-black tracking-tight"
          style={{ color: "var(--text-main)" }}
        >
          ITEM <span style={{ color: "var(--primary)" }}>MANAGER</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            to="/"
            className="px-3 py-2 rounded-xl text-sm font-semibold transition"
            style={{
              background: isActive("/") ? "var(--primary)" : "transparent",
              color: isActive("/") ? "#ffffff" : "var(--text-main)",
              border: isActive("/") ? "1px solid transparent" : "1px solid var(--border)"
            }}
          >
            Início
          </Link>

          <Link
            to="/manager"
            className="px-3 py-2 rounded-xl text-sm font-semibold transition"
            style={{
              background: isActive("/manager") ? "var(--primary)" : "transparent",
              color: isActive("/manager") ? "#ffffff" : "var(--text-main)",
              border: isActive("/manager") ? "1px solid transparent" : "1px solid var(--border)"
            }}
          >
            Manager
          </Link>

          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-2 rounded-xl text-sm font-semibold transition hover:scale-[1.03]"
            style={{
              background: dark ? "var(--surface-strong)" : "var(--text-main)",
              color: dark ? "var(--text-main)" : "#ffffff",
              border: "1px solid var(--border)"
            }}
          >
            {dark ? "☀ Claro" : "🌙 Escuro"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
