"use client";

import { useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/projects";
import ProjectModal from "@/components/project/ProjectModal";

export default function Portfolio() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section 
        id="portfolio" 
        className="px-5 py-20 sm:px-6 sm:py-24 lg:py-32"
        style={{
            backgroundColor: "var(--alt-bg)",
            color: "var(--alt-text)",
          }}
        >
      <div className="container">
        <div className="max-w-[52rem]">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-muted-foreground">
            Portfolio
          </p>

          <h2 className="mt-4 text-[clamp(2.8rem,5.2vw,6rem)] font-medium leading-[0.94] tracking-[-0.06em] text-foreground">
            Selected work and
            <span className="font-serif italic"> visual experiments</span>
          </h2>

          <p className="mt-6 max-w-[42rem] text-[0.98rem] leading-8 text-muted-foreground sm:text-[1.04rem]">
            A selection of projects across frontend development, interface
            design, and interactive concepts — built to explore ideas, refine
            craft, and create memorable digital experiences.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 [grid-auto-flow:dense] auto-rows-[220px] sm:auto-rows-[240px] lg:auto-rows-[220px]">
          {projects.map((p, i) => {
            const sizeClass =
              p.size === "tall"
                ? "md:row-span-2"
                : p.size === "wide"
                ? "md:col-span-2"
                : p.size === "big"
                ? "md:col-span-2 md:row-span-2"
                : "";

            return (
              <div
                key={p.slug}
                role="button"
                tabIndex={0}
                onClick={() => setOpenIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(i);
                  }
                }}
                className={[
                  "group relative overflow-hidden rounded-[1.75rem] border border-border bg-card/40",
                  "cursor-pointer transition duration-300",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]",
                  sizeClass,
                ].join(" ")}
              >
                <div className="absolute inset-0">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                  <div className="max-w-[88%]">
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-white/70">
                      {p.meta?.year ?? "Project"}
                    </p>

                    <h3 className="mt-2 text-[1.35rem] font-medium leading-[0.98] tracking-[-0.03em] text-white sm:text-[1.6rem]">
                      {p.title}
                    </h3>

                    <p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-white/75 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
                      {p.short}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <ProjectModal
          projects={projects}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      </div>
    </section>
  );
}