"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { Menu, X } from "lucide-react";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { usePortfolioTheme } from "@/hooks/usePortfolioTheme";

const navItems = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Work",
    href: "#portfolio",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  const headerRef =
    useRef<HTMLElement>(null);

  const theme = usePortfolioTheme();

  const isSwiss = theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (
      event: PointerEvent
    ) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [theme]);

  useEffect(() => {
    if (!isSwiss || !isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isSwiss]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      data-cursor="plain"
      className={`
        fixed inset-x-0 top-0 z-50

        ${
          isSwiss
            ? `
              border-b
              transition-[background-color,border-color,backdrop-filter]
              duration-300

              ${
                isScrolled ||
                isMenuOpen
                  ? `
                    border-border
                    bg-background/95
                    backdrop-blur-xl
                  `
                  : `
                    border-transparent
                    bg-transparent
                  `
              }
            `
            : ""
        }
      `}
    >
      <div
        className={
          isSwiss
            ? "w-full"
            : "container"
        }
      >
        <div
          className={
            isSwiss
              ? "relative"
              : "relative mt-4"
          }
        >
          {/* Main header */}
          <div
            className={
              isSwiss
                ? `
                  relative z-30
                  flex h-[64px]
                  w-full
                  items-center
                  justify-between
                  px-4
                  sm:h-[68px]
                  sm:px-6
                  lg:h-[72px]
                  lg:px-8
                `
                : `
                  portfolio-nav
                  relative z-20
                  flex items-center
                  justify-between
                  border border-border/70
                  bg-background/70
                  px-4 py-3
                  shadow-sm
                  backdrop-blur-md
                  sm:px-5
                `
            }
          >
            {/* Logo */}
            <a
              href="#top"
              data-cursor="plain"
              onClick={closeMenu}
              aria-label="Go to top"
              className={
                isSwiss
                  ? `
                    font-mono
                    text-[0.68rem]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-foreground

                    transition-opacity
                    duration-200

                    hover:opacity-50
                  `
                  : `
                    text-sm
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-foreground

                    transition-opacity
                    duration-300

                    hover:opacity-70
                  `
              }
            >
              {isSwiss ? (
                <>
                  <span className="sm:hidden">
                    Leona
                  </span>

                  <span className="hidden sm:inline">
                    Leona Redmann
                  </span>
                </>
              ) : (
                "LJR"
              )}
            </a>

            {/* Desktop navigation */}
            <nav
              className="
                absolute left-1/2
                hidden -translate-x-1/2
                items-center
                md:flex
              "
              aria-label="Main navigation"
            >
              {navItems.map(
                (item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    data-cursor="plain"
                    className={
                      isSwiss
                        ? `
                          group relative
                          flex items-center
                          gap-2
                          px-4 py-2

                          font-mono
                          text-[0.62rem]
                          uppercase
                          tracking-[0.16em]
                          text-muted-foreground

                          transition-colors
                          duration-200

                          hover:text-foreground
                        `
                        : `
                          relative
                          mx-4

                          text-[0.7rem]
                          font-light
                          uppercase
                          tracking-[0.22em]
                          text-muted-foreground

                          transition-all
                          duration-300

                          hover:text-foreground

                          after:absolute
                          after:-bottom-1.5
                          after:left-0
                          after:h-px
                          after:w-0
                          after:bg-foreground
                          after:transition-all
                          after:duration-300

                          hover:after:w-full
                        `
                    }
                  >
                    {isSwiss && (
                      <span
                        className="
                          text-[0.5rem]
                          opacity-35
                          transition-opacity
                          duration-200
                          group-hover:opacity-100
                        "
                      >
                        0{index + 1}
                      </span>
                    )}

                    <span>
                      {item.label}
                    </span>
                  </a>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeSwitcher />

              <button
                type="button"
                data-cursor="plain"
                onClick={() =>
                  setIsMenuOpen(
                    (current) => !current
                  )
                }
                aria-label={
                  isMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                className={
                  isSwiss
                    ? `
                      flex h-9 w-9
                      items-center
                      justify-center

                      border-l
                      border-foreground/20
                      bg-transparent
                      text-foreground

                      transition-colors
                      duration-200

                      hover:bg-foreground
                      hover:text-background

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-foreground

                      md:hidden
                    `
                    : `
                      portfolio-icon-button
                      flex h-9 w-9
                      items-center
                      justify-center

                      border border-border
                      bg-transparent
                      text-foreground

                      hover:scale-105
                      hover:bg-muted

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-ring
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-background

                      md:hidden
                    `
                }
              >
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  <motion.span
                    key={
                      isMenuOpen
                        ? "close"
                        : "menu"
                    }
                    initial={{
                      opacity: 0,
                      rotate: -15,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 15,
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                  >
                    {isMenuOpen ? (
                      <X
                        size={18}
                        strokeWidth={1.5}
                      />
                    ) : (
                      <Menu
                        size={19}
                        strokeWidth={1.5}
                      />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                data-cursor="plain"
                initial={{
                  opacity: 0,
                  y: isSwiss
                    ? -8
                    : -10,
                  scale: isSwiss
                    ? 1
                    : 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: isSwiss
                    ? -8
                    : -8,
                  scale: isSwiss
                    ? 1
                    : 0.98,
                }}
                transition={{
                  duration: 0.25,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className={
                  isSwiss
                    ? `
                      fixed
                      inset-x-0
                      bottom-0
                      top-[64px]
                      z-20

                      flex flex-col

                      bg-background

                      sm:top-[68px]
                      md:hidden
                    `
                    : `
                      portfolio-mobile-nav
                      absolute inset-x-0
                      top-[calc(100%+0.55rem)]
                      z-10

                      overflow-hidden
                      border border-border/70
                      bg-background/90
                      p-2

                      shadow-[0_20px_60px_rgba(0,0,0,0.16)]
                      backdrop-blur-xl

                      md:hidden
                    `
                }
              >
                {isSwiss ? (
                  <>
                    {/* Large Swiss mobile nav */}
                    <div className="flex flex-1 flex-col">
                      {navItems.map(
                        (item, index) => (
                          <motion.a
                            key={item.label}
                            href={item.href}
                            data-cursor="plain"
                            onClick={closeMenu}
                            initial={{
                              opacity: 0,
                              y: 20,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration: 0.35,
                              delay:
                                index *
                                0.06,
                              ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                              ],
                            }}
                            className="
                              group
                              flex flex-1
                              items-center
                              justify-between

                              border-b
                              border-border

                              px-4
                              sm:px-6

                              text-foreground

                              transition-colors
                              duration-200

                              hover:bg-foreground
                              hover:text-background
                            "
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className="
                                  mt-2
                                  font-mono
                                  text-[0.55rem]
                                  uppercase
                                  tracking-[0.15em]
                                  opacity-40
                                "
                              >
                                0{index + 1}
                              </span>

                              <span
                                className="
                                  font-display
                                  text-[clamp(2.8rem,15vw,5rem)]
                                  font-medium
                                  uppercase
                                  leading-none
                                  tracking-[-0.07em]
                                "
                              >
                                {item.label}
                              </span>
                            </div>

                            <span
                              aria-hidden
                              className="
                                text-2xl
                                font-light
                                opacity-35
                                transition-all
                                duration-300

                                group-hover:translate-x-1
                                group-hover:-translate-y-1
                                group-hover:opacity-100
                              "
                            >
                              ↗
                            </span>
                          </motion.a>
                        )
                      )}
                    </div>

                    <div
                      className="
                        flex items-center
                        justify-between
                        px-4 py-4
                        sm:px-6

                        font-mono
                        text-[0.55rem]
                        uppercase
                        tracking-[0.16em]
                        text-muted-foreground
                      "
                    >
                      <span>
                        Hamburg, Germany
                      </span>

                      <span>
                        Portfolio / 2026
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col">
                    {navItems.map(
                      (item, index) => (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          data-cursor="plain"
                          onClick={closeMenu}
                          initial={{
                            opacity: 0,
                            y: -6,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.2,
                            delay:
                              index *
                              0.04,
                          }}
                          className="
                            group
                            flex items-center
                            justify-between

                            px-4 py-4

                            text-sm
                            font-light
                            uppercase
                            tracking-[0.2em]
                            text-muted-foreground

                            transition-colors
                            duration-200

                            hover:bg-muted
                            hover:text-foreground
                          "
                        >
                          <span>
                            {item.label}
                          </span>

                          <span
                            aria-hidden
                            className="
                              text-base
                              font-light
                              opacity-40
                              transition-transform
                              duration-200
                              group-hover:translate-x-1
                            "
                          >
                            ↗
                          </span>
                        </motion.a>
                      )
                    )}
                  </div>
                )}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}