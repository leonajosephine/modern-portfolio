"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import {
  Code2,
  PanelsTopLeft,
  Sparkles,
  Smartphone,
} from "lucide-react";

const focusItems = [
  {
    number: "01",
    title: "Web Development",
    text: "From polished interfaces to complete responsive web experiences.",
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "APIs",
      "Sitecore",
      "Wix",
    ],
    icon: Code2,
  },
  {
    number: "02",
    title: "UI / UX & Product",
    text: "Turning ideas into intuitive products, systems and interactions.",
    tools: [
      "Figma",
      "UI / UX",
      "Prototyping",
      "Design Systems",
      "Accessibility",
    ],
    icon: PanelsTopLeft,
  },
  {
    number: "03",
    title: "Brand & Creative",
    text: "Building visual worlds that give digital products personality.",
    tools: [
      "Branding",
      "Art Direction",
      "Editorial Design",
      "AI Imagery",
      "Motion",
    ],
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Apps & Emerging Tech",
    text: "Exploring mobile, spatial interfaces and new ways to interact.",
    tools: [
      "React Native",
      "Expo",
      "Swift",
      "SwiftUI",
      "visionOS",
      "Supabase",
    ],
    icon: Smartphone,
  },
];

/* -------------------------------------------------------------------------- */
/* Motion                                                                     */
/* -------------------------------------------------------------------------- */

const introContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const introItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function DefaultAbout() {
  const [activeCard, setActiveCard] = useState(0);

  const activeItem = focusItems[activeCard];

  const handleCardClick = (index: number) => {
    if (
      window.matchMedia("(hover: none)").matches
    ) {
      setActiveCard(index);
    }
  };

  return (
    <section
      id="about"
      className="
        relative overflow-hidden
        px-5 py-16
        sm:px-6 sm:py-24
        lg:py-32
      "
    >
      <div className="container">
        {/* ------------------------------------------------------------------ */}
        {/* Intro                                                              */}
        {/* ------------------------------------------------------------------ */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          variants={introContainerVariants}
          className="mx-auto max-w-[980px] text-center"
        >
          <motion.p
            variants={introItemVariants}
            className="
              font-mono text-[0.65rem]
              font-medium uppercase
              tracking-[0.26em]
              text-muted-foreground
              sm:text-[0.72rem]
            "
          >
            A little about me
          </motion.p>

          <motion.h2
            variants={introItemVariants}
            className="
              mx-auto mt-3
              max-w-[820px]
              text-[clamp(2.8rem,14vw,8rem)]
              font-medium uppercase
              leading-[0.86]
              tracking-[-0.075em]
              text-foreground
              sm:mt-5
            "
          >
            About me.
          </motion.h2>

          <motion.p
            variants={introItemVariants}
            className="
              mx-auto mt-5
              max-w-[700px]
              text-[0.9rem] leading-6
              text-muted-foreground

              sm:mt-7
              sm:text-[1.08rem]
              sm:leading-8
            "
          >
            I&apos;m Leona, a developer working across web,
            mobile, product design and visual direction. I love
            taking ideas from an early concept all the way to
            thoughtful, polished digital experiences.
          </motion.p>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* Section label                                                      */}
        {/* ------------------------------------------------------------------ */}

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto mt-10 flex
            max-w-[1120px]
            items-end justify-between
            sm:mt-14
          "
        >
          <p
            className="
              font-sans text-[0.65rem]
              uppercase tracking-[0.24em]
              text-muted-foreground

              sm:text-[0.72rem]
              sm:tracking-[0.26em]
            "
          >
            {"// What I do"}
          </p>

          <p
            className="
              text-[0.62rem]
              uppercase tracking-[0.18em]
              text-muted-foreground/60
              sm:hidden
            "
          >
            Swipe
          </p>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* Focus cards                                                        */}
        {/* ------------------------------------------------------------------ */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          variants={cardContainerVariants}
          className="
            -mx-5 -mt-1
            flex snap-x snap-mandatory
            gap-3 overflow-x-auto
            px-5 pb-3 pt-4

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            sm:mx-auto
            sm:grid
            sm:max-w-[1120px]
            sm:grid-cols-2
            sm:gap-4
            sm:px-0
            sm:pb-0
            sm:pt-4

            lg:grid-cols-4
          "
        >
          {focusItems.map(
            (
              {
                number,
                title,
                text,
                icon: Icon,
              },
              index
            ) => {
              const isActive =
                activeCard === index;

              return (
                <motion.button
                  key={title}
                  type="button"
                  variants={cardVariants}
                  onMouseEnter={() => {
                    if (
                      window.matchMedia(
                        "(hover: hover)"
                      ).matches
                    ) {
                      setActiveCard(index);
                    }
                  }}
                  onFocus={() =>
                    setActiveCard(index)
                  }
                  onClick={() =>
                    handleCardClick(index)
                  }
                  className={`
                    group relative
                    flex min-h-[230px]
                    w-[82vw] max-w-[310px]
                    shrink-0 snap-start
                    flex-col

                    overflow-hidden
                    rounded-[1.4rem]
                    border p-5
                    text-left

                    transition-[transform,background-color,border-color]
                    duration-500

                    hover:-translate-y-1

                    sm:min-h-[250px]
                    sm:w-auto
                    sm:max-w-none
                    sm:shrink
                    sm:rounded-[1.5rem]
                    sm:p-6

                    ${
                      isActive
                        ? "border-foreground/20 bg-card/75"
                        : "border-border bg-card/40 hover:border-foreground/10 hover:bg-card/60"
                    }
                  `}
                >
                  {/* Top */}

                  <div className="flex shrink-0 items-start justify-between gap-5">
                    <span
                      className="
                        font-mono
                        text-[0.65rem]
                        uppercase
                        tracking-[0.22em]
                        text-muted-foreground
                        sm:text-[0.7rem]
                      "
                    >
                      {number}
                    </span>

                    <Icon
                      size={21}
                      strokeWidth={1.5}
                      className={`
                        shrink-0
                        transition-all duration-500

                        ${
                          isActive
                            ? "-rotate-6 text-foreground"
                            : "text-muted-foreground group-hover:-rotate-3 group-hover:text-foreground"
                        }
                      `}
                    />
                  </div>

                  {/* Active marker */}

                  <motion.span
                    initial={false}
                    animate={{
                      width: isActive ? 32 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      mt-5 block h-px
                      shrink-0
                      bg-foreground/50
                    "
                  />

                  {/* Content */}

                  <div className="mt-auto pt-8">
                    <h3
                      className="
                        max-w-[13rem]
                        text-lg font-medium
                        leading-[1.08]
                        tracking-[-0.04em]
                        text-foreground
                        sm:text-xl
                      "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-[0.82rem]
                        leading-5
                        text-muted-foreground

                        sm:text-sm
                        sm:leading-6
                      "
                    >
                      {text}
                    </p>
                  </div>
                </motion.button>
              );
            }
          )}
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* Editorial toolbox                                                  */}
        {/* ------------------------------------------------------------------ */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[1120px]"
        >
          <div
            className="
              mt-7
              border-t border-border/70
              pt-5
              sm:mt-9
              sm:pt-6
            "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.title}
                initial={{
                  opacity: 0,
                  y: 7,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  grid gap-5

                  md:grid-cols-[180px_1fr]
                  md:items-start

                  lg:grid-cols-[220px_1fr]
                "
              >
                {/* Category */}

                <div>
                  <p
                    className="
                      font-mono
                      text-[0.58rem]
                      uppercase
                      tracking-[0.22em]
                      text-muted-foreground/60
                    "
                  >
                    In my toolbox
                  </p>

                  <p
                    className="
                      mt-2
                      text-[0.82rem]
                      font-medium
                      tracking-[-0.02em]
                      text-foreground
                    "
                  >
                    {activeItem.number} /{" "}
                    {activeItem.title}
                  </p>
                </div>

                {/* Skills */}

                <div
                  className="
                    flex flex-wrap
                    items-center
                    gap-x-3 gap-y-2
                    sm:gap-x-4
                  "
                >
                  {activeItem.tools.map(
                    (
                      tool,
                      index
                    ) => (
                      <motion.div
                        key={tool}
                        initial={{
                          opacity: 0,
                          y: 6,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.32,
                          delay:
                            index *
                            0.035,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                        className="flex items-center gap-3 sm:gap-4"
                      >
                        <span
                          className="
                            text-[0.75rem]
                            font-medium
                            uppercase
                            tracking-[0.12em]
                            text-muted-foreground

                            transition-colors
                            duration-300

                            hover:text-foreground

                            sm:text-[0.82rem]
                          "
                        >
                          {tool}
                        </span>

                        {index <
                          activeItem
                            .tools
                            .length -
                            1 && (
                          <span
                            aria-hidden="true"
                            className="
                              h-[3px]
                              w-[3px]
                              rounded-full
                              bg-muted-foreground/35
                            "
                          />
                        )}
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}