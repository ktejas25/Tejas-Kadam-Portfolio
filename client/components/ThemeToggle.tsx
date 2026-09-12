import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="relative flex items-center bg-muted/50 rounded-full p-1 border border-border/50 backdrop-blur-sm">
      <button
        onClick={toggleDarkMode}
        className="theme-toggle relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
        title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 opacity-0 dark:opacity-0 light:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 dark:opacity-100 transition-opacity duration-300" />
        <Sun
          className={`h-5 w-5 absolute transition-all duration-300 ${
            darkMode ? "rotate-90 scale-0 text-transparent" : "rotate-0 scale-100 text-white drop-shadow-sm"
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`h-5 w-5 absolute transition-all duration-300 ${
            darkMode ? "rotate-0 scale-100 text-white drop-shadow-sm" : "-rotate-90 scale-0 text-transparent"
          }`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
