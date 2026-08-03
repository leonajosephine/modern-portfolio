"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Code,
  Layout,
  Globe,
  Smartphone,
  Download,
  ArrowUpRight,
} from "lucide-react";

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

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function About() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-24 lg:py-32"
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="mx-auto max-w-[980px] text-center"
        >
          <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.26em] text-muted-foreground sm:text-[0.72rem]">
            Skills
          </p>

          <h2 className="mx-auto mt-3 max-w-[820px] text-[clamp(2.8rem,14vw,8rem)] font-medium uppercase leading-[0.86] tracking-[-0.075em] text-foreground sm:mt-5">
            About me.
          </h2>

          <p className="mx-auto mt-5 max-w-[640px] text-[0.9rem] leading-6 text-muted-foreground sm:mt-7 sm:text-[1.08rem] sm:leading-8">
            I’m Leona, a creative developer with a strong eye for thoughtful
            interfaces, visual systems and digital products that feel both
            functional and crafted.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2.5 sm:mt-8 sm:gap-3">
            {/*<Button
              variant="secondary"
              size="lg"
              className="h-10 rounded-full px-4 text-xs sm:h-11 sm:px-6 sm:text-sm"
            >
              Download CV
            </Button>*/}

            <a href="#portfolio">
              <Button
                variant="accent"
                size="lg"
                className="h-10 rounded-full px-4 text-xs sm:h-11 sm:px-6 sm:text-sm"
              >
                View Projects
              </Button>
            </a>
          </div>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-[1120px] items-end justify-between sm:mt-14">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground sm:text-[0.72rem] sm:tracking-[0.26em]">
            {"// Skills"}
          </p>

          <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground/60 sm:hidden">
            Swipe
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={cardContainerVariants}
          className="
            -mx-5 mt-2 flex snap-x snap-mandatory gap-3
            overflow-x-auto px-5 pb-3
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:mx-auto sm:grid sm:max-w-[1120px]
            sm:grid-cols-2 sm:gap-4 sm:px-0 sm:pb-0
            lg:grid-cols-4
          "
        >
          {focusItems.map(
            ({ number, title, text, tools, icon: Icon }, index) => {
              const isActive = activeCard === index;

              return (
                <motion.button
                  key={title}
                  type="button"
                  onClick={() =>
                    setActiveCard(isActive ? null : index)
                  }
                  variants={cardVariants}
                  className="
                    group relative min-h-[205px]
                    w-[82vw] max-w-[310px] shrink-0 snap-start
                    overflow-hidden rounded-[1.4rem]
                    border border-border bg-card/45
                    p-5 text-left
                    transition-all duration-500
                    hover:-translate-y-1 hover:bg-card/80
                    sm:min-h-[230px] sm:w-auto sm:max-w-none
                    sm:shrink sm:rounded-[1.5rem] sm:p-6
                  "
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground sm:text-[0.7rem] sm:tracking-[0.24em]">
                      {number}
                    </span>

                    <Icon
                      size={21}
                      className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:h-[23px] sm:w-[23px]"
                    />
                  </div>

                  <div className="mt-10 sm:mt-16">
                    <h3 className="text-lg font-medium tracking-[-0.04em] text-foreground sm:text-xl">
                      {title}
                    </h3>

                    <p className="mt-2 text-[0.82rem] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                      {text}
                    </p>
                  </div>

                  <div
                    className={`
                      flex flex-wrap gap-1.5 overflow-hidden
                      transition-all duration-500 sm:gap-2
                      lg:max-h-0 lg:opacity-0
                      lg:group-hover:mt-5
                      lg:group-hover:max-h-32
                      lg:group-hover:opacity-100
                      ${
                        isActive
                          ? "mt-4 max-h-32 opacity-100"
                          : "mt-0 max-h-0 opacity-0"
                      }
                    `}
                  >
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="
                          rounded-full border border-border
                          bg-background/60 px-2.5 py-1
                          text-[0.58rem] uppercase tracking-[0.13em]
                          text-muted-foreground
                          sm:px-3 sm:text-[0.68rem]
                          sm:tracking-[0.16em]
                        "
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            }
          )}
        </motion.div>
      </div>
    </section>
  );
}