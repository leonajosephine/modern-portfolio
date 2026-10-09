
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const statements = [
  "I build thoughtful digital experiences.",
  "I design interfaces with personality.",
  "I turn creative ideas into code.",
];

const TYPE_SPEED = 48;
const DELETE_SPEED = 25;
const HOLD_TIME = 2200;

const ease = [0.22, 1, 0.36, 1] as const;

function Typewriter() {
  const [statementIndex, setStatementIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const statement = statements[statementIndex];

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && characterIndex === statement.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, HOLD_TIME);
    } else if (isDeleting && characterIndex === 0) {
      timeout = setTimeout(() => {
        setStatementIndex((current) => (current + 1) % statements.length);
        setIsDeleting(false);
      }, 350);
    } else {
      timeout = setTimeout(
        () => {
          setCharacterIndex((current) =>
            isDeleting ? current - 1 : current + 1
          );
        },
        isDeleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [statementIndex, characterIndex, isDeleting]);

  const displayedText = statements[statementIndex].slice(
    0,
    characterIndex
  );

  return (
    <div className="min-h-[3.5rem] sm:min-h-[4rem]">
      <p
        className="
          max-w-[480px]
          font-sans
          text-[clamp(1.15rem,2vw,1.8rem)]
          font-medium
          leading-[1.3]
          tracking-[-0.035em]
          text-[#790719]
        "
      >
        {displayedText}

        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            times: [0, 0.45, 0.5, 1],
          }}
          className="
            ml-1
            inline-block
            h-[0.85em]
            w-[2px]
            translate-y-[0.08em]
            bg-[#790719]
          "
        />
      </p>
    </div>
  );
}

export default function MartiniHero() {
  return (
    <section
      id="top"
      data-cursor="martini"
      className="
        relative
        flex
        min-h-[100svh]
        flex-col
        overflow-hidden
        bg-[#F3E7BF]
        text-[#790719]
      "
    >
      {/* Subtle paper-like color variation */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,0.17),transparent_70%)]
        "
      />

      {/* ================================================================ */}
      {/* TOP META                                                         */}
      {/* ================================================================ */}

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="
          relative
          z-20
          mx-auto
          flex
          w-full
          max-w-[1600px]
          items-start
          justify-between
          gap-6
          px-5
          pt-28
          sm:px-6
          md:px-8
          md:pt-32
        "
      >
        <div className="flex flex-col gap-1">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em]">
            Leona Redmann
          </span>

          <span className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-[#790719]/65">
            Developer & Designer
          </span>
        </div>

        <span className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-[#790719]/65">
          Portfolio / 2026
        </span>
      </motion.div>

      {/* ================================================================ */}
      {/* MAIN MONOGRAM                                                   */}
      {/* ================================================================ */}

      <div
        className="
          relative
          z-10
          flex
          flex-1
          items-center
          justify-center
          px-4
          py-10
          sm:px-6
          md:px-8
        "
      >
        <div
          className="
            relative
            mx-auto
            flex
            w-full
            max-w-[1600px]
            items-center
            justify-center
          "
        >
          {/* Giant typographic centerpiece */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1.3,
              delay: 0.15,
              ease,
            }}
            className="
              relative
              select-none
              font-serif
              text-[clamp(15rem,45vw,48rem)]
              leading-[0.7]
              tracking-[-0.13em]
              text-[#790719]
            "
            aria-hidden="true"
          >
            lr<span className="tracking-normal">.</span>
          </motion.div>

          {/* Small vertical editorial label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.85,
              duration: 0.8,
            }}
            className="
              absolute
              right-0
              top-1/2
              hidden
              -translate-y-1/2
              lg:block
            "
          >
            <p
              className="
                origin-center
                rotate-90
                font-mono
                text-[0.5rem]
                uppercase
                tracking-[0.22em]
                text-[#790719]/55
              "
            >
              Creative portfolio
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* BOTTOM EDITORIAL INFORMATION                                     */}
      {/* ================================================================ */}

      <div
        className="
          relative
          z-20
          mx-auto
          w-full
          max-w-[1600px]
          px-5
          pb-7
          sm:px-6
          md:px-8
          md:pb-9
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.55,
            ease,
          }}
          className="
            grid
            gap-9
            border-t
            border-[#790719]/35
            pt-5
            sm:grid-cols-12
            sm:gap-6
            md:pt-6
          "
        >
          {/* Description */}
          <div className="sm:col-span-4 lg:col-span-3">
            <p
              className="
                max-w-[280px]
                text-[0.9rem]
                leading-6
                text-[#790719]/80
              "
            >
              Designing and developing websites,
              apps and digital experiences with
              personality.
            </p>
          </div>

          {/* Typewriter */}
          <div className="sm:col-span-5 lg:col-span-6">
            <p
              className="
                mb-3
                font-mono
                text-[0.48rem]
                uppercase
                tracking-[0.2em]
                text-[#790719]/55
              "
            >
              A little about what I do
            </p>

            <Typewriter />
          </div>

          {/* CTA */}
          <div
            className="
              flex
              items-start
              sm:col-span-3
              sm:justify-end
            "
          >
            <a
              href="#portfolio"
              data-cursor="martini-explore"
              className="
                group
                inline-flex
                items-center
                gap-3
                border-b
                border-[#790719]
                pb-2
                text-[0.72rem]
                font-semibold
                uppercase
                tracking-[0.1em]
                transition-opacity
                hover:opacity-60
              "
            >
              Explore Work

              <ArrowUpRight
                size={17}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </div>
        </motion.div>

        {/* Footer meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.9,
            duration: 0.7,
          }}
          className="
            mt-10
            flex
            items-center
            justify-between
            gap-5
            font-mono
            text-[0.48rem]
            uppercase
            tracking-[0.16em]
            text-[#790719]/55
            sm:mt-12
          "
        >
          <span>Hamburg · Germany</span>

          <a
            href="#about"
            className="
              group
              flex
              items-center
              gap-2
              transition-colors
              hover:text-[#790719]
            "
          >
            Scroll to explore

            <ArrowDownRight
              size={13}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:translate-y-0.5
              "
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
