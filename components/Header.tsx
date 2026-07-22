"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      data-cursor="nav"
    >
      <div className="container">
        <div className="relative mt-4">
          <div className="relative z-20 flex items-center justify-between rounded-full border border-border/70 bg-background/70 px-4 py-3 shadow-sm backdrop-blur-md sm:px-5">
            <a
              href="#top"
              onClick={closeMenu}
              className="text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-opacity duration-300 hover:opacity-70"
              aria-label="Go to top"
            >
              LJR
            </a>

            {/* Desktop navigation */}
            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="
                    relative text-[0.7rem] font-light uppercase
                    tracking-[0.22em] text-muted-foreground
                    transition-all duration-300 hover:text-foreground
                    after:absolute after:-bottom-1.5 after:left-0
                    after:h-px after:w-0 after:bg-foreground
                    after:transition-all after:duration-300
                    hover:after:w-full
                  "
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeSwitcher />

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen((current) => !current)}
                className="
                  flex h-9 w-9 items-center justify-center rounded-full
                  border border-border bg-transparent text-foreground
                  transition-all duration-200
                  hover:scale-105 hover:bg-muted
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                  md:hidden
                "
                aria-label={
                  isMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMenuOpen ? "close" : "menu"}
                    initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                    transition={{ duration: 0.16 }}
                  >
                    {isMenuOpen ? <X size={17} /> : <Menu size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile navigation dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{
                  duration: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute inset-x-0 top-[calc(100%+0.55rem)] z-10
                  overflow-hidden rounded-[1.5rem]
                  border border-border/70 bg-background/90
                  p-2 shadow-[0_20px_60px_rgba(0,0,0,0.16)]
                  backdrop-blur-xl md:hidden
                "
              >
                <div className="flex flex-col">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.04,
                      }}
                      className="
                        group flex items-center justify-between
                        rounded-[1rem] px-4 py-4
                        text-sm font-light uppercase tracking-[0.2em]
                        text-muted-foreground
                        transition-colors duration-200
                        hover:bg-muted hover:text-foreground
                      "
                    >
                      <span>{item.label}</span>

                      <span
                        aria-hidden
                        className="
                          text-base font-light opacity-40
                          transition-transform duration-200
                          group-hover:translate-x-1
                        "
                      >
                        ↗
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}