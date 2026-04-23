"use client";

import type { Block } from "@/lib/projects";
import MediaRenderer from "./MediaRenderer";

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "text":
            return (
              <section key={idx} className="space-y-3">
                {block.title ? (
                  <h4 className="text-base font-medium text-foreground">
                    {block.title}
                  </h4>
                ) : null}
                <p className="text-[0.98rem] leading-8 text-muted-foreground">
                  {block.body}
                </p>
              </section>
            );

          case "bullets":
            return (
              <section key={idx} className="space-y-3">
                {block.title ? (
                  <h4 className="text-base font-medium text-foreground">
                    {block.title}
                  </h4>
                ) : null}
                <ul className="space-y-2 pl-5 text-[0.98rem] leading-8 text-muted-foreground marker:text-foreground/70">
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            );

          case "stack":
            return (
              <section key={idx} className="space-y-3">
                {block.title ? (
                  <h4 className="text-base font-medium text-foreground">
                    {block.title}
                  </h4>
                ) : null}
                <div className="flex flex-wrap gap-2.5">
                  {block.items.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full border border-border bg-background/60 px-3.5 py-2 text-sm text-foreground/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            );

          case "metrics":
            return (
              <section key={idx} className="space-y-3">
                {block.title ? (
                  <h4 className="text-base font-medium text-foreground">
                    {block.title}
                  </h4>
                ) : null}
                <div className="grid gap-3 sm:grid-cols-2">
                  {block.items.map((metric, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border bg-background/60 p-4"
                    >
                      <div className="text-sm text-muted-foreground">
                        {metric.label}
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          case "gallery":
            return (
              <section key={idx} className="space-y-4">
                {block.title ? (
                  <h4 className="text-base font-medium text-foreground">
                    {block.title}
                  </h4>
                ) : null}
                <div className="grid gap-3 sm:grid-cols-2">
                  {block.items.map((media, i) => (
                    <MediaRenderer key={i} media={media} />
                  ))}
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}