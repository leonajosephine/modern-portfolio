"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Media } from "@/lib/projects";

export default function MediaRenderer({
  media,
  priority = false,
  className = "",
}: {
  media: Media;
  priority?: boolean;
  className?: string;
}) {
  if (media.type === "youtube") {
    return (
      <div
        className={`relative aspect-video overflow-hidden rounded-[1.5rem] border border-border bg-card ${className}`}
      >
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${media.id}`}
          title={media.title ?? "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (media.type === "video") {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
      const el = videoRef.current;
      if (!el) return;

      const timer = window.setTimeout(() => {
        el.play()
          .then(() => setPaused(false))
          .catch(() => setPaused(true));
      }, 450);

      return () => window.clearTimeout(timer);
    }, [media.src]);

    const toggle = () => {
      const el = videoRef.current;
      if (!el) return;

      if (el.paused) {
        el.play().then(() => setPaused(false)).catch(() => {});
      } else {
        el.pause();
        setPaused(true);
      }
    };

    return (
      <div
        className={`group relative aspect-video overflow-hidden rounded-[1.5rem] border border-border bg-card ${className}`}
      >
        <button
          type="button"
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          aria-label={paused ? "Play video" : "Pause video"}
          className="absolute inset-0 z-10"
        />

        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
        >
          <source src={media.src} />
          Your browser does not support the video tag.
        </video>

        {paused && (
          <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-4">
            <span className="rounded-full border border-border bg-background/75 px-3 py-1.5 text-xs text-foreground backdrop-blur-md">
              Paused — tap to play
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-border bg-card ${className}`}
    >
      <Image
        src={media.src}
        alt={media.alt ?? ""}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 60vw, 90vw"
        className="object-cover"
      />
    </div>
  );
}