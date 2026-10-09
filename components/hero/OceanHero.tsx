
"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

import FluidBackground from "@/components/hero/fluid/FluidBackground";

const ease = [0.22, 1, 0.36, 1] as const;

export default function OceanHero() {
  return (
    <section
      id="top"
      data-cursor="plain"
      className="relative min-h-[100svh] overflow-hidden bg-background text-[#18164f]"
    >
      {/* Liquid background */}
      <div className="absolute inset-0">
        <FluidBackground />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(24,22,79,0.035)_100%)]"
        />
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-[100svh] w-full flex-col px-5 pb-6 pt-28 sm:px-6 sm:pb-8 lg:px-8 lg:pt-32">
        {/* Top meta */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between"
        >
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[#18164f]/55">
            Portfolio · 2026
          </p>

          <p className="hidden font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[#18164f]/55 sm:block">
            Hamburg · Germany
          </p>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-1 items-center justify-center py-14">
          <div className="mx-auto w-full max-w-[90rem] text-center">
            {/* Identity */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08,
                duration: 0.7,
              }}
              className="mb-7 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#18164f]/70 sm:text-xs"
            >
              Leona Redmann
              <span className="mx-2 opacity-40">/</span>
              Developer & Designer
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.12,
                duration: 0.9,
                ease,
              }}
              className="mx-auto max-w-[13ch] text-[clamp(3.3rem,9vw,9rem)] font-medium leading-[0.9] tracking-[-0.075em] text-[#18164f]"
            >
              Design meets
              <br className="hidden sm:block" />
              {" "}technology.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.7,
              }}
              className="mx-auto mt-8 max-w-[35rem] text-sm leading-7 text-[#18164f]/70 sm:text-base sm:leading-8"
            >
              I&apos;m Leona, a developer and designer
              based in Hamburg. I love to create thoughtful
              websites, apps and digital experiences.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 0.7,
              }}
              className="pointer-events-auto mt-9 flex justify-center"
            >
              <a
                href="#portfolio"
                className="group inline-flex items-center gap-3 rounded-[var(--radius-button)] bg-[#29258f] px-6 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[#f7f4ff] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#18164f] hover:shadow-[0_12px_32px_rgba(41,37,143,0.18)]"
              >
                Explore Work

                <ArrowDownRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.7,
          }}
          className="flex items-end justify-between font-mono text-[0.52rem] uppercase tracking-[0.16em] text-[#18164f]/50"
        >
          <span>Frontend · UI/UX · Creative</span>

          <a
            href="#about"
            className="pointer-events-auto hidden items-center gap-2 transition-opacity duration-300 hover:opacity-60 sm:flex"
          >
            Scroll to explore
            <ArrowDownRight size={13} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
