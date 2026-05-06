"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/projects";
import ProjectModal from "@/components/project/ProjectModal";

type Filter = "all" | "coding" | "design" | "3d";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "coding", label: "Coding Projects" },
  { id: "design", label: "Design" },
  { id: "3d", label: "3D" },
];

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

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const openIndex =
    openSlug === null
      ? null
      : projects.findIndex((project) => project.slug === openSlug);

  return (
    <motion.section
      id="portfolio"
      className="px-5 py-20 sm:px-6 sm:py-24 lg:py-32"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6 }}
      style={{
          backgroundColor: "var(--alt-bg)",
          color: "var(--alt-text)",
        }}
    >
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[52rem]">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-[var(--alt-text-muted)]">
              Portfolio
            </p>

            <h2 className="mt-4 text-[clamp(2.8rem,5.2vw,6rem)] font-medium leading-[0.94] tracking-[-0.06em] text-[var(--alt-text)]">
              Selected work and
              <span className="font-serif italic"> visual experiments</span>
            </h2>

            <p className="mt-6 max-w-[42rem] text-[0.98rem] leading-8 text-[var(--alt-text-muted)] sm:text-[1.04rem]">
              A selection of projects across frontend development, interface
              design, and interactive concepts — built to explore ideas, refine
              craft, and create memorable digital experiences.
            </p>

            {/* Modernized Filter Switcher */}
            <div className="mt-6 flex items-center justify-start">
              <div className="flex rounded-full border border-border bg-card/50 p-1">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.id;

                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveFilter(filter.id)}
                      className={[
                        "px-5 py-2 text-sm font-medium transition-all rounded-full",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground",
                      ].join(" ")}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="mt-14 grid grid-cols-1 gap-4 [grid-auto-flow:dense] auto-rows-[220px] sm:auto-rows-[240px] md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[220px] lg:gap-5"
        >
          {filteredProjects.map((project, index) => {
            const sizeClass =
              project.size === "tall"
                ? "md:row-span-2"
                : project.size === "wide"
                  ? "md:col-span-2"
                  : project.size === "big"
                    ? "md:col-span-2 md:row-span-2"
                    : "";

            const gradientClass = project.gradient
              ? gradientMap[project.gradient]
              : "";

            return (
              <motion.div
                layout
                key={project.slug}
                role="button"
                tabIndex={0}
                onClick={() => setOpenSlug(project.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenSlug(project.slug);
                  }
                }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className={[
                  "group relative overflow-hidden rounded-[1.75rem] border border-border bg-card/40",
                  "cursor-pointer transition duration-300",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]",
                  sizeClass,
                ].join(" ")}
              >
                {project.gradient ? (
                  <div className={`absolute inset-0 ${gradientClass}`} />
                ) : (
                  <div className="absolute inset-0">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                {project.gradient ? (
                  <>
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.52),transparent_55%)]" />
                    <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:28px_28px]" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/20 to-transparent opacity-40" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                )}

                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                  <div className="max-w-[88%]">
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-white/70">
                      {project.category} · {project.meta?.year ?? "Project"}
                    </p>

                    <h3 className="mt-2 text-[1.35rem] font-medium leading-[0.98] tracking-[-0.03em] text-white sm:text-[1.6rem]">
                      {project.title}
                    </h3>

                    <p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-white/75 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
                      {project.short}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <ProjectModal
          projects={projects}
          openIndex={openIndex}
          setOpenIndex={(index) => {
            if (index === null) {
              setOpenSlug(null);
              return;
            }

            setOpenSlug(projects[index]?.slug ?? null);
          }}
          onClose={() => setOpenSlug(null)}
        />
      </div>
    </motion.section>
  );
}