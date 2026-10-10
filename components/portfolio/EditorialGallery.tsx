
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
  onOpen: (slug: string) => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function EditorialGallery({
  projects,
  onOpen,
}: Props) {
  return (
    <div className="relative mt-10 sm:mt-14">
      <motion.div
        layout
        className="
        -mx-5 flex snap-x snap-mandatory gap-3
        overflow-x-auto overscroll-x-contain
        px-[14vw] pb-5
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
        sm:mx-0 sm:grid sm:grid-cols-2
        sm:gap-x-6 sm:gap-y-14
        sm:overflow-visible sm:px-0 sm:pb-0
        lg:grid-cols-3 lg:gap-x-6 lg:gap-y-14
        min-[1440px]:grid-cols-2
        min-[1440px]:gap-x-8
        min-[1440px]:gap-y-20
        "
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <motion.button
              layout
              key={project.slug}
              type="button"
              onClick={() => onOpen(project.slug)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{
                duration: 0.45,
                ease,
                delay: Math.min(index * 0.035, 0.16),
              }}
              className="
                group w-[72vw] max-w-[440px]
                min-w-0 shrink-0 snap-center text-left
                sm:w-auto sm:max-w-none sm:shrink
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[var(--accent)]
              "
            >
              <div
                className="
                  relative aspect-[4/3] overflow-hidden
                  rounded-[0.3rem] bg-[var(--bg-secondary)]
                  sm:aspect-[5/4]
                "
              >
                {project.gradient ? (
                  <div className="absolute inset-0 bg-[var(--bg-tertiary)]" />
                ) : (
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    quality={80}
                    sizes="
                      (max-width: 639px) 72vw,
                      (max-width: 1023px) 50vw,
                      44vw
                    "
                    className="
                      object-cover
                      transition-transform duration-700 ease-out
                      group-hover:scale-[1.035]
                      motion-reduce:transition-none
                    "
                  />
                )}

                <span
                  className="
                    absolute bottom-4 right-4
                    flex size-10 translate-y-2
                    items-center justify-center
                    rounded-full bg-[var(--bg-primary)]
                    text-[var(--accent)] opacity-0
                    transition-all duration-300
                    group-hover:translate-y-0
                    group-hover:opacity-100
                    group-focus-visible:translate-y-0
                    group-focus-visible:opacity-100
                  "
                >
                  <ArrowUpRight size={19} strokeWidth={1.5} />
                </span>
              </div>

              <div className="mt-4 flex items-start justify-between gap-4 sm:mt-5">
                <div className="min-w-0">
                  <p
                    className="
                      mb-2 font-mono text-[0.6rem]
                      uppercase tracking-[0.13em]
                      text-[var(--text-secondary)]
                    "
                  >
                    {project.category}
                    <span className="mx-1 opacity-50">·</span>
                    {project.meta?.year ?? "Project"}
                  </p>

                  <h3
                    className="
                    text-[1.4rem]
                    font-medium leading-[1.12]
                    tracking-[-0.045em]
                    text-[var(--text-primary)]
                    transition-colors duration-300
                    group-hover:text-[var(--accent)]
                    sm:text-[clamp(1.4rem,2.3vw,2.15rem)]
                    lg:text-[1.4rem]
                    min-[1440px]:text-[clamp(1.8rem,2.3vw,2.15rem)]
                    "
                  >
                    {project.title}
                  </h3>

                  <p
                    className="
                      mt-2 line-clamp-2 max-w-[38rem]
                      text-[0.82rem] leading-6
                      text-[var(--text-secondary)]
                      sm:text-sm
                    "
                  >
                    {project.short}
                  </p>
                </div>

                <ArrowUpRight
                  size={21}
                  strokeWidth={1.5}
                  className="
                    mt-1 shrink-0 text-[var(--accent)]
                    transition-transform duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <p
        className="
          mt-2 text-center font-mono
          text-[0.58rem] uppercase tracking-[0.16em]
          text-[var(--text-secondary)]
          sm:hidden
        "
      >
        Swipe to explore
      </p>
    </div>
  );
}
