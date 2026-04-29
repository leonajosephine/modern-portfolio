"use client";

import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import type { Block, Project } from "@/lib/projects";
import MediaRenderer from "./MediaRenderer";
import BlockRenderer from "./BlockRenderer";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <span className="rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </span>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  const items = [
    ["Role", project.meta?.role],
    ["Year", project.meta?.year],
    ["Duration", project.meta?.duration],
    ["Team", project.meta?.team],
  ].filter(([, value]) => Boolean(value));

  if (!items.length) return null;

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-6">
      {items.map(([label, value]) => (
        <div key={label}>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-1.5 text-sm text-foreground">{value}</p>
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
    <div className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-border bg-background/70 px-4 py-3 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Open project ${index + 1}`}
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

function splitBlocks(blocks: Block[]) {
  const galleryBlocks = blocks.filter((block) => block.type === "gallery");
  const contentBlocks = blocks.filter((block) => block.type !== "gallery");

  return { galleryBlocks, contentBlocks };
}

export default function ProjectModal({
  projects,
  openIndex,
  setOpenIndex,
  onClose,
}: {
  projects: Project[];
  openIndex: number | null;
  setOpenIndex: (v: number | null) => void;
  onClose: () => void;
}) {
  const isOpen = openIndex !== null && openIndex >= 0;
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const current = isOpen ? projects[openIndex as number] : null;
  const canGoPrev = isOpen && (openIndex as number) > 0;
  const canGoNext = isOpen && (openIndex as number) < projects.length - 1;

  const goPrev = () => {
    if (!canGoPrev) return;
    setOpenIndex((openIndex as number) - 1);
  };

  const goNext = () => {
    if (!canGoNext) return;
    setOpenIndex((openIndex as number) + 1);
  };

  const { galleryBlocks, contentBlocks } = useMemo(() => {
    if (!current) return { galleryBlocks: [], contentBlocks: [] };
    return splitBlocks(current.blocks);
  }, [current]);

  useEffect(() => {
    if (!isOpen) return;

    closeBtnRef.current?.focus();

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = oldOverflow;
    };
  }, [isOpen, onClose, openIndex, projects.length]);

  const handleSwipe = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeDistance = info.offset.x;
    const swipeVelocity = info.velocity.x;

    if (swipeDistance < -90 || swipeVelocity < -600) {
      goNext();
    }

    if (swipeDistance > 90 || swipeVelocity > 600) {
      goPrev();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && current ? (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Floating navigation */}
          <button
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous project"
            className="fixed left-4 top-1/2 z-[70] -translate-y-1/2 rounded-full border border-border bg-background/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-background/80 disabled:opacity-20"
          >
            <span className="flex h-12 w-12 items-center justify-center">
              <ChevronLeft size={22} strokeWidth={1.7} />
            </span>
          </button>

          <button
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next project"
            className="fixed right-4 top-1/2 z-[70] -translate-y-1/2 rounded-full border border-border bg-background/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-background/80 disabled:opacity-20"
          >
            <span className="flex h-12 w-12 items-center justify-center">
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
            initial={{ opacity: 0, scale: 0.985, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: 18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 top-3 bottom-16 z-[60] overflow-hidden rounded-[2rem] border border-border bg-background shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:inset-x-6 sm:top-6 sm:bottom-18 lg:inset-x-14"
          >
            <motion.div
              key={current.slug}
              className="flex h-full flex-col"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleSwipe}
            >
              <header className="sticky top-0 z-20 border-b border-border bg-background/82 px-5 py-4 backdrop-blur-xl sm:px-7">
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                        {String((openIndex as number) + 1).padStart(2, "0")} /{" "}
                        {String(projects.length).padStart(2, "0")}
                      </p>
                      <span className="text-muted-foreground/40">·</span>
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                        {current.meta?.year ?? "Project"} ·{" "}
                        {current.meta?.role ?? "Selected Work"}
                      </p>
                    </div>

                    <h3 className="mt-2 max-w-[58rem] text-[clamp(1.7rem,3vw,3.6rem)] font-medium leading-[0.95] tracking-[-0.055em] text-foreground">
                      {current.title}
                    </h3>

                    {current.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                        {current.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-foreground/75"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <button
                    ref={closeBtnRef}
                    onClick={onClose}
                    aria-label="Close project"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xl text-foreground transition hover:scale-105 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    ×
                  </button>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto">
                <div className="grid gap-8 px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:gap-10">
                  {/* Visual story */}
                  <div className="space-y-5">
                    <MediaRenderer
                      key={`${current.slug}-${current.hero.type === "video" ? current.hero.src : current.hero.type}`}
                      media={current.hero}
                      priority
                      className="ring-1 ring-border/70 shadow-[0_18px_60px_rgba(0,0,0,0.32)]"
                    />

                    {galleryBlocks.map((block, blockIndex) =>
                      block.type === "gallery" ? (
                        <section key={blockIndex} className="space-y-4">
                          {block.title ? (
                            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                              {block.title}
                            </p>
                          ) : null}

                          <div className="grid gap-4 sm:grid-cols-2">
                            {block.items.map((media, mediaIndex) => (
                              <MediaRenderer key={mediaIndex} media={media} />
                            ))}
                          </div>
                        </section>
                      ) : null
                    )}
                  </div>

                  {/* Context */}
                  <aside className="lg:sticky lg:top-[8.5rem] lg:self-start">
                    <div className="space-y-7">
                      <p className="text-[1.05rem] leading-8 text-muted-foreground sm:text-[1.12rem] sm:leading-9">
                        {current.short}
                      </p>

                      <ProjectMeta project={current} />

                      {current.links?.length ? (
                        <div className="space-y-3">
                          <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                            Links
                          </p>

                          <div className="flex flex-col gap-3">
                            {current.links.map((link, i) => (
                              <a
                                key={i}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/55 px-4 py-3 text-foreground transition hover:border-foreground/20 hover:bg-muted"
                              >
                                <span className="flex items-center gap-3">
                                  <LinkBadge kind={link.kind} />
                                  <span className="text-sm sm:text-base">
                                    {link.label}
                                  </span>
                                </span>
                                <span className="text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground">
                                  ↗
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      <div className="border-t border-border pt-7">
                        <BlockRenderer blocks={contentBlocks} />
                      </div>

                      <p className="hidden font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground/60 sm:block">
                        Use ← / → keys or swipe on mobile
                      </p>
                    </div>
                  </aside>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}