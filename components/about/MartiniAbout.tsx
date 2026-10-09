"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

const focusItems = [
  { number: "01", title: "Web Development", text: "From polished interfaces to complete responsive web experiences.", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "APIs", "Sitecore", "Wix"] },
  { number: "02", title: "UI / UX & Product", text: "Turning ideas into intuitive products, systems and interactions.", tools: ["Figma", "UI / UX", "Prototyping", "Design Systems", "Accessibility"] },
  { number: "03", title: "Brand & Creative", text: "Building visual worlds that give digital products personality.", tools: ["Branding", "Art Direction", "Editorial Design", "AI Imagery", "Motion"] },
  { number: "04", title: "Apps & Emerging Tech", text: "Exploring mobile, spatial interfaces and new ways to interact.", tools: ["React Native", "Expo", "Swift", "SwiftUI", "visionOS", "Supabase"] },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function MartiniAbout() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="about" className="relative overflow-hidden bg-[var(--martini-paper)] py-24 text-[var(--martini-ink)] sm:py-28 lg:py-36">
      <div className="container">
        <div className="mx-auto max-w-[1240px]">
          <div className="border-t border-[#252326]/20 pt-4 font-mono text-[0.58rem] uppercase tracking-[0.17em]">
            <span className="text-[var(--martini-oxblood)]">01 / About</span>
          </div>

          <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease }} className="lg:col-span-5">
              <h2 className="max-w-[520px] font-serif text-[clamp(3.5rem,6.4vw,6.4rem)] leading-[0.99] tracking-[-0.055em]">
                A little<br /><span className="italic">about me.</span>
              </h2>
              <p className="mt-9 max-w-[420px] text-[0.98rem] leading-[1.9] text-[#625E5C]">
                I&apos;m a developer and designer based in Hamburg. I love bringing ideas to life through thoughtful design, clean code and a little creative curiosity.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.12, duration: 0.8, ease }} className="lg:col-span-7">
              <div className="mb-5 flex justify-between font-mono text-[0.59rem] uppercase tracking-[0.17em] text-[#625E5C]">
                <span>What I do</span><span>01 — 04</span>
              </div>
              <div className="border-t border-[#252326]/25">
                {focusItems.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div key={item.number} className="border-b border-[#252326]/15">
                      <button
                        type="button"
                        aria-expanded={isActive}
                        aria-controls={`martini-discipline-${index}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(isActive ? null : index)}
                        className="group grid w-full grid-cols-[28px_minmax(0,1fr)_24px] items-center gap-3 py-6 text-left sm:grid-cols-[38px_minmax(0,1fr)_28px] sm:py-8"
                      >
                        <span className="font-mono text-[0.59rem] text-[var(--martini-oxblood)]/65">{item.number}</span>
                        <span className={`font-serif text-[clamp(1.55rem,3vw,2.65rem)] leading-[1.1] tracking-[-0.04em] transition-[color,transform] duration-300 ${isActive ? "translate-x-1 italic text-[var(--martini-oxblood)]" : "group-hover:translate-x-1 group-hover:text-[var(--martini-oxblood)]"}`}>
                          {item.title}
                        </span>
                        <motion.span animate={{ rotate: isActive ? 45 : 0 }} transition={{ duration: 0.25 }} className="justify-self-end text-[var(--martini-oxblood)]" aria-hidden="true"><Plus size={21} strokeWidth={1.3} /></motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div id={`martini-discipline-${index}`} key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease }} className="overflow-hidden">
                            <div className="pb-8 pl-[41px] pr-3 sm:pl-[54px]">
                              <p className="max-w-[440px] text-sm leading-7 text-[#625E5C]">{item.text}</p>
                              <div className="mt-5 flex flex-wrap gap-2">
                                {item.tools.map((tool) => (
                                  <span key={tool} className="rounded-[3px] bg-[var(--martini-blue)] px-3 py-1.5 text-[0.69rem] font-medium tracking-[-0.01em] text-[#28425C]">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex justify-between font-mono text-[0.55rem] uppercase tracking-[0.12em] text-[#625E5C]/70">
                <span>Hover or tap to explore</span><span>{activeIndex === null ? "00" : focusItems[activeIndex].number} / 04</span>
              </div>
            </motion.div>
          </div>

          <div className="mt-24 flex justify-end border-t border-[#252326]/15 pt-5 lg:mt-32">
            <a href="#portfolio" className="group inline-flex items-center gap-2 text-xs font-medium text-[var(--martini-oxblood)] transition-opacity hover:opacity-70">
              Explore my work <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
