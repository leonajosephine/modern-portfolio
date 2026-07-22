"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flower2, Martini, Moon, Sun } from "lucide-react";

type ThemeId = "dark" | "light" | "sunset" | "ocean";

type Theme = {
  id: ThemeId;
  icon: ReactNode;
  label: string;
  shortLabel: string;
};

const themes: Theme[] = [
  {
    id: "dark",
    icon: <Moon size={16} />,
    label: "Use dark theme",
    shortLabel: "Dark",
  },
  {
    id: "light",
    icon: <Sun size={16} />,
    label: "Use light theme",
    shortLabel: "Light",
  },
  {
    id: "sunset",
    icon: <Martini size={16} />,
    label: "Use espresso martini theme",
    shortLabel: "Martini",
  },
  {
    id: "ocean",
    icon: <Flower2 size={16} />,
    label: "Use tennis court theme",
    shortLabel: "Tennis",
  },
];

function isThemeId(value: string | null): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] =
    useState<ThemeId>("dark");
  const [isOpen, setIsOpen] = useState(false);

  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(
      "portfolio-theme"
    );

    const initialTheme: ThemeId = isThemeId(storedTheme)
      ? storedTheme
      : "dark";

    setCurrentTheme(initialTheme);
    document.body.setAttribute("data-theme", initialTheme);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const setTheme = (theme: ThemeId) => {
    setCurrentTheme(theme);
    setIsOpen(false);

    document.body.setAttribute("data-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
  };

  const activeTheme =
    themes.find((theme) => theme.id === currentTheme) ??
    themes[0];

  return (
    <div
      ref={switcherRef}
      className="relative"
      data-cursor="theme"
    >
      {/* Desktop version */}
      <div
        className="hidden items-center gap-1.5 md:flex"
        role="group"
        aria-label="Choose color theme"
      >
        {themes.map((theme) => {
          const isActive = currentTheme === theme.id;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setTheme(theme.id)}
              aria-label={theme.label}
              aria-pressed={isActive}
              className={`
                flex h-9 w-9 items-center justify-center
                rounded-full border transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2
                focus-visible:ring-offset-background
                ${
                  isActive
                    ? "scale-105 border-primary bg-primary text-primary-foreground"
                    : "border-border bg-transparent text-foreground hover:scale-105 hover:bg-muted"
                }
              `}
            >
              <span
                className={`transition-transform duration-200 ${
                  isActive ? "scale-110" : "scale-100"
                }`}
              >
                {theme.icon}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile active-theme button */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="
          flex h-9 w-9 items-center justify-center
          rounded-full border border-primary
          bg-primary text-primary-foreground
          transition-all duration-200
          hover:scale-105
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring focus-visible:ring-offset-2
          focus-visible:ring-offset-background
          md:hidden
        "
        aria-label={`Current theme: ${activeTheme.shortLabel}. Open theme menu`}
        aria-expanded={isOpen}
        aria-controls="mobile-theme-menu"
      >
        <motion.span
          key={currentTheme}
          initial={{ opacity: 0, rotate: -18, scale: 0.75 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {activeTheme.icon}
        </motion.span>
      </button>

      {/* Mobile theme dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-theme-menu"
            initial={{ opacity: 0, y: -8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.94 }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute right-0 top-[calc(100%+0.65rem)] z-40
              flex flex-col gap-1.5 rounded-[1.25rem]
              border border-border/70 bg-background/90
              p-1.5 shadow-[0_16px_45px_rgba(0,0,0,0.18)]
              backdrop-blur-xl md:hidden
            "
            role="group"
            aria-label="Choose color theme"
          >
            {themes.map((theme, index) => {
              const isActive = currentTheme === theme.id;

              return (
                <motion.button
                  key={theme.id}
                  type="button"
                  onClick={() => setTheme(theme.id)}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.18,
                    delay: index * 0.035,
                  }}
                  aria-label={theme.label}
                  aria-pressed={isActive}
                  className={`
                    flex h-9 w-9 items-center justify-center
                    rounded-full border transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-ring
                    ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-transparent bg-transparent text-foreground hover:border-border hover:bg-muted"
                    }
                  `}
                >
                  {theme.icon}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}