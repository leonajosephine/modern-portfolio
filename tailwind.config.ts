import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-sans)",
        serif: "var(--font-serif)",
        mono: "var(--font-mono)",
      },
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        muted: "var(--text-secondary)",
        accent: "var(--accent)",
        border: "var(--border)",
      },
    },
  },
};

export default config;