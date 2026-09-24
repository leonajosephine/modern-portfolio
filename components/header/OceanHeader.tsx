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

export default function OceanHeader({
  navItems,
  isMenuOpen,
  isScrolled,
  closeMenu,
  toggleMenu,
}: HeaderVariantProps) {
  const glassClass = isScrolled
    ? `
        bg-[var(--ocean-glass-strong)]
        shadow-[0_12px_36px_rgba(61,48,132,0.12)]
      `
    : `
        bg-[var(--ocean-glass)]
        shadow-[var(--ocean-glass-shadow)]
      `;

  return (
    <div
      className="
        relative
        w-full

        px-4
        pt-4

        sm:px-6
        sm:pt-5

        lg:px-8
      "
    >
      {/* ================================================================ */}
      {/* DESKTOP                                                          */}
      {/* ================================================================ */}

      <div
        className="
          relative

          hidden
          w-full
          items-start
          justify-between

          md:flex
        "
      >
        {/* ---------------------------------------------------------------- */}
        {/* LOGO PILL                                                        */}
        {/* ---------------------------------------------------------------- */}

        <motion.a
          href="#top"
          data-cursor="plain"
          onClick={closeMenu}
          aria-label="Go to top"
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className={`
            flex
            h-12
            items-center
            justify-center

            rounded-full

            border
            border-[var(--ocean-glass-border)]

            px-5

            backdrop-blur-[18px]

            transition-[background-color,box-shadow,transform]
            duration-300

            hover:-translate-y-0.5

            ${glassClass}
          `}
        >
          <span
            className="
              font-mono
              text-[0.65rem]
              font-medium
              uppercase
              tracking-[0.2em]
              text-[var(--ocean-indigo-deep)]
            "
          >
            LJR
          </span>
        </motion.a>

        {/* ---------------------------------------------------------------- */}
        {/* NAVIGATION PILL                                                  */}
        {/* ---------------------------------------------------------------- */}

        <motion.nav
          aria-label="Main navigation"
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.05,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className={`
            absolute
            left-1/2
            top-0

            flex
            h-12
            -translate-x-1/2
            items-center

            rounded-full

            border
            border-[var(--ocean-glass-border)]

            p-1

            backdrop-blur-[18px]

            transition-[background-color,box-shadow]
            duration-300

            ${glassClass}
          `}
        >
          {navItems.map(
            (item) => (
              <a
                key={item.label}
                href={item.href}
                data-cursor="plain"
                className="
                  flex
                  h-10
                  items-center
                  justify-center

                  rounded-full

                  px-5

                  text-[0.67rem]
                  font-medium
                  uppercase
                  tracking-[0.13em]
                  text-[var(--ocean-indigo-deep)]/65

                  transition-[background-color,color,transform]
                  duration-300

                  hover:bg-[rgba(155,140,255,0.18)]
                  hover:text-[var(--ocean-indigo-deep)]

                  active:scale-[0.97]
                "
              >
                {item.label}
              </a>
            )
          )}
        </motion.nav>

        {/* ---------------------------------------------------------------- */}
        {/* THEME PILL                                                       */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className={`
            flex
            min-h-12
            items-center
            justify-center

            rounded-full

            border
            border-[var(--ocean-glass-border)]

            px-1.5

            backdrop-blur-[18px]

            transition-[background-color,box-shadow]
            duration-300

            ${glassClass}
          `}
        >
          <ThemeSwitcher />
        </motion.div>
      </div>

      {/* ================================================================ */}
      {/* MOBILE                                                           */}
      {/* ================================================================ */}

      <div
        className="
          relative

          flex
          items-start
          justify-between

          md:hidden
        "
      >
        {/* Logo */}

        <motion.a
          href="#top"
          data-cursor="plain"
          onClick={closeMenu}
          aria-label="Go to top"
          initial={{
            opacity: 0,
            y: -8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className={`
            flex
            h-11
            items-center
            justify-center

            rounded-full

            border
            border-[var(--ocean-glass-border)]

            px-4

            backdrop-blur-[18px]

            transition-[background-color,box-shadow]
            duration-300

            ${glassClass}
          `}
        >
          <span
            className="
              font-mono
              text-[0.62rem]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[var(--ocean-indigo-deep)]
            "
          >
            LJR
          </span>
        </motion.a>

        {/* Mobile actions */}

        <div
          className="
            flex
            items-start
            gap-2
          "
        >
          {/* Theme */}

          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.04,
            }}
            className={`
              flex
              min-h-11
              items-center
              justify-center

              rounded-full

              border
              border-[var(--ocean-glass-border)]

              px-1

              backdrop-blur-[18px]

              transition-[background-color,box-shadow]
              duration-300

              ${glassClass}
            `}
          >
            <ThemeSwitcher />
          </motion.div>

          {/* Menu */}

          <motion.button
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
            aria-controls="ocean-mobile-navigation"
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.08,
            }}
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-full

              border
              border-[var(--ocean-glass-border)]

              text-[var(--ocean-indigo-deep)]

              backdrop-blur-[18px]

              transition-[background-color,box-shadow,transform]
              duration-300

              active:scale-95

              ${glassClass}
            `}
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
                  rotate: -20,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 20,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.16,
                }}
              >
                {isMenuOpen ? (
                  <X
                    size={17}
                    strokeWidth={1.6}
                  />
                ) : (
                  <Menu
                    size={18}
                    strokeWidth={1.6}
                  />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* =============================================================== */}
{/* MOBILE FLOATING MENU                                            */}
{/* =============================================================== */}

<AnimatePresence>
  {isMenuOpen && (
    <motion.nav
      id="ocean-mobile-navigation"
      aria-label="Mobile navigation"
      data-cursor="plain"
      initial={{
        opacity: 0,
        scale: 0.96,
        y: 12,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.97,
        y: 8,
      }}
      transition={{
        duration: 0.4,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="
        fixed
        inset-x-3
        bottom-3
        top-[4.75rem]
        z-20

        flex
        flex-col

        overflow-hidden

        rounded-[2.25rem]

        border
        border-[var(--ocean-glass-border)]

        bg-[var(--ocean-glass-strong)]

        px-5
        pb-5
        pt-6

        shadow-[0_24px_80px_rgba(61,48,132,0.18)]

        backdrop-blur-[28px]

        sm:inset-x-4
        sm:bottom-4

        md:hidden
      "
    >
      {/* Small top meta */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.15,
        }}
        className="
          flex
          items-center
          justify-between

          font-mono
          text-[0.5rem]
          uppercase
          tracking-[0.16em]
          text-[var(--ocean-indigo-deep)]/40
        "
      >
        <span>
          Navigation
        </span>

        <span>
          03 links
        </span>
      </motion.div>

      {/* Links */}

      <div
        className="
          flex
          flex-1
          flex-col
          justify-center

          py-8
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
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay:
                  0.08 +
                  index *
                    0.065,
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

                rounded-[1.5rem]

                px-4
                py-5

                text-[var(--ocean-indigo-deep)]

                transition-colors
                duration-300

                hover:bg-[rgba(155,140,255,0.16)]
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
                    mt-1.5

                    font-mono
                    text-[0.48rem]
                    uppercase
                    tracking-[0.14em]
                    text-[var(--ocean-indigo-deep)]/35
                  "
                >
                  0{index + 1}
                </span>

                <span
                  className="
                    font-display
                    text-[clamp(2.6rem,13vw,4rem)]
                    font-medium
                    leading-[0.9]
                    tracking-[-0.06em]
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
                  text-[var(--ocean-indigo-deep)]/45

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

      {/* Bottom */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
          duration: 0.4,
        }}
        className="
          flex
          items-center
          justify-between

          border-t
          border-[var(--ocean-glass-border)]

          pt-4

          font-mono
          text-[0.5rem]
          uppercase
          tracking-[0.15em]
          text-[var(--ocean-indigo-deep)]/40
        "
      >
        <span>
          Hamburg, Germany
        </span>

        <span>
          Portfolio · 2026
        </span>
      </motion.div>
    </motion.nav>
  )}
</AnimatePresence>
      </div>
    </div>
  );
}