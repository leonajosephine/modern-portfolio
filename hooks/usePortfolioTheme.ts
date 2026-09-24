"use client";

import {
  useEffect,
  useState,
} from "react";

export type PortfolioTheme =
  | "dark"
  | "light"
  | "sunset"
  | "ocean";

const STORAGE_KEY = "portfolio-theme";

function isPortfolioTheme(
  value: string | null
): value is PortfolioTheme {
  return (
    value === "dark" ||
    value === "light" ||
    value === "sunset" ||
    value === "ocean"
  );
}

export function usePortfolioTheme() {
  const [theme, setTheme] =
    useState<PortfolioTheme>("dark");

  useEffect(() => {
    const storedTheme =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (isPortfolioTheme(storedTheme)) {
      setTheme(storedTheme);
    } else {
      const currentTheme =
        document.body.getAttribute(
          "data-theme"
        );

      if (
        isPortfolioTheme(currentTheme)
      ) {
        setTheme(currentTheme);
      }
    }

    const handleThemeChange = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<{
          theme: PortfolioTheme;
        }>;

      if (
        isPortfolioTheme(
          customEvent.detail?.theme
        )
      ) {
        setTheme(
          customEvent.detail.theme
        );
      }
    };

    window.addEventListener(
      "portfolio-theme-change",
      handleThemeChange
    );

    return () => {
      window.removeEventListener(
        "portfolio-theme-change",
        handleThemeChange
      );
    };
  }, []);

  return theme;
}