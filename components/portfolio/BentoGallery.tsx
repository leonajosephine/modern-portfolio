
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
  onOpen: (slug: string) => void;
};

const gradientMap = {
  sunset:
    "bg-[radial-gradient(circle_at_25%_20%,rgba(167,139,250,0.95),transparent_32%),radial-gradient(circle_at_78%_72%,rgba(251,146,60,0.95),transparent_34%),linear-gradient(135deg,#d98a5b,#55231f)]",
  aurora:
    "bg-[radial-gradient(circle_at_18%_18%,rgba(196,181,253,0.95),transparent_34%),radial-gradient(circle_at_78%_65%,rgba(251,113,133,0.75),transparent_36%),radial-gradient(circle_at_60%_90%,rgba(251,146,60,0.9),transparent_35%),linear-gradient(135deg,#9177ff,#e19a66)]",
  forest:
    "bg-[radial-gradient(circle_at_78%_70%,rgba(234,179,8,0.65),transparent_30%),radial-gradient(circle_at_22%_20%,rgba(186,230,253,0.9),transparent_36%),linear-gradient(135deg,#bcd6df,#103817)]",
  ice:
    "bg-[radial-gradient(circle_at_20%_20%,rgba(186,230,253,0.95),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(168,85,247,0.55),transparent_34%),linear-gradient(135deg,#d7f0f8,#25213d)]",
} as const;

function getProjectSizeClass(
  size?: "normal" | "wide" | "tall" | "big"
) {
  switch (size) {
    case "wide":
      return "col-span-2";
    case "tall":
      return "row-span-2";
    case "big":
      return "col-span-2 row-span-2";
    default:
      return "";
  }
}

export default function BentoGallery({ projects, onOpen }: Props) {
  return (
    <motion.div
      layout
      className="
        mt-10 grid grid-cols-2
        auto-rows-[155px] gap-2.5
        [grid-auto-flow:dense]
        sm:mt-14 sm:auto-rows-[220px] sm:gap-4
        md:auto-rows-[240px]
        lg:grid-cols-3 lg:auto-rows-[220px] lg:gap-5
      "
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => {
          const sizeClass = getProjectSizeClass(project.size);

          const gradientClass = project.gradient
            ? gradientMap[project.gradient]
            : "";

          const isLargeCard =
            project.size === "wide" || project.size === "big";

          return (
            <motion.button
              layout
              key={project.slug}
              type="button"
              onClick={() => onOpen(project.slug)}
              initial={{
                opacity: 0,
                y: 16,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 12,
                scale: 0.98,
              }}
              transition={{
                duration: 0.3,
                delay: Math.min(index * 0.025, 0.15),
              }}
              className={[
                "group relative overflow-hidden",
                "rounded-[1.15rem] border border-border",
                "bg-card/40 text-left",
                "transition duration-300",
                "sm:rounded-[1.75rem]",
                "focus:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-ring",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-background",
                "hover:-translate-y-1",
                "hover:border-white/15",
                "hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]",
                sizeClass,
              ].join(" ")}
            >
              {project.gradient ? (
                <div
                  className={`absolute inset-0 ${gradientClass}`}
                />
              ) : (
                <div className="absolute inset-0">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    quality={78}
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="
                      object-cover
                      transition-transform duration-500
                      group-hover:scale-[1.04]
                    "
                    sizes="
                      (max-width: 639px) 100vw,
                      (max-width: 1023px) 100vw,
                      33vw
                    "
                  />
                </div>
              )}

              {project.gradient ? (
                <>
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6),transparent_58%)]" />
                  <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:28px_28px]" />
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/20 to-transparent opacity-40 sm:h-24" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/22 to-transparent" />
              )}

              <div
                className={[
                  "absolute inset-x-0 bottom-0 z-10",
                  isLargeCard ? "p-4 sm:p-6" : "p-3.5 sm:p-6",
                ].join(" ")}
              >
                <div
                  className={
                    isLargeCard
                      ? "max-w-[92%] sm:max-w-[88%]"
                      : "max-w-full sm:max-w-[88%]"
                  }
                >
                  <p
                    className="
                      truncate font-mono
                      text-[0.5rem] uppercase
                      tracking-[0.13em] text-white/70
                      sm:text-[0.66rem]
                      sm:tracking-[0.24em]
                    "
                  >
                    {project.category} ·{" "}
                    {project.meta?.year ?? "Project"}
                  </p>

                  <h3
                    className={[
                      "mt-1.5 line-clamp-2",
                      "font-medium leading-[1.02]",
                      "tracking-[-0.03em] text-white",
                      "sm:mt-2 sm:text-[1.6rem]",
                      "sm:leading-[0.98]",
                      isLargeCard
                        ? "text-[1.15rem]"
                        : "text-[0.95rem]",
                    ].join(" ")}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="
                      mt-3 hidden max-h-0 overflow-hidden
                      text-sm leading-6 text-white/75
                      opacity-0
                      transition-all duration-300
                      group-hover:max-h-24
                      group-hover:opacity-100
                      sm:block
                    "
                  >
                    {project.short}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
