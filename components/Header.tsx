"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container">
        <div className="mt-4 flex items-center justify-between rounded-full border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-md sm:px-5">
          <a
            href="#top"
            className="text-sm font-medium tracking-[0.2em] text-foreground uppercase"
            aria-label="Go to top"
          >
            LJR
          </a>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}