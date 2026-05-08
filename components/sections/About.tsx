"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const focusItems = [
  ["01", "Frontend", "React, Next.js, TypeScript and accessible UI."],
  ["02", "Design", "Editorial layouts, visual systems and UI direction."],
  ["03", "Creative Tech", "Motion, spatial interfaces, AR / VR and experiments."],
  ["04", "App Development", "iOS development with Swift, and hybrid apps with ReactNative."],
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Git",
  "Figma",
  "Storybook",
  "Sitecore",
  "Swift",
  "VR / AR",
  "Responsive Design",
  "UI / UX",
];

function StackTicker() {
  const duplicated = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden border-y border-border py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicated.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="font-mono text-[0.8rem] uppercase tracking-[0.22em] text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-5 py-20 sm:px-6 sm:py-24 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="border-y border-border py-10 sm:py-12 lg:py-16"
        >
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-muted-foreground">
            [About]
          </p>

          <h2 className="mt-6 max-w-[920px] text-[clamp(2.8rem,6vw,6.8rem)] font-medium leading-[0.9] tracking-[-0.065em] text-foreground">            Developer with a
            <span className="font-serif italic"> creative eye</span>
            <br />
            and a love for design.
          </h2>
        </motion.div>

        <div className="grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="max-w-[42rem]"
          >
            <p className="text-[1.05rem] leading-8 text-muted-foreground sm:text-[1.15rem] sm:leading-9">
              Hi, I’m Leona — a developer and designer passionate about creating
              refined, intuitive and dynamic digital products. I like combining
              frontend logic with visual atmosphere: thoughtful interfaces,
              strong composition and small details that make a product feel
              crafted. 
              <br />
              <br />
              I have a background in frontend development, UI/UX design, App development and also with backend logic — and I’m always looking for new challenges.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="secondary" size="lg">
                Download CV
              </Button>
              <a href="#portfolio">
                <Button variant="ghost" size="lg">
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
            className="grid gap-4 sm:grid-cols-2"
          >
            {focusItems.map(([number, title, text]) => (
              <div
                key={title}
                className="group relative flex min-h-[180px] flex-col justify-between rounded-[1.5rem] border border-border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-card/80 sm:min-h-[195px] sm:p-6"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {number}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-foreground/25 transition-colors duration-300 group-hover:bg-foreground" />
                </div>

                <div>
                  <h3 className="text-xl font-medium tracking-[-0.04em] text-foreground">
                    {title}
                  </h3>

                  <p className="mt-2 max-w-[24rem] text-sm leading-6 text-muted-foreground">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.65 }}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-muted-foreground">
              Core Stack
            </p>
            <p className="hidden font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground/70 sm:block">
              continuously evolving
            </p>
          </div>

          <StackTicker />
        </motion.div>
      </div>
    </section>
  );
}