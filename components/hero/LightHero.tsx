"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const letters = ["L", "E", "O", "N", "A"];

export default function LightHero() {
  const [activeLetter, setActiveLetter] =
    useState<number | null>(null);

  return (
    <section
      id="top"
      data-cursor="plain"
      className="
        relative flex
        min-h-[100svh]
        flex-col
        overflow-hidden
        bg-background
        pt-[64px]
        sm:pt-[68px]
        md:pt-[72px]
      "
    >
      {/* ================================================================ */}
      {/* HERO CONTENT                                                     */}
      {/* ================================================================ */}

      <div
        className="
          relative z-10
          flex flex-1 flex-col
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Metadata */}
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex items-start
            justify-between
            border-t
            border-foreground/20
            pt-3

            font-mono
            text-[0.52rem]
            uppercase
            tracking-[0.15em]
            text-muted-foreground

            sm:text-[0.6rem]
          "
        >
          <div>
            <p>
             Web & App Developer
            </p>

            <p className="hidden sm:block">
              UI / UX · Creative Tech
            </p>
          </div>

          <div className="text-right">
            <p>
              Hamburg
            </p>

            <p className="hidden sm:block">
              Germany
            </p>
          </div>
        </motion.div>

        {/* Main statement */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex flex-1
            items-center

            py-10

            sm:justify-center
            sm:py-14
          "
        >
          <p
            className="
              max-w-[19rem]

              font-display
              text-[clamp(2rem,9.2vw,3rem)]
              font-medium
              uppercase
              leading-[0.92]
              tracking-[-0.055em]
              text-foreground

              sm:max-w-[34rem]
              sm:text-center
              sm:text-[clamp(1.8rem,4vw,2.8rem)]
              sm:leading-[0.98]

              md:text-[clamp(1.8rem,2.6vw,2.8rem)]
            "
          >
            I design & build digital
            experiences where{" "}
            <span
              className="
                font-serif
                italic
                normal-case
              "
            >
              design
            </span>{" "}
            meets technology.
          </p>
        </motion.div>

        {/* Bottom info */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.35,
          }}
          className="
            flex items-end
            justify-between

            border-b
            border-foreground/20

            pb-3
          "
        >
          <p
            className="
              font-mono
              text-[0.5rem]
              uppercase
              tracking-[0.14em]
              text-muted-foreground

              sm:text-[0.58rem]
            "
          >
            Selected work
            <span className="hidden sm:inline">
              {" "}
              · 2024—2026
            </span>
          </p>

          <a
            href="#portfolio"
            data-cursor="plain"
            className="
              group
              flex items-center
              gap-1.5

              font-mono
              text-[0.52rem]
              uppercase
              tracking-[0.14em]
              text-foreground

              sm:gap-2
              sm:text-[0.6rem]
            "
          >
            View Work

            <ArrowDownRight
              size={13}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
                group-hover:translate-y-1
              "
            />
          </a>
        </motion.div>
      </div>

      {/* ================================================================ */}
      {/* LEONA                                                            */}
      {/* ================================================================ */}

      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.22,
          ease: [0.22, 1, 0.36, 1],
        }}
        onMouseLeave={() =>
          setActiveLetter(null)
        }
        className="
          relative z-10

          flex
          h-[clamp(6.5rem,29vw,25rem)]
          w-full
          items-end

          overflow-hidden

          px-1

          sm:h-[clamp(9rem,23vw,25rem)]
          sm:px-2
        "
      >
        {letters.map(
          (letter, index) => {
            const isActive =
              activeLetter === index;

            return (
              <div
                key={`${letter}-${index}`}
                onMouseEnter={() =>
                  setActiveLetter(index)
                }
                className="
                  relative
                  flex h-full
                  w-1/5
                  min-w-0
                  items-end
                  justify-center

                  overflow-visible
                "
              >
                {/* ====================================================== */}
                {/* L — Inverted                                           */}
                {/* ====================================================== */}

                {index === 0 && (
                  <div
                    className="
                      relative
                      flex h-full w-full
                      items-end
                      justify-center
                      overflow-hidden
                    "
                  >
                    <motion.div
                      aria-hidden
                      initial={false}
                      animate={{
                        scaleY:
                          isActive
                            ? 1
                            : 0,
                        opacity:
                          isActive
                            ? 1
                            : 0,
                      }}
                      transition={{
                        duration: 0.32,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="
                        absolute inset-0
                        hidden
                        origin-bottom
                        bg-foreground

                        md:block
                      "
                    />

                    <motion.span
                      animate={{
                        color:
                          isActive
                            ? "var(--bg-primary)"
                            : "var(--text-primary)",
                      }}
                      transition={{
                        duration: 0.22,
                      }}
                      className="
                        relative z-10
                        block
                        origin-bottom

                        font-display
                        text-[clamp(6.5rem,28vw,31rem)]
                        font-bold
                        uppercase
                        leading-[0.68]
                        tracking-[-0.1em]

                        sm:text-[clamp(10rem,29vw,31rem)]
                      "
                    >
                      {letter}
                    </motion.span>
                  </div>
                )}

                {/* ====================================================== */}
                {/* E — Outline                                            */}
                {/* ====================================================== */}

                {index === 1 && (
                  <span
                    className={`
                      block
                      origin-bottom

                      font-display
                      text-[clamp(6.5rem,28vw,31rem)]
                      font-bold
                      uppercase
                      leading-[0.68]
                      tracking-[-0.1em]

                      text-foreground

                      transition-all
                      duration-300

                      sm:text-[clamp(10rem,29vw,31rem)]

                      ${
                        isActive
                          ? `
                            md:text-transparent
                            md:[-webkit-text-stroke:2px_var(--text-primary)]
                          `
                          : `
                            md:[-webkit-text-stroke:0px_transparent]
                          `
                      }
                    `}
                  >
                    {letter}
                  </span>
                )}

                {/* ====================================================== */}
                {/* O — Gradient                                           */}
                {/* ====================================================== */}

                {index === 2 && (
                  <span
                    className={`
                      block
                      origin-bottom

                      font-display
                      text-[clamp(6.5rem,28vw,31rem)]
                      font-bold
                      uppercase
                      leading-[0.68]
                      tracking-[-0.1em]

                      text-foreground

                      transition-all
                      duration-500

                      sm:text-[clamp(10rem,29vw,31rem)]

                      ${
                        isActive
                          ? `
                            md:bg-[linear-gradient(135deg,#ff3d00_0%,#ff006e_30%,#8338ec_65%,#00b4d8_100%)]
                            md:bg-clip-text
                            md:text-transparent
                            md:[-webkit-background-clip:text]
                            md:[-webkit-text-fill-color:transparent]
                          `
                          : ""
                      }
                    `}
                  >
                    {letter}
                  </span>
                )}

                {/* ====================================================== */}
                {/* N — Serif italic                                       */}
                {/* ====================================================== */}

                {index === 3 && (
                  <span
                    className={`
                      block
                      origin-bottom

                      text-[clamp(6.5rem,28vw,31rem)]
                      font-bold
                      uppercase
                      leading-[0.68]
                      tracking-[-0.1em]

                      text-foreground

                      transition-all
                      duration-300

                      sm:text-[clamp(10rem,29vw,31rem)]

                      ${
                        isActive
                          ? `
                            md:font-serif
                            md:italic
                          `
                          : `
                            font-display
                            not-italic
                          `
                      }
                    `}
                  >
                    {letter}
                  </span>
                )}

                {/* ====================================================== */}
                {/* A — Ghost                                              */}
                {/* ====================================================== */}

                {index === 4 && (
                  <div
                    className="
                      relative
                      flex h-full w-full
                      items-end
                      justify-center
                    "
                  >
                    <motion.span
                      aria-hidden
                      initial={false}
                      animate={{
                        opacity:
                          isActive
                            ? 0.18
                            : 0,
                        x:
                          isActive
                            ? 14
                            : 0,
                        y:
                          isActive
                            ? -12
                            : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 20,
                      }}
                      className="
                        absolute
                        hidden
                        origin-bottom

                        font-display
                        text-[clamp(10rem,29vw,31rem)]
                        font-bold
                        uppercase
                        leading-[0.68]
                        tracking-[-0.1em]
                        text-foreground

                        md:block
                      "
                    >
                      {letter}
                    </motion.span>

                    <motion.span
                      animate={{
                        x:
                          isActive
                            ? -5
                            : 0,
                        y:
                          isActive
                            ? 3
                            : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 20,
                      }}
                      className="
                        relative z-10
                        block
                        origin-bottom

                        font-display
                        text-[clamp(6.5rem,28vw,31rem)]
                        font-bold
                        uppercase
                        leading-[0.68]
                        tracking-[-0.1em]
                        text-foreground

                        sm:text-[clamp(10rem,29vw,31rem)]
                      "
                    >
                      {letter}
                    </motion.span>
                  </div>
                )}
              </div>
            );
          }
        )}
      </motion.div>
    </section>
  );
}