"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const statements = [
  "Building digital experiences at the intersection of design and technology.",
  "Turning ideas into thoughtful digital experiences.",
  "Where visual thinking meets functional code.",
];

const TYPE_SPEED = 38;
const HOLD_TIME = 2200;

export default function MartiniHero() {
  const [statementIndex, setStatementIndex] =
    useState(0);

  const [displayedText, setDisplayedText] =
    useState("");

  const [isHolding, setIsHolding] =
    useState(false);

  useEffect(() => {
    const currentStatement =
      statements[statementIndex];

    let timeout: ReturnType<
      typeof setTimeout
    >;

    /*
     * Statement has been completely typed.
     */
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
            (current + 1) %
            statements.length
        );
      }, HOLD_TIME);

      return () =>
        clearTimeout(timeout);
    }

    /*
     * Type the current statement.
     */
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

    return () =>
      clearTimeout(timeout);
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
      {/* DECORATIVE RULES                                                 */}
      {/* ================================================================ */}

      <div
        aria-hidden
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
            bg-foreground/10
          "
        />

        <div
          className="
            absolute
            bottom-0 right-[18%] top-0
            w-px
            bg-foreground/10
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
            text-[0.55rem]
            uppercase
            leading-relaxed
            tracking-[0.16em]
            text-muted-foreground
          "
        >
          <p>
            Independent Portfolio
          </p>

          <p className="hidden sm:block">
            Design / Development
          </p>
        </div>

        <div
          className="
            text-right
            font-mono
            text-[0.55rem]
            uppercase
            leading-relaxed
            tracking-[0.16em]
            text-muted-foreground
          "
        >
          <p>Hamburg · DE</p>
          <p>MMXXVI</p>
        </div>
      </motion.div>

      {/* ================================================================ */}
      {/* EDITORIAL NUMBER                                                 */}
      {/* ================================================================ */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 0.6,
        }}
        className="
          absolute
          right-5
          top-[29%]
          z-10

          hidden

          font-mono
          text-[0.55rem]
          uppercase
          tracking-[0.18em]
          text-muted-foreground

          md:block
          md:right-8
        "
      >
        No. 03
      </motion.div>

      {/* ================================================================ */}
      {/* MAIN COMPOSITION                                                 */}
      {/* ================================================================ */}

      <div
        className="
          relative z-10
          flex min-h-[100svh]
          flex-col
          justify-center

          px-5
          pb-24
          pt-40

          sm:px-6

          md:px-8
          md:pb-20
          md:pt-44
        "
      >
        {/* Small intro */}
        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-4
            ml-[3%]

            font-mono
            text-[0.55rem]
            uppercase
            tracking-[0.18em]
            text-muted-foreground

            sm:mb-5

            md:ml-[12%]
          "
        >
          Web & App Developer

          <span className="mx-2 opacity-40">
            /
          </span>

          UI · UX
        </motion.div>

        {/* LEONA */}
        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative z-10
            ml-[-0.04em]
          "
        >
          <h1
            className="
              font-serif
              text-[clamp(5.5rem,19vw,18rem)]
              font-normal
              leading-[0.7]
              tracking-[-0.075em]
              text-foreground
            "
          >
            Leona
          </h1>
        </motion.div>

        {/* ============================================================ */}
        {/* ROTATING TYPEWRITER STATEMENT                               */}
        {/* ============================================================ */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative z-20

            my-5
            ml-auto
            mr-[4%]

            min-h-[4.8rem]
            w-[68%]
            max-w-[19rem]

            sm:my-4
            sm:min-h-[5.5rem]
            sm:w-[45%]
            sm:max-w-[23rem]

            md:mr-[15%]
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
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              <p
                className="
                  font-display
                  text-[0.85rem]
                  font-medium
                  uppercase
                  leading-[1.15]
                  tracking-[-0.025em]
                  text-foreground

                  sm:text-base
                  md:text-lg
                "
              >
                {displayedText}

                <motion.span
                  animate={{
                    opacity: [
                      1,
                      1,
                      0,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    times: [
                      0,
                      0.45,
                      0.5,
                      1,
                    ],
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

        {/* REDMANN */}
        <motion.div
          initial={{
            opacity: 0,
            x: 50,
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
            relative z-10

            ml-auto
            mr-[-0.035em]
          "
        >
          <h2
            className="
              font-serif
              text-[clamp(4.6rem,17vw,16rem)]
              font-normal
              italic
              leading-[0.7]
              tracking-[-0.075em]
              text-foreground
            "
          >
            Redmann
          </h2>
        </motion.div>

        {/* ============================================================ */}
        {/* FOOTER LINE                                                  */}
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
            delay: 0.65,
          }}
          className="
            mt-10
            flex
            items-end
            justify-between

            border-t
            border-foreground/20
            pt-3

            md:mt-12
          "
        >
          <div
            className="
              font-mono
              text-[0.52rem]
              uppercase
              leading-relaxed
              tracking-[0.16em]
              text-muted-foreground

              sm:text-[0.56rem]
            "
          >
            <p>Creative Tech</p>

            <p className="hidden sm:block">
              Selected Work · 24—26
            </p>
          </div>

          <a
            href="#portfolio"
            data-cursor="martini-explore"
            className="
              group
              flex items-center
              gap-2

              font-mono
              text-[0.55rem]
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

      {/* ================================================================ */}
      {/* SIDE LABEL                                                       */}
      {/* ================================================================ */}

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.8,
        }}
        className="
          absolute
          bottom-8
          left-5

          hidden

          origin-bottom-left
          -rotate-90

          font-mono
          text-[0.5rem]
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