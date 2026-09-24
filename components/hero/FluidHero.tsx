"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

import FluidBackground from "@/components/hero/fluid/FluidBackground";

export default function FluidHero() {
  return (
    <section
      id="top"
      data-cursor="plain"
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-background
        text-white
      "
    >
      {/* ================================================================ */}
      {/* GPU FLUID DEBUG                                                  */}
      {/* ================================================================ */}

      <div className="absolute inset-0">
        <FluidBackground />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(20,14,55,0.12)_100%)]
          "
        />
      </div>

      {/* ================================================================ */}
      {/* CONTENT                                                          */}
      {/* ================================================================ */}

      <div
        className="
          pointer-events-none
          relative
          z-10

          flex
          min-h-[100svh]
          w-full
          flex-col

          px-5
          pb-6
          pt-28

          sm:px-6
          sm:pb-8

          lg:px-8
          lg:pt-32
        "
      >
        {/* TOP */}

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
            duration: 0.7,
          }}
          className="
            flex
            items-center
            justify-between

            border-t
            border-white/25
            pt-3
          "
        >
          <p
            className="
              font-mono
              text-[0.55rem]
              uppercase
              tracking-[0.18em]
              text-white/60
            "
          >
            Portfolio · 2026
          </p>

          <p
            className="
              font-mono
              text-[0.55rem]
              uppercase
              tracking-[0.18em]
              text-white/60
            "
          >
            Fluid Debug · WebGL2
          </p>
        </motion.div>

        {/* CENTER */}

        <div
          className="
            flex
            flex-1
            items-center
            justify-center

            py-14
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[90rem]
              text-center
            "
          >
            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.08,
                duration: 0.7,
              }}
              className="
                mb-6

                font-mono
                text-[0.56rem]
                uppercase
                tracking-[0.22em]
                text-white/60
              "
            >
              Move your cursor
            </motion.p>

            <motion.h1
              initial={{
                opacity: 0,
                y: 28,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.12,
                duration: 0.9,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                mx-auto
                max-w-[11ch]

                font-display
                text-[clamp(3.65rem,10vw,10rem)]
                font-medium
                leading-[0.86]
                tracking-[-0.075em]
              "
            >
              Design meets

              <span
                className="
                  block
                  font-serif
                  font-normal
                  italic
                "
              >
                technology.
              </span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
                duration: 0.7,
              }}
              className="
                mx-auto
                mt-8
                max-w-[32rem]

                text-sm
                leading-7
                text-white/65

                sm:text-base
              "
            >
              This is intentionally the
              raw velocity field. Move
              quickly through the background
              and look for cyan and magenta
              trails.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.45,
              }}
              className="
                pointer-events-auto
                mt-8
                flex
                justify-center
              "
            >
              <a
                href="#portfolio"
                className="
                  inline-flex
                  items-center
                  gap-3

                  rounded-full

                  bg-[#d8ff72]

                  px-6
                  py-3.5

                  text-[0.72rem]
                  font-medium
                  uppercase
                  tracking-[0.1em]
                  text-[#18164f]
                "
              >
                Explore Work

                <ArrowDownRight
                  size={16}
                  strokeWidth={1.5}
                />
              </a>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM */}

        <div
          className="
            flex
            items-center
            justify-between

            border-t
            border-white/25
            pt-3

            font-mono
            text-[0.52rem]
            uppercase
            tracking-[0.16em]
            text-white/55
          "
        >
          <span>
            GPU Velocity Field
          </span>

          <span>
            Debug Mode · 01
          </span>
        </div>
      </div>
    </section>
  );
}