"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration error
  useEffect(() => setMounted(true), []);
if (!mounted || !theme) return null;

  // Determine next theme
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors duration-300 flex items-center justify-center shadow-md"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 lg:h-6 lg:w-6 text-gray-700" />
      ) : (
        <Sun className="h-4 w-4 lg:h-6 lg:w-6 text-yellow-400" />
      )}
    </button>
  );
}
