
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { projects } from "@/lib/projects";
import ProjectModal from "@/components/project/ProjectModal";

import { useGalleryLayout } from "./useGalleryLayout";
import BentoGallery from "./BentoGallery";
import EditorialGallery from "./EditorialGallery";

type Filter = "all" | "coding" | "design" | "3d";

const filters: {
  id: Filter;
  label: string;
  mobileLabel?: string;
}[] = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "coding",
    label: "Coding Projects",
    mobileLabel: "Coding",
  },
  {
    id: "design",
    label: "Design",
  },
  {
    id: "3d",
    label: "3D",
  },
];

export default function Portfolio() {
  const galleryLayout = useGalleryLayout();

  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter]);

  const openIndex =
    openSlug === null
      ? null
      : projects.findIndex(
          (project) => project.slug === openSlug
        );

  const handleFilterChange = (filter: Filter) => {
    if (filter === activeFilter) {
      return;
    }

    const previousScrollPosition = window.scrollY;

    setActiveFilter(filter);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: previousScrollPosition,
        behavior: "instant",
      });
    });
  };

  return (
    <motion.section
      id="portfolio"
      className="
        relative overflow-hidden px-5 py-16
        sm:px-6 sm:py-24
        lg:py-32
      "
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.6,
      }}
      style={{
        backgroundColor: "var(--alt-bg)",
        color: "var(--alt-text)",
      }}
    >
      <motion.div
        aria-hidden="true"
        initial={{
          opacity: 0,
          x: 80,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="
          pointer-events-none absolute right-0 top-0
          hidden h-full
          w-[clamp(7rem,12vw,14rem)]
          overflow-hidden select-none
          2xl:block
        "
      >
        <p
          className="
            absolute right-0 top-1/2 origin-center
            -translate-y-1/2 translate-x-[48%]
            rotate-270 whitespace-nowrap
            text-[clamp(7rem,14vw,16rem)]
            font-semibold uppercase leading-none
            tracking-[-0.09em]
            text-[var(--alt-text)]/10
          "
        >
          Portfolio
        </p>
      </motion.div>

      <div className="container">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[52rem]">
            <p
              className="
                font-mono text-[0.65rem] uppercase
                tracking-[0.24em]
                text-[var(--alt-text-muted)]
                sm:text-[0.72rem]
                sm:tracking-[0.26em]
              "
            >
              [Portfolio]
            </p>

            <h2
              className="
                mt-3 text-[clamp(2.65rem,11vw,6rem)]
                font-medium leading-[0.94]
                tracking-[-0.06em]
                text-[var(--alt-text)]
                sm:mt-4
                sm:text-[clamp(2.8rem,5.2vw,6rem)]
              "
            >
              Selected work and
              <span className="font-serif italic">
                {" "}
                visual experiments
              </span>
            </h2>

            <p
              className="
                mt-5 max-w-[34rem]
                text-[0.9rem] leading-6
                text-[var(--alt-text-muted)]
                sm:hidden
              "
            >
              Selected projects across frontend, interface
              design and creative technology.
            </p>

            <p
              className="
                mt-6 hidden max-w-[42rem]
                text-[1.04rem] leading-8
                text-[var(--alt-text-muted)]
                sm:block
              "
            >
              A selection of projects across frontend
              development, interface design, and interactive
              concepts — built to explore ideas, refine craft,
              and create memorable digital experiences.
            </p>

            <div
              className="
                -mx-5 mt-6 overflow-x-auto px-5
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
                sm:mx-0 sm:px-0
              "
            >
              <div className="flex w-max rounded-full border border-border bg-card/50 p-1">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.id;

                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() =>
                        handleFilterChange(filter.id)
                      }
                      aria-pressed={isActive}
                      className={[
                        "whitespace-nowrap rounded-full",
                        "px-4 py-2 text-[0.68rem] font-medium",
                        "transition-all duration-200",
                        "sm:px-5 sm:text-sm",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-ring",
                        "focus-visible:ring-offset-2",
                        "focus-visible:ring-offset-background",
                        isActive
                          ? "portfolio-filter-active bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground",
                      ].join(" ")}
                    >
                      {filter.mobileLabel ? (
                        <>
                          <span className="sm:hidden">
                            {filter.mobileLabel}
                          </span>
                          <span className="hidden sm:inline">
                            {filter.label}
                          </span>
                        </>
                      ) : (
                        filter.label
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {galleryLayout === "editorial" ? (
          <EditorialGallery
            projects={filteredProjects}
            onOpen={setOpenSlug}
          />
        ) : (
          <BentoGallery
            projects={filteredProjects}
            onOpen={setOpenSlug}
          />
        )}

        <ProjectModal
          projects={projects}
          openIndex={openIndex}
          setOpenIndex={(index) => {
            if (index === null) {
              setOpenSlug(null);
              return;
            }

            setOpenSlug(
              projects[index]?.slug ?? null
            );
          }}
          onClose={() => setOpenSlug(null)}
        />
      </div>
    </motion.section>
  );
}
