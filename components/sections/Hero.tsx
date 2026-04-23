"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import ScrollVelocity from "@/components/ui/shadcn-io/scroll-velocity";

export default function Hero() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      document.documentElement.style.setProperty("--mx", `${(e.clientX / w) * 100}%`);
      document.documentElement.style.setProperty("--my", `${(e.clientY / h) * 100}%`);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16 sm:px-6 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(240px 240px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.08), transparent 60%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.06), transparent 28%)",
        }}
      />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <p className="mb-6 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground sm:text-xs">
          Creative Developer · UI / UX · Frontend
        </p>

        <div className="w-screen max-w-none ">
          <ScrollVelocity
            texts={["Leona Josephine Redmann Leona Josephine Redmann Leona Josephine Redmann Leona Josephine Redmann", "Leona Josephine Redmann Leona Josephine Redmann Leona Josephine Redmann Leona Josephine Redmann Leona Josephine Redmann"]}
            velocity={90}
            className="font-sans text-[clamp(3.6rem,12vw,13rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-foreground xl:text-[clamp(7rem,10vw,15rem)]"
          />
        </div>

    

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-12">
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
        </div>
      </div>
    </section>
  );
}