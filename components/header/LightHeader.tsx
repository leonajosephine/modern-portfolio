"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  Menu,
  X,
} from "lucide-react";

import ThemeSwitcher from "@/components/ThemeSwitcher";

import type { HeaderVariantProps } from "@/components/Header";

export default function LightHeader({
  navItems,
  isMenuOpen,
  isScrolled,
  closeMenu,
  toggleMenu,
}: HeaderVariantProps) {
  return (
    <div
      className={`
        w-full

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
      `}
    >
      <div className="relative">
        {/* ================================================================ */}
        {/* MAIN HEADER                                                      */}
        {/* ================================================================ */}

        <div
          className="
            relative
            z-30

            flex
            h-[64px]
            w-full
            items-center
            justify-between

            px-4

            sm:h-[68px]
            sm:px-6

            lg:h-[72px]
            lg:px-8
          "
        >
          {/* Logo */}

          <a
            href="#top"
            data-cursor="plain"
            onClick={closeMenu}
            aria-label="Go to top"
            className="
              font-mono
              text-[0.68rem]
              font-medium
              uppercase
              tracking-[0.18em]
              text-foreground

              transition-opacity
              duration-200

              hover:opacity-50
            "
          >
            <span className="sm:hidden">
              Leona
            </span>

            <span className="hidden sm:inline">
              Leona Redmann
            </span>
          </a>

          {/* Desktop navigation */}

          <nav
            className="
              absolute
              left-1/2

              hidden
              -translate-x-1/2
              items-center

              md:flex
            "
            aria-label="Main navigation"
          >
            {navItems.map(
              (
                item,
                index
              ) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-cursor="plain"
                  className="
                    group
                    relative

                    flex
                    items-center
                    gap-2

                    px-4
                    py-2

                    font-mono
                    text-[0.62rem]
                    uppercase
                    tracking-[0.16em]
                    text-muted-foreground

                    transition-colors
                    duration-200

                    hover:text-foreground
                  "
                >
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

                  <span>
                    {
                      item.label
                    }
                  </span>
                </a>
              )
            )}
          </nav>

          {/* Actions */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <ThemeSwitcher />

            <button
              type="button"
              data-cursor="plain"
              onClick={toggleMenu}
              aria-label={
                isMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={
                isMenuOpen
              }
              aria-controls="swiss-mobile-navigation"
              className="
                flex
                h-9
                w-9
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
              "
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

        {/* ================================================================ */}
{/* MOBILE NAVIGATION                                                */}
{/* ================================================================ */}

<AnimatePresence>
  {isMenuOpen && (
    <motion.nav
      id="swiss-mobile-navigation"
      aria-label="Mobile navigation"
      data-cursor="plain"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
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
      className="
        fixed
        inset-0
        z-20

        flex
        h-[100svh]
        min-h-[100svh]
        w-screen
        flex-col

        bg-[var(--bg-primary)]
        text-[var(--text-primary)]

        pt-[64px]

        sm:pt-[68px]

        md:hidden
      "
    >
      {/* ============================================================ */}
      {/* NAV LINKS                                                    */}
      {/* ============================================================ */}

      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col
        "
      >
        {navItems.map(
          (
            item,
            index
          ) => (
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
              exit={{
                opacity: 0,
                y: 10,
              }}
              transition={{
                duration: 0.35,
                delay:
                  index * 0.06,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                group

                flex
                min-h-0
                flex-1
                items-center
                justify-between

                border-b
                border-[var(--border)]

                px-4

                text-[var(--text-primary)]

                transition-colors
                duration-200

                hover:bg-[var(--text-primary)]
                hover:text-[var(--bg-primary)]

                sm:px-6
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >
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

                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:opacity-100
                "
              >
                ↗
              </span>
            </motion.a>
          )
        )}
      </div>

      {/* ============================================================ */}
      {/* BOTTOM META                                                  */}
      {/* ============================================================ */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.2,
          duration: 0.3,
        }}
        className="
          flex
          shrink-0
          items-center
          justify-between

          px-4
          py-4

          font-mono
          text-[0.55rem]
          uppercase
          tracking-[0.16em]
          text-[var(--text-secondary)]

          sm:px-6
        "
      >
        <span>
          Hamburg, Germany
        </span>

        <span>
          Portfolio / 2026
        </span>
      </motion.div>
    </motion.nav>
  )}
</AnimatePresence>
      </div>
    </div>
  );
}