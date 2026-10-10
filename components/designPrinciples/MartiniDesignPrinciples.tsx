
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
  textColor?: "dark" | "light";
};

const cards: PrincipleCard[] = [
  {
    id: "clarity",
    label: "01 · Clarity",
    title: "Make it\neffortless.",
    description:
      "Good design shouldn't make people think about how to use it. Clear structure, thoughtful hierarchy and intuitive interactions always come first.",
    stat: "UX",
    textColor: "dark",
    aura:
      "radial-gradient(circle at 72% 78%, rgba(243,231,191,0.98), transparent 36%), radial-gradient(circle at 24% 18%, rgba(201,223,242,0.98), transparent 42%), radial-gradient(circle at 80% 12%, rgba(255,255,255,0.65), transparent 28%), linear-gradient(160deg, #B7D4EA 0%, #D8E6ED 42%, #E8C7B4 72%, #BD7C7E 100%)",
  },
  {
    id: "atmosphere",
    label: "02 · Atmosphere",
    title: "Make it\nmemorable.",
    description:
      "Typography, motion, gradients and tiny details create emotion. They're what turn a functional interface into an experience people remember.",
    stat: "Design",
    pattern: true,
    textColor: "light",
    aura:
      "radial-gradient(circle at 24% 18%, rgba(243,231,191,0.96), transparent 34%), radial-gradient(circle at 82% 62%, rgba(215,119,125,0.85), transparent 38%), radial-gradient(circle at 18% 86%, rgba(201,223,242,0.55), transparent 32%), linear-gradient(155deg, #E8CFB1 0%, #C57C82 43%, #790719 100%)",
  },
  {
    id: "craft",
    label: "03 · Craft",
    title: "Make it\nreal.",
    description:
      "I enjoy working across design and frontend because the best ideas happen when visual thinking and implementation evolve together.",
    stat: "Code",
    textColor: "light",
    aura:
      "radial-gradient(circle at 78% 20%, rgba(243,231,191,0.85), transparent 30%), radial-gradient(circle at 20% 26%, rgba(201,223,242,0.98), transparent 38%), radial-gradient(circle at 75% 82%, rgba(121,7,25,0.9), transparent 42%), linear-gradient(155deg, #C9DFF2 0%, #9DAEC6 42%, #854B65 72%, #580715 100%)",
  },
];

function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-[0.45] mix-blend-soft-light"
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

  const isDarkText = card.textColor === "dark";

  return (
    <button
      type="button"
      onClick={() => setIsActive((prev) => !prev)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      aria-pressed={isActive}
      className="
        group relative min-h-[300px]
        w-[84vw] max-w-[340px]
        shrink-0 snap-center
        overflow-hidden rounded-[0.5rem]
        border border-[#750B1B]/10
        text-left
        shadow-[0_20px_55px_rgba(37,35,38,0.10)]
        transition duration-300
        hover:-translate-y-1
        hover:border-[#750B1B]/25
        hover:shadow-[0_24px_65px_rgba(37,35,38,0.16)]
        sm:min-h-[330px] sm:w-[72vw]
        md:min-h-[380px] md:w-auto md:max-w-none
      "
    >
      <div className="absolute inset-0">
        <div
          className="
            absolute inset-0 scale-[1.02]
            transition-transform duration-500
            group-hover:scale-[1.05]
          "
          style={{ background: card.aura }}
        />

        {card.pattern && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, transparent 0, transparent 20px, rgba(255,255,255,0.18) 21px, transparent 22px)",
              backgroundSize: "36px 36px",
            }}
          />
        )}

        <div
          className={`absolute inset-0 ${
            isDarkText
              ? "bg-gradient-to-t from-white/25 via-transparent to-white/10"
              : "bg-gradient-to-t from-black/45 via-black/5 to-transparent"
          }`}
        />

        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isDarkText
              ? "bg-[linear-gradient(180deg,rgba(250,249,246,0.35),rgba(250,249,246,0.88))]"
              : "bg-[linear-gradient(180deg,rgba(37,35,38,0.18),rgba(37,35,38,0.78))]"
          } ${isActive ? "opacity-100" : "opacity-0"}`}
        />

        <GrainOverlay />
      </div>

      <div
        className={`relative z-10 flex h-full flex-col justify-between p-6 transition-all duration-300 ${
          isActive ? "translate-y-3 opacity-0" : "opacity-100"
        }`}
      >
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
            isDarkText ? "text-[#252326]/75" : "text-white/80"
          }`}
        >
          {card.label}
        </p>

        <h3
          className={`whitespace-pre-line font-[family-name:var(--font-dm-serif)] text-[2.5rem] font-normal leading-[1.02] tracking-[-0.035em] ${
            isDarkText ? "text-[#252326]" : "text-white"
          }`}
        >
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
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
              isDarkText ? "text-[#252326]/65" : "text-white/75"
            }`}
          >
            {card.label}
          </p>

          <h3
            className={`mt-3 font-[family-name:var(--font-dm-serif)] text-[2rem] font-normal leading-[1.06] tracking-[-0.025em] ${
              isDarkText ? "text-[#252326]" : "text-white"
            }`}
          >
            {card.title.replace("\n", " ")}
          </h3>

          <p
            className={`mt-5 text-[0.95rem] leading-7 ${
              isDarkText ? "text-[#252326]/85" : "text-white/90"
            }`}
          >
            {card.description}
          </p>
        </div>

        <span
          className={`w-fit rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
            isDarkText
              ? "border-[#750B1B]/20 bg-[#FAF9F6]/40 text-[#750B1B]"
              : "border-white/25 bg-white/15 text-white"
          }`}
        >
          {card.stat}
        </span>
      </div>
    </button>
  );
}

export default function MartiniDesignPrinciples() {
  return (
    <section
      id="principles"
      data-cursor="design"
      className="mx-auto bg-[var(--martini-paper)] px-5 py-16 sm:px-6 sm:py-20 lg:py-32"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="max-w-[52rem]"
        >
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-[var(--martini-oxblood)]">
            Design Principles
          </p>

          <h2 className="mt-4 font-[family-name:var(--font-dm-serif)] text-[clamp(2.8rem,5.2vw,6rem)] font-normal leading-[0.98] tracking-[-0.045em] text-[var(--martini-ink)]">
            Its usually the little
            <span className="italic text-[var(--martini-oxblood)]">
              {" "}
              things.
            </span>
          </h2>

          <p className="mt-6 max-w-[42rem] text-[0.98rem] leading-8 text-[var(--text-secondary)] sm:text-[1.04rem]">
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
          className="
            -mx-5 mt-10 flex snap-x snap-mandatory
            gap-4 overflow-x-auto px-5 pb-4
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:-mx-6 sm:px-6
            md:mx-0 md:mt-14 md:grid
            md:grid-cols-3 md:overflow-visible
            md:px-0 md:pb-0 lg:gap-5
          "
        >
          {cards.map((card) => (
            <PrincipleCard key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
