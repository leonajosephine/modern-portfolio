"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type GradientCard = {
  id: string;
  label: string;
  title: string;
  description: string;
  stat?: string;
  aura: string;
  pattern?: boolean;
};

const cards: GradientCard[] = [
  {
    id: "visual-systems",
    label: "Visual Systems",
    title: "Editorial layouts\nwith digital depth.",
    description:
      "Exploring typography, spacing, color and composition to create interfaces that feel less generic and more memorable.",
    stat: "Design",
    aura:
      "radial-gradient(circle at 70% 78%, rgba(255,175,92,0.88), transparent 28%), radial-gradient(circle at 28% 24%, rgba(140,131,255,0.82), transparent 34%), linear-gradient(180deg, rgba(189,171,230,0.95) 0%, rgba(233,136,125,0.85) 62%, rgba(248,163,87,0.95) 100%)",
  },
  {
    id: "interface-detail",
    label: "// Interface Detail",
    title: "Soft gradients,\nclear hierarchy.",
    description:
      "A visual direction that combines clean frontend structure with atmospheric, expressive UI details.",
    stat: "UI / UX",
    pattern: true,
    aura:
      "radial-gradient(circle at 22% 22%, rgba(255,210,129,0.65), transparent 24%), radial-gradient(circle at 78% 68%, rgba(219,111,68,0.7), transparent 26%), linear-gradient(180deg, rgba(180,204,218,0.95) 0%, rgba(228,179,117,0.78) 42%, rgba(113,45,38,0.96) 100%)",
  },
  {
    id: "digital-atmosphere",
    label: "Digital Atmosphere",
    title: "Interfaces that feel\nalive and intentional.",
    description:
      "Using motion, contrast and visual rhythm to make digital products feel more crafted, tactile and engaging.",
    stat: "Motion",
    aura:
      "radial-gradient(circle at 78% 78%, rgba(255,170,85,0.72), transparent 24%), radial-gradient(circle at 18% 22%, rgba(203,222,244,0.82), transparent 26%), linear-gradient(180deg, rgba(194,208,217,0.92) 0%, rgba(80,116,53,0.92) 68%, rgba(19,62,20,0.98) 100%)",
  },
];

function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-[0.55] mix-blend-soft-light"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "180px 180px",
      }}
    />
  );
}

function DesignCard({ card }: { card: GradientCard }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsActive((prev) => !prev)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      className="group relative min-h-[320px] overflow-hidden rounded-[1.75rem] border border-white/10 text-left shadow-[0_24px_70px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:min-h-[380px]"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 scale-[1.02] transition-transform duration-500 group-hover:scale-[1.05]"
          style={{ background: card.aura }}
        />

        {card.pattern ? (
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, transparent 0, transparent 20px, rgba(255,255,255,0.14) 21px, transparent 22px)",
              backgroundSize: "36px 36px",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85))",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85))",
            }}
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-black/8" />
        <div
          className={[
            "absolute inset-0 bg-[linear-gradient(180deg,rgba(15,16,18,0.12),rgba(15,16,18,0.62))] transition-opacity duration-300",
            isActive ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <GrainOverlay />
      </div>

      <div
        className={[
          "relative z-10 flex h-full min-h-[inherit] flex-col justify-between p-6 transition-all duration-300 sm:p-7",
          isActive ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100",
        ].join(" ")}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/75">
          {card.label}
        </p>

        <h3 className="whitespace-pre-line text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-[2.7rem]">
          {card.title}
        </h3>
      </div>

      <div
        className={[
          "absolute inset-0 z-20 flex flex-col justify-between p-6 transition-all duration-300 sm:p-7",
          isActive
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        ].join(" ")}
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
            {card.label}
          </p>

          <h3 className="mt-3 text-[2rem] font-medium leading-[1.06] tracking-[-0.04em] text-white sm:text-[2.3rem]">
            {card.title.replace("\n", " ")}
          </h3>

          <p className="mt-4 text-sm font-light leading-relaxed text-white/82 sm:text-base">
            {card.description}
          </p>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90">
            {card.stat}
          </span>

          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
            hover or tap
          </span>
        </div>
      </div>
    </button>
  );
}

export default function DesignHighlights() {
  return (
    <section id="design" className="px-5 py-20 sm:px-6 sm:py-24 lg:py-32 mx-auto">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="max-w-[52rem]"
        >
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-muted-foreground">
            Design Direction
          </p>

          <h2 className="mt-4 text-[clamp(2.8rem,5.2vw,6rem)] font-medium leading-[0.94] tracking-[-0.06em] text-foreground">
            Visual ideas with an
            <span className="font-serif italic"> atmospheric edge</span>
          </h2>

          <p className="mt-6 max-w-[42rem] text-[0.98rem] leading-8 text-muted-foreground sm:text-[1.04rem]">
            A small exploration of the visual language I like working with:
            editorial typography, soft gradients, subtle texture and modern
            interface details.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-5"
        >
          {cards.map((card) => (
            <DesignCard key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}