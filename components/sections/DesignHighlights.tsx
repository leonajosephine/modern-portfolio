"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type PrincipleCard = {
  id: string;
  label: string;
  title: string;
  description: string;
  stat: string;
  aura: string;
  pattern?: boolean;
};

const cards: PrincipleCard[] = [
  {
    id: "clarity",
    label: "01 · Clarity",
    title: "Make it\neffortless.",
    description:
      "Good design shouldn't make people think about how to use it. Clear structure, thoughtful hierarchy and intuitive interactions always come first.",
    stat: "UX",
    aura:
      "radial-gradient(circle at 70% 78%, rgba(255,175,92,0.88), transparent 28%), radial-gradient(circle at 28% 24%, rgba(140,131,255,0.82), transparent 34%), linear-gradient(180deg, rgba(189,171,230,0.95) 0%, rgba(233,136,125,0.85) 62%, rgba(248,163,87,0.95) 100%)",
  },
  {
    id: "atmosphere",
    label: "02 · Atmosphere",
    title: "Make it\nmemorable.",
    description:
      "Typography, motion, gradients and tiny details create emotion. They're what turn a functional interface into an experience people remember.",
    stat: "Design",
    pattern: true,
    aura:
      "radial-gradient(circle at 22% 22%, rgba(255,210,129,0.65), transparent 24%), radial-gradient(circle at 78% 68%, rgba(219,111,68,0.7), transparent 26%), linear-gradient(180deg, rgba(180,204,218,0.95) 0%, rgba(228,179,117,0.78) 42%, rgba(113,45,38,0.96) 100%)",
  },
  {
    id: "craft",
    label: "03 · Craft",
    title: "Make it\nreal.",
    description:
      "I enjoy working across design and frontend because the best ideas happen when visual thinking and implementation evolve together.",
    stat: "Code",
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

function PrincipleCard({ card }: { card: PrincipleCard }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsActive((prev) => !prev)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      className="group relative min-h-[300px] w-[84vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-white/10 text-left shadow-[0_24px_70px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:min-h-[330px] sm:w-[72vw] md:min-h-[380px] md:w-auto md:max-w-none"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 scale-[1.02] transition-transform duration-500 group-hover:scale-[1.05]"
          style={{ background: card.aura }}
        />

        {card.pattern && (
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, transparent 0, transparent 20px, rgba(255,255,255,0.14) 21px, transparent 22px)",
              backgroundSize: "36px 36px",
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-black/8" />

        <div
          className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(15,16,18,0.12),rgba(15,16,18,0.62))] transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />

        <GrainOverlay />
      </div>

      <div
        className={`relative z-10 flex h-full flex-col justify-between p-6 transition-all duration-300 ${
          isActive ? "translate-y-3 opacity-0" : "opacity-100"
        }`}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
          {card.label}
        </p>

        <h3 className="whitespace-pre-line text-[2.3rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
          {card.title}
        </h3>
      </div>

      <div
        className={`absolute inset-0 z-20 flex flex-col justify-between p-6 transition-all duration-300 ${
          isActive
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
            {card.label}
          </p>

          <h3 className="mt-3 text-[2rem] font-medium leading-[1.06] tracking-[-0.04em] text-white">
            {card.title.replace("\n", " ")}
          </h3>

          <p className="mt-5 text-[0.95rem] leading-7 text-white/82">
            {card.description}
          </p>
        </div>

        <span className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90">
          {card.stat}
        </span>
      </div>
    </button>
  );
}

export default function DesignPrinciples() {
  return (
    <section
      id="principles"
      data-cursor="design"
      className="mx-auto px-5 py-16 sm:px-6 sm:py-20 lg:py-32"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="max-w-[52rem]"
        >
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-muted-foreground">
            Design Principles
          </p>

          <h2 className="mt-4 text-[clamp(2.8rem,5.2vw,6rem)] font-medium leading-[0.94] tracking-[-0.06em] text-foreground">
            It´s usually the little
            <span className="font-serif italic"> things.</span>
          </h2>

          <p className="mt-6 max-w-[42rem] text-[0.98rem] leading-8 text-muted-foreground sm:text-[1.04rem]">
            Every project is different, but these are the ideas I keep coming
            back to. They shape how I approach design, frontend development and
            every interaction in between.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7 }}
          className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:gap-5"
        >
          {cards.map((card) => (
            <PrincipleCard key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}