"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";

const skillGroups = [
  {
    title: "Technical Skills",
    hint: "Core",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Git",
      "HTML",
      "CSS",
      "APIs",
      "Responsive Design",
      "Swift",
      "VR / AR Development",
      "UI / UX Design",
    ],
  },
  {
    title: "Tools",
    hint: "Daily",
    items: [
      "GitHub",
      "Figma",
      "Visual Studio Code",
      "Xcode",
      "Storybook",
      "Vercel",
      "Azure DevOps",
      "Sitecore",
      "Canva",
    ],
  },
  {
    title: "Soft Skills",
    hint: "Collaboration",
    items: [
      "Creative Problem Solving",
      "Communication",
      "Teamwork",
      "Ownership",
      "Fast Learner",
      "Attention to Detail",
      "Reliability",
    ],
  },
  {
    title: "Languages",
    hint: "DE / EN",
    items: ["German (native)", "English (fluent)", "Spanish (basics)"],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative px-5 py-20 sm:px-6 sm:py-24 lg:py-32"
    >
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="max-w-[32rem]"
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-muted-foreground">
              [About]
            </p>

            <h2 className="mt-4 text-[clamp(2.4rem,5vw,5.5rem)] font-medium leading-[0.95] text-foreground">
              Get to
              <span className="font-serif italic"> know </span>
               me.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="max-w-[46rem]"
          >
            <div className="space-y-6 text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
                <p>
                Hi, I’m Leona — a developer and designer passionate about creating refined, intuitive, 
                and dynamic digital products. 
                I love blending technology with aesthetics, focusing on 
                thoughtful interfaces, strong visuals, and attention to detail.
                </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="mt-8"
            >
              Download CV
            </Button>

          </motion.div>
        </div>

        {/* Skill Groups */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-14 grid gap-6 sm:mt-16 lg:mt-20 lg:grid-cols-2"
        >
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-[1.75rem] border border-border bg-card/70 p-6 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-medium text-foreground">
                  {group.title}
                </h3>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {group.hint}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-border bg-background/70 px-3.5 py-2 text-sm text-foreground/90 shadow-sm transition hover:bg-accent hover:text-background"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}