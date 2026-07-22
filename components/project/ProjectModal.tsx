"use client";

import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Block, Media, Project } from "@/lib/projects";
import MediaRenderer from "./MediaRenderer";
import BlockRenderer from "./BlockRenderer";
import {
  AppWindow,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Play,
  X,
} from "lucide-react";
import { FaFigma, FaGithub } from "react-icons/fa6";

function LinkBadge({ kind }: { kind?: string }) {
  const label =
    kind === "live"
      ? "LIVE"
      : kind === "repo"
        ? "CODE"
        : kind === "figma"
          ? "FIGMA"
          : kind === "video"
            ? "VIDEO"
            : kind === "app"
              ? "APP"
              : kind === "case"
                ? "CASE"
                : "LINK";

  return (
    <span className="rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground sm:text-[0.62rem] sm:tracking-[0.2em]">
      {label}
    </span>
  );
}

function LinkIcon({ kind }: { kind?: string }) {
  const className =
    "text-muted-foreground transition duration-200 group-hover:translate-x-0.5 group-hover:text-foreground";

  if (kind === "repo") {
    return <FaGithub size={16} className={className} />;
  }

  if (kind === "figma") {
    return <FaFigma size={16} className={className} />;
  }

  if (kind === "video") {
    return <Play size={16} className={className} />;
  }

  if (kind === "app") {
    return <AppWindow size={16} className={className} />;
  }

  if (kind === "case") {
    return <FileText size={16} className={className} />;
  }

  return <ExternalLink size={16} className={className} />;
}

