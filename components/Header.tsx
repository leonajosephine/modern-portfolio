"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container">
        <div className="mt-4 flex items-center justify-between rounded-full border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-md sm:px-5">
          <a
            href="#top"
            className="text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-opacity duration-300 hover:opacity-70"
            aria-label="Go to top"
          >
            LJR
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  relative text-[0.7rem] font-light uppercase tracking-[0.22em]
                  text-muted-foreground transition-all duration-300
                  hover:text-foreground
                  after:absolute after:left-0 after:-bottom-1.5
                  after:h-px after:w-0 after:bg-foreground
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}