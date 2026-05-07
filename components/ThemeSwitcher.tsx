"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Martini, Flower2, IceCreamCone } from "lucide-react";

type ThemeId = "dark" | "light" | "sunset" | "ocean";

const themes: {
  id: ThemeId;
  icon: React.ReactNode;
  label: string;
}[] = [
  { id: "dark", icon: <Moon size={16} />, label: "Dark theme" },
  { id: "light", icon: <Sun size={16} />, label: "Light theme" },
  { id: "sunset", icon: <Martini size={16} />, label: "Espresso Martini Theme" },
  { id: "ocean", icon: <Flower2 size={16} />, label: "Tennis court theme" },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme") as ThemeId | null;
    const initial = stored || "dark";

    setCurrentTheme(initial);
    document.body.setAttribute("data-theme", initial);
  }, []);

  const setTheme = (theme: ThemeId) => {
    setCurrentTheme(theme);
    document.body.setAttribute("data-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
  };

  return (
    <div className="flex items-center gap-1.5">
      {themes.map((t) => {
        const isActive = currentTheme === t.id;

        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            aria-label={t.label}
            className={`
              flex h-9 w-9 items-center justify-center rounded-full
              border border-border
              transition-all duration-200
              ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary scale-105"
                  : "bg-transparent text-foreground hover:bg-muted hover:scale-105"
              }
            `}
          >
            <span
              className={`transition-transform duration-200 ${
                isActive ? "scale-110" : "scale-100"
              }`}
            >
              {t.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
}