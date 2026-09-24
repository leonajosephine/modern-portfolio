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

export default function DefaultHeader({
  navItems,
  isMenuOpen,
  closeMenu,
  toggleMenu,
}: HeaderVariantProps) {
  return (
    <div className="container">
      <div className="relative mt-4">
        {/* ================================================================ */}
        {/* MAIN HEADER                                                      */}
        {/* ================================================================ */}

        <div
          className="
            portfolio-nav

            relative
            z-20

            flex
            items-center
            justify-between

            border
            border-border/70
            bg-background/70

            px-4
            py-3

            shadow-sm
            backdrop-blur-md

            sm:px-5
          "
        >
          {/* Logo */}

          <a
            href="#top"
            data-cursor="plain"
            onClick={closeMenu}
            aria-label="Go to top"
            className="
              text-sm
              font-medium
              uppercase
              tracking-[0.2em]
              text-foreground

              transition-opacity
              duration-300

              hover:opacity-70
            "
          >
            LJR
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
              (item) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-cursor="plain"
                  className="
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
                  "
                >
                  {item.label}
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
              aria-controls="default-mobile-navigation"
              className="
                portfolio-icon-button

                flex
                h-9
                w-9
                items-center
                justify-center

                border
                border-border
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
      id="default-mobile-navigation"
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
        duration: 0.3,
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
        z-10

        flex
        min-h-[100svh]
        flex-col

        bg-background

        px-5
        pb-8
        pt-28

        md:hidden
      "
    >
      <div
        className="
          flex
          flex-1
          flex-col
          justify-center

          py-10
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
                y: 22,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 12,
              }}
              transition={{
                duration: 0.4,
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

                flex
                items-center
                justify-between

                border-b
                border-border/70

                py-6

                text-foreground

                first:border-t
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <span
                  className="
                    mt-2

                    font-mono
                    text-[0.5rem]
                    uppercase
                    tracking-[0.16em]
                    text-muted-foreground
                  "
                >
                  0{index + 1}
                </span>

                <span
                  className="
                    font-display
                    text-[clamp(2.8rem,14vw,4.75rem)]
                    font-light
                    uppercase
                    leading-[0.9]
                    tracking-[-0.055em]
                  "
                >
                  {item.label}
                </span>
              </div>

              <span
                aria-hidden
                className="
                  text-xl
                  font-light
                  text-muted-foreground

                  transition-transform
                  duration-300

                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              >
                ↗
              </span>
            </motion.a>
          )
        )}
      </div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.22,
          duration: 0.4,
        }}
        className="
          flex
          items-center
          justify-between

          font-mono
          text-[0.5rem]
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
      </motion.div>
    </motion.nav>
  )}
</AnimatePresence>
      </div>
    </div>
  );
}