function ProjectMeta({ project }: { project: Project }) {
  const items = [
    ["Role", project.meta?.role],
    ["Year", project.meta?.year],
    ["Duration", project.meta?.duration],
    ["Team", project.meta?.team],
  ].filter(([, value]) => Boolean(value));

  if (!items.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4 border-y border-border py-5 sm:gap-x-6 sm:gap-y-5 sm:py-6">
      {items.map(([label, value]) => (
        <div key={label}>
          <p className="font-mono text-[0.56rem] uppercase tracking-[0.19em] text-muted-foreground sm:text-[0.62rem] sm:tracking-[0.22em]">
            {label}
          </p>

          <p className="mt-1 text-[0.8rem] text-foreground sm:mt-1.5 sm:text-sm">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProjectProgress({
  currentIndex,
  total,
  onSelect,
}: {
  currentIndex: number;
  total: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 z-[80] hidden -translate-x-1/2 rounded-full border border-border bg-background/75 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:block">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Open project ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              className={[
                "h-2 rounded-full transition-all duration-300",
                isActive
                  ? "w-8 bg-foreground"
                  : "w-2 bg-foreground/35 hover:bg-foreground/60",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}

function MobileProjectNavigation({
  currentIndex,
  total,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
}: {
  currentIndex: number;
  total: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <nav
      aria-label="Project navigation"
      className="
        absolute bottom-1 left-1 right-1 z-50
        px-2 pb-1 pt-2
        sm:hidden
      "
    >
      <div
        className="
          grid grid-cols-[1fr_auto_1fr] items-center gap-2
          rounded-[1.35rem]
          border border-white/10
          bg-background/70
          px-2 py-2
          shadow-[0_10px_40px_rgba(0,0,0,0.22)]
          backdrop-blur-2xl
          supports-[backdrop-filter]:bg-background/55
        "
      >
        <button
          type="button"
          onClick={onPrev}
          disabled={!canGoPrev}
          aria-label="Previous project"
          className="
            group flex min-h-11 items-center justify-start gap-1.5
            rounded-[1rem] px-2.5
            text-[0.72rem] font-medium
            text-foreground
            transition
            hover:bg-foreground/5
            active:scale-[0.97]
            disabled:pointer-events-none
            disabled:opacity-25
          "
        >
          <ChevronLeft
            size={17}
            strokeWidth={1.7}
            className="transition-transform group-hover:-translate-x-0.5"
          />

          <span>Previous</span>
        </button>

        <div
          aria-label={`Project ${currentIndex + 1} of ${total}`}
          className="
            flex min-w-[58px] items-center justify-center
            px-1
          "
        >
          <span
            className="
              font-mono text-[0.62rem]
              tracking-[0.18em]
              text-muted-foreground
            "
          >
            {String(currentIndex + 1).padStart(2, "0")}
            <span className="mx-1.5 text-muted-foreground/35">
              /
            </span>
            <span className="text-muted-foreground/55">
              {String(total).padStart(2, "0")}
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          aria-label="Next project"
          className="
            group flex min-h-11 items-center justify-end gap-1.5
            rounded-[1rem] px-2.5
            text-[0.72rem] font-medium
            text-foreground
            transition
            hover:bg-foreground/5
            active:scale-[0.97]
            disabled:pointer-events-none
            disabled:opacity-25
          "
        >
          <span>Next</span>

          <ChevronRight
            size={17}
            strokeWidth={1.7}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </nav>
  );
}

function splitBlocks(blocks: Block[]) {
  const galleryBlocks = blocks.filter(
    (block) => block.type === "gallery"
  );

  const contentBlocks = blocks.filter(
    (block) => block.type !== "gallery"
  );

  return {
    galleryBlocks,
    contentBlocks,
  };
}

function shouldSpanFullWidth(media: Media) {
  return media.type === "video" || media.type === "youtube";
}

export default function ProjectModal({
  projects,
  openIndex,
  setOpenIndex,
  onClose,
}: {
  projects: Project[];
  openIndex: number | null;
  setOpenIndex: (value: number | null) => void;
  onClose: () => void;
}) {
  const isOpen =
    openIndex !== null &&
    openIndex >= 0 &&
    openIndex < projects.length;

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const current = isOpen
    ? projects[openIndex as number]
    : null;

  const canGoPrev =
    isOpen && (openIndex as number) > 0;

  const canGoNext =
    isOpen &&
    (openIndex as number) < projects.length - 1;

  const goPrev = () => {
    if (!canGoPrev) {
      return;
    }

    setOpenIndex((openIndex as number) - 1);
  };

  const goNext = () => {
    if (!canGoNext) {
      return;
    }

    setOpenIndex((openIndex as number) + 1);
  };

  const { galleryBlocks, contentBlocks } = useMemo(() => {
    if (!current) {
      return {
        galleryBlocks: [],
        contentBlocks: [],
      };
    }

    return splitBlocks(current.blocks);
  }, [current]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const focusTimeout = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      window.clearTimeout(focusTimeout);

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    isOpen,
    onClose,
    openIndex,
    projects.length,
  ]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [isOpen, openIndex]);

  return (
    <AnimatePresence>
      {isOpen && current ? (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm sm:backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous project"
            className="fixed left-3 top-1/2 z-[70] hidden -translate-y-1/2 rounded-full border border-border bg-background/75 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-background/95 disabled:pointer-events-none disabled:opacity-20 md:block lg:left-4"
          >
            <span className="flex h-11 w-11 items-center justify-center lg:h-12 lg:w-12">
              <ChevronLeft size={22} strokeWidth={1.7} />
            </span>
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next project"
            className="fixed right-3 top-1/2 z-[70] hidden -translate-y-1/2 rounded-full border border-border bg-background/75 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-background/95 disabled:pointer-events-none disabled:opacity-20 md:block lg:right-4"
          >
            <span className="flex h-11 w-11 items-center justify-center lg:h-12 lg:w-12">
              <ChevronRight size={22} strokeWidth={1.7} />
            </span>
          </button>

          <ProjectProgress
            currentIndex={openIndex as number}
            total={projects.length}
            onSelect={setOpenIndex}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${current.title} project details`}
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
              y: 18,
            }}
            transition={{
              duration: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-2 z-[60] overflow-hidden rounded-[1.5rem] border border-foreground/12 bg-card shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:inset-x-6 sm:bottom-16 sm:top-6 sm:rounded-[2rem] sm:shadow-[0_40px_140px_rgba(0,0,0,0.75)] lg:inset-x-14"
          >
            <motion.div
              key={current.slug}
              className="relative flex h-full min-h-0 flex-col"
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 14,
              }}
              transition={{
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close project"
                className="absolute right-3 top-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md transition hover:scale-105 hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:top-5 sm:h-11 sm:w-11"
              >
                <X size={18} />
              </button>

              <div
                ref={scrollContainerRef}
                className="min-h-0 flex-1 pb-28 touch-pan-y overflow-y-auto overscroll-contain [scrollbar-gutter:stable]"
                style={{
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <section className="grid overflow-hidden border-b border-border lg:min-h-[58vh] lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="relative h-[34vh] min-h-[250px] overflow-hidden sm:h-[44vh] sm:min-h-[360px] lg:h-auto lg:min-h-[58vh]">
                    <MediaRenderer
                      key={`${current.slug}-${
                        current.hero.type === "video"
                          ? current.hero.src
                          : current.hero.type
                      }`}
                      media={current.hero}
                      priority
                      className="h-full rounded-none"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
                  </div>

                  <div className="relative flex flex-col justify-between bg-card px-5 py-6 sm:px-8 sm:py-8 lg:min-h-[58vh] lg:px-10 lg:py-9">
                    <div>
                      <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground sm:text-[0.65rem] sm:tracking-[0.24em]">
                        {String(
                          (openIndex as number) + 1
                        ).padStart(2, "0")}{" "}
                        /{" "}
                        {String(projects.length).padStart(
                          2,
                          "0"
                        )}{" "}
                        ·{" "}
                        {current.meta?.year ?? "Project"}
                      </p>

                      <h3 className="mt-3 max-w-[42rem] text-[clamp(2rem,10vw,3.5rem)] font-medium leading-[0.9] tracking-[-0.065em] text-foreground sm:mt-5 sm:text-[clamp(2.2rem,4.8vw,5rem)] lg:leading-[0.88] lg:tracking-[-0.07em]">
                        {current.title}
                      </h3>
                    </div>

                    <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                      <p className="max-w-[34rem] text-[0.9rem] leading-6 text-muted-foreground sm:text-[1.08rem] sm:leading-8">
                        {current.short}
                      </p>

                      <ProjectMeta project={current} />

                      {current.links?.length ? (
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {current.links.map(
                            (link, index) => (
                              <a
                                key={`${link.label}-${index}`}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-[0.72rem] text-foreground transition hover:border-foreground/30 hover:bg-muted sm:min-h-0 sm:gap-3 sm:px-4 sm:py-2.5 sm:text-sm"
                              >
                                <LinkBadge
                                  kind={link.kind}
                                />

                                <span>{link.label}</span>

                                <LinkIcon
                                  kind={link.kind}
                                />
                              </a>
                            )
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>

                <div className="mx-auto max-w-[980px] space-y-7 px-4 py-7 sm:space-y-8 sm:px-7 sm:py-10 lg:py-12">
                  {galleryBlocks.map(
                    (block, blockIndex) =>
                      block.type === "gallery" ? (
                        <section
                          key={blockIndex}
                          className="space-y-3 sm:space-y-4"
                        >
                          {block.title ? (
                            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground sm:text-[0.68rem] sm:tracking-[0.22em]">
                              {block.title}
                            </p>
                          ) : null}

                          <div className="grid grid-cols-2 gap-2 sm:gap-4">
                            {block.items.map(
                              (media, mediaIndex) => {
                                const fullWidth =
                                  shouldSpanFullWidth(
                                    media
                                  );

                                return (
                                  <div
                                    key={mediaIndex}
                                    className={
                                      fullWidth
                                        ? "col-span-2"
                                        : "col-span-1"
                                    }
                                  >
                                    <MediaRenderer
                                      media={media}
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </section>
                      ) : null
                  )}

                  <div className="border-t border-border pt-7 sm:pt-8">
                    <BlockRenderer
                      blocks={contentBlocks}
                    />
                  </div>

                  <p className="hidden font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground/60 sm:block">
                    Use ← / → keys to explore projects
                  </p>
                </div>
              </div>

              <MobileProjectNavigation
                currentIndex={openIndex as number}
                total={projects.length}
                canGoPrev={canGoPrev}
                canGoNext={canGoNext}
                onPrev={goPrev}
                onNext={goNext}
              />
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}