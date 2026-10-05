"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const statements = [
  "Building digital experiences at the intersection of design and technology.",
  "Turning ideas into thoughtful digital experiences.",
  "Where visual thinking meets functional code.",
];

const TYPE_SPEED = 38;
const HOLD_TIME = 2200;

export default function MartiniHero() {
  const [statementIndex, setStatementIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    const currentStatement = statements[statementIndex];

    let timeout: ReturnType<typeof setTimeout>;

    if (
      displayedText === currentStatement &&
      !isHolding
    ) {
      setIsHolding(true);

      timeout = setTimeout(() => {
        setDisplayedText("");
        setIsHolding(false);

        setStatementIndex(
          (current) =>
            (current + 1) % statements.length
        );
      }, HOLD_TIME);

      return () => clearTimeout(timeout);
    }

    if (!isHolding) {
      timeout = setTimeout(() => {
        setDisplayedText(
          currentStatement.slice(
            0,
            displayedText.length + 1
          )
        );
      }, TYPE_SPEED);
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isHolding,
    statementIndex,
  ]);

  return (
    <section
      id="top"
      data-cursor="martini"
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-background
        text-foreground
      "
    >
      {/* ================================================================ */}
      {/* EDITORIAL GRID                                                   */}
      {/* ================================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          hidden
          md:block
        "
      >
        <div
          className="
            absolute
            bottom-0 left-[18%] top-0
            w-px
            bg-foreground/[0.07]
          "
        />

        <div
          className="
            absolute
            bottom-0 right-[18%] top-0
            w-px
            bg-foreground/[0.07]
          "
        />
      </div>

      {/* ================================================================ */}
      {/* TOP META                                                         */}
      {/* ================================================================ */}

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
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          left-5 right-5
          top-28
          z-20

          flex
          items-start
          justify-between

          border-t
          border-foreground/20
          pt-3

          sm:left-6
          sm:right-6

          md:left-8
          md:right-8
          md:top-32
        "
      >
        <div
          className="
            font-mono
            text-[0.52rem]
            uppercase
            leading-relaxed
            tracking-[0.18em]
            text-muted-foreground
          "
        >
          <p>Leona Redmann</p>

          <p className="hidden sm:block">
            Web & App Developer · UI / UX
          </p>
        </div>

        <div
          className="
            text-right
            font-mono
            text-[0.52rem]
            uppercase
            leading-relaxed
            tracking-[0.18em]
            text-muted-foreground
          "
        >
          <p>Hamburg · DE</p>
          <p>Portfolio · 2026</p>
        </div>
      </motion.div>

      {/* ================================================================ */}
      {/* MAIN                                                             */}
      {/* ================================================================ */}

      <div
        className="
          relative z-10

          flex
          min-h-[100svh]
          flex-col
          justify-center

          px-5
          pb-24
          pt-44

          sm:px-6

          md:px-8
          md:pb-20
          md:pt-48
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1500px]
          "
        >
          {/* Small identity */}

          <motion.div
            initial={{
              opacity: 0,
              x: -16,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mb-6
              flex
              items-center
              gap-3

              sm:mb-8

              md:ml-[10%]
            "
          >
            <span
              className="
                h-px
                w-8
                bg-foreground/40
              "
            />

            <p
              className="
                font-mono
                text-[0.52rem]
                uppercase
                tracking-[0.18em]
                text-muted-foreground
              "
            >
              Design · Development · Creative Tech
            </p>
          </motion.div>

          {/* DIGITAL */}

          <motion.div
            initial={{
              opacity: 0,
              x: -45,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-10
            "
          >
            <h1
              className="
                font-display
                text-[clamp(4.7rem,15.2vw,14.5rem)]
                font-medium
                uppercase
                leading-[0.72]
                tracking-[-0.075em]
                text-foreground
              "
            >
              Digital
            </h1>
          </motion.div>

          {/* Middle row */}

          <div
            className="
              relative
              z-20

              my-5

              grid
              gap-6

              sm:my-4
              sm:grid-cols-2
              sm:items-center

              md:grid-cols-12
            "
          >
            {/* Typewriter */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                min-h-[4.8rem]
                max-w-[22rem]

                sm:min-h-[5.5rem]

                md:col-span-4
                md:col-start-2
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={statementIndex}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p
                    className="
                      font-display
                      text-[0.8rem]
                      font-medium
                      uppercase
                      leading-[1.2]
                      tracking-[-0.015em]
                      text-foreground

                      sm:text-[0.9rem]
                      md:text-base
                    "
                  >
                    {displayedText}

                    <motion.span
                      animate={{
                        opacity: [1, 1, 0, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        times: [0, 0.45, 0.5, 1],
                      }}
                      className="
                        ml-[0.15em]
                        inline-block
                        h-[0.8em]
                        w-[0.08em]
                        bg-foreground
                        align-baseline
                      "
                    />
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>


          </div>

          {/* EXPERIENCES */}

          <motion.div
            initial={{
              opacity: 0,
              x: 45,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-10

              flex
              justify-end
            "
          >
            <h2
              className="
                font-display
                text-[clamp(3.9rem,13.2vw,12.6rem)]
                font-medium
                uppercase
                leading-[0.72]
                tracking-[-0.075em]
                text-foreground
              "
            >
              Experiences
            </h2>
          </motion.div>

          {/* ============================================================ */}
          {/* FOOTER                                                       */}
          {/* ============================================================ */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.7,
            }}
            className="
              mt-12

              flex
              items-end
              justify-between
              gap-8

              border-t
              border-foreground/20
              pt-3

              md:mt-14
            "
          >
            <div
              className="
                font-mono
                text-[0.5rem]
                uppercase
                leading-relaxed
                tracking-[0.16em]
                text-muted-foreground

                sm:text-[0.54rem]
              "
            >

            </div>

            <a
              href="#portfolio"
              data-cursor="martini-explore"
              className="
                group

                flex
                items-center
                gap-2

                font-mono
                text-[0.53rem]
                uppercase
                tracking-[0.16em]
                text-foreground
              "
            >
              Explore Work

              <ArrowDownRight
                size={14}
                strokeWidth={1.4}
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
      </div>

      {/* Side edition label */}

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.9,
        }}
        className="
          absolute
          bottom-8
          left-5

          hidden

          origin-bottom-left
          -rotate-90

          font-mono
          text-[0.48rem]
          uppercase
          tracking-[0.2em]
          text-muted-foreground

          lg:block
        "
      >
        Portfolio / Edition 03
      </motion.p>
    </section>
  );
}