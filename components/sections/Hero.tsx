"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScrollVelocity from "@/components/ui/shadcn-io/scroll-velocity";

export default function Hero() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;

      document.documentElement.style.setProperty(
        "--mx",
        `${(e.clientX / w) * 100}%`
      );
      document.documentElement.style.setProperty(
        "--my",
        `${(e.clientY / h) * 100}%`
      );
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16 sm:px-6 sm:py-20">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(240px 240px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.08), transparent 60%)",
        }}
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.3, delay: 0.15, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.06), transparent 28%)",
        }}
      />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-6 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground sm:text-xs"
        >
          ⎯ Creative Developer · UI / UX · Frontend
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 42, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.95,
            delay: 0.38,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-screen max-w-none"
        >
          <ScrollVelocity
            texts={[
              "Leona Josephine Redmann Leona Josephine Redmann Leona Josephine Redmann Leona Josephine Redmann",
              "Leona Josephine Redmann Leona Josephine Redmann Leona Josephine Redmann Leona Josephine Redmann Leona Josephine Redmann",
            ]}
            velocity={90}
            className="font-sans text-[clamp(3.6rem,12vw,13rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-foreground xl:text-[clamp(7rem,10vw,15rem)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-12"
        >
          <a href="#portfolio">
            <Button variant="primary" size="lg">
              View Projects
            </Button>
          </a>

          <a href="#contact">
            <Button variant="secondary" size="lg">
              Get in Touch
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}