"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code, Layout, Globe, Smartphone } from "lucide-react";

const focusItems = [
  {
    number: "01",
    title: "Frontend",
    text: "Building clean, accessible and responsive interfaces.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind"],
    icon: Code,
  },
  {
    number: "02",
    title: "Design",
    text: "Creating visual systems with a strong sense for layout.",
    tools: ["Figma", "UI/UX", "Design Systems", "Editorial"],
    icon: Layout,
  },
  {
    number: "03",
    title: "Creative Tech",
    text: "Exploring motion, spatial interfaces and digital experiences.",
    tools: ["Framer Motion", "AR / VR", "3D", "Prototyping"],
    icon: Globe,
  },
  {
    number: "04",
    title: "App Development",
    text: "Developing iOS and hybrid apps with thoughtful interaction.",
    tools: ["Swift", "SwiftUI", "React Native", "Mobile UI"],
    icon: Smartphone,
  },
];

export default function About() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="relative px-5 py-20 sm:px-6 sm:py-24 lg:py-32"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[980px] text-center"
        >
          <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            [About me]
          </p>

          <h2 className="mx-auto mt-5 max-w-[820px] text-[clamp(3rem,7vw,8rem)] font-medium uppercase leading-[0.86] tracking-[-0.075em] text-foreground">
            About me.
          </h2>

          <p className="mx-auto mt-7 max-w-[640px] text-[1rem] leading-8 text-muted-foreground sm:text-[1.08rem]">
            I’m Leona, a creative developer with a strong eye for thoughtful
            interfaces, visual systems and digital products that feel both
            functional and crafted.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="secondary" size="lg" className="rounded-full">
              Download CV
            </Button>

            <a href="#portfolio">
              <Button variant="accent" size="lg" className="rounded-full">
                View Projects
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="mx-auto mt-14 grid max-w-[1120px] gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {focusItems.map(({ number, title, text, tools, icon: Icon }, index) => {
            const isActive = activeCard === index;

            return (
              <button
                key={title}
                type="button"
                onClick={() =>
                  setActiveCard(isActive ? null : index)
                }
                className="group relative min-h-[230px] overflow-hidden rounded-[1.5rem] border border-border bg-card/45 p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:bg-card/80 sm:p-6"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                    {number}
                  </span>

                  <Icon
                    size={23}
                    className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                  />
                </div>

                <div className="mt-16">
                  <h3 className="text-xl font-medium tracking-[-0.04em] text-foreground">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {text}
                  </p>
                </div>

                <div
                  className={`mt-5 flex flex-wrap gap-2 overflow-hidden transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:opacity-100 ${
                    isActive ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}