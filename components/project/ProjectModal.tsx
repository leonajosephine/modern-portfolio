"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import MediaRenderer from "./MediaRenderer";
import BlockRenderer from "./BlockRenderer";

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
    <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
      {label}
    </span>
  );
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

  useEffect(() => {
    if (!isOpen) return;

    closeBtnRef.current?.focus();

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setOpenIndex(Math.min(projects.length - 1, (openIndex as number) + 1));
      }
      if (e.key === "ArrowLeft") {
        setOpenIndex(Math.max(0, (openIndex as number) - 1));
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = oldOverflow;
    };
  }, [isOpen, onClose, openIndex, projects.length, setOpenIndex]);

  return (
    <AnimatePresence>
      {isOpen && current ? (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${current.title} project details`}
            initial={{ opacity: 0, scale: 0.985, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-4 bottom-4 z-[60] overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:inset-x-6 lg:inset-x-10"
          >
            <div className="flex h-full flex-col">
              <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
                <div className="min-w-0">
                  <h3 className="text-xl font-medium leading-tight text-foreground sm:text-2xl">
                    {current.title}
                  </h3>

                  {current.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {current.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground"
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
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-lg text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  ×
                </button>
              </header>

              <div className="flex-1 overflow-y-auto">
                <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
                  <div className="space-y-4">
                    <MediaRenderer
                      key={`${current.slug}-${current.hero.type === "video" ? current.hero.src : current.hero.type}`}
                      media={current.hero}
                      priority
                      className="overflow-hidden rounded-[1.5rem]"
                    />

                    <div className="hidden gap-3 lg:flex">
                      <button
                        className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                        onClick={() =>
                          setOpenIndex(Math.max(0, (openIndex as number) - 1))
                        }
                        disabled={(openIndex as number) <= 0}
                        aria-label="Previous project"
                      >
                        ← Prev
                      </button>

                      <button
                        className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                        onClick={() =>
                          setOpenIndex(
                            Math.min(projects.length - 1, (openIndex as number) + 1)
                          )
                        }
                        disabled={(openIndex as number) >= projects.length - 1}
                        aria-label="Next project"
                      >
                        Next →
                      </button>
                    </div>
                  </div>

                  <aside className="rounded-[1.5rem] border border-border bg-card/50 p-5 sm:p-6">
                    <p className="text-[0.98rem] leading-8 text-muted-foreground">
                      {current.short}
                    </p>

                    {current.meta?.role ||
                    current.meta?.year ||
                    current.meta?.duration ||
                    current.meta?.team ? (
                      <div className="mt-6 grid gap-3 border-y border-border py-5 text-sm text-muted-foreground">
                        {current.meta?.role ? (
                          <div>
                            <span className="font-medium text-foreground">Role:</span>{" "}
                            {current.meta.role}
                          </div>
                        ) : null}
                        {current.meta?.year ? (
                          <div>
                            <span className="font-medium text-foreground">Year:</span>{" "}
                            {current.meta.year}
                          </div>
                        ) : null}
                        {current.meta?.duration ? (
                          <div>
                            <span className="font-medium text-foreground">Duration:</span>{" "}
                            {current.meta.duration}
                          </div>
                        ) : null}
                        {current.meta?.team ? (
                          <div>
                            <span className="font-medium text-foreground">Team:</span>{" "}
                            {current.meta.team}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {current.links?.length ? (
                      <div className="mt-6 flex flex-col gap-3">
                        {current.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 px-4 py-3 text-foreground transition hover:bg-muted"
                          >
                            <LinkBadge kind={link.kind} />
                            <span className="text-sm sm:text-base">{link.label}</span>
                          </a>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-8">
                      <BlockRenderer blocks={current.blocks} />
                    </div>
                  </aside>
                </div>
              </div>

              <div className="flex gap-3 border-t border-border bg-background/90 px-5 py-4 backdrop-blur lg:hidden">
                <button
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() =>
                    setOpenIndex(Math.max(0, (openIndex as number) - 1))
                  }
                  disabled={(openIndex as number) <= 0}
                  aria-label="Previous project"
                >
                  ← Prev
                </button>

                <button
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() =>
                    setOpenIndex(
                      Math.min(projects.length - 1, (openIndex as number) + 1)
                    )
                  }
                  disabled={(openIndex as number) >= projects.length - 1}
                  aria-label="Next project"
                >
                  Next →
                </button>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}