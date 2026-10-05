"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

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
  },
];

export default function MartiniAbout() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const activeItem =
    focusItems[activeIndex];

  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        px-5 py-20
        sm:px-6 sm:py-28
        lg:py-36
      "
    >
      {/* Decorative oversized type */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[0.08em]
          top-4

          font-serif
          text-[clamp(8rem,25vw,25rem)]
          italic
          leading-none
          tracking-[-0.08em]
          text-foreground/[0.025]
        "
      >
        02
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-[1240px]">

          {/* Top rule */}

          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            whileInView={{
              opacity: 1,
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              flex
              origin-left
              items-center
              justify-between
              border-t
              border-foreground/25
              pt-3
            "
          >
            <span
              className="
                font-mono
                text-[0.55rem]
                uppercase
                tracking-[0.2em]
                text-muted-foreground
              "
            >
              About / Profile
            </span>

            <span
              className="
                font-serif
                text-sm
                italic
                text-muted-foreground
              "
            >
              Selected disciplines
            </span>
          </motion.div>

          {/* Main layout */}

          <div
            className="
              mt-12
              grid
              gap-16

              lg:mt-20
              lg:grid-cols-[0.9fr_1.1fr]
              lg:gap-20
            "
          >
            {/* ============================================================= */}
            {/* LEFT                                                          */}
            {/* ============================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.8,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                lg:sticky
                lg:top-32
                lg:self-start
              "
            >
                <p
                className="
                  max-w-[480px]

                  font-sans
                  text-[clamp(2.4rem,5vw,5.4rem)]
                  leading-[0.9]
                  tracking-[-0.045em]
                  text-foreground
                "
                >
                Ideas,
                shaped
                into digital
                <br />
                  experiences.
                </p>

              <div
                className="
                  mt-10
                  max-w-[390px]
                  border-l
                  border-foreground/25
                  pl-5

                  sm:mt-12
                "
              >
                <p
                  className="
                    text-[0.9rem]
                    leading-7
                    text-muted-foreground

                    sm:text-base
                    sm:leading-8
                  "
                >
                  I&apos;m Leona, a developer
                  working across web, mobile,
                  product design and visual
                  direction — from early ideas
                  to thoughtful, polished
                  digital experiences.
                </p>
              </div>
            </motion.div>

            {/* ============================================================= */}
            {/* RIGHT                                                         */}
            {/* ============================================================= */}

            <div>
              <p
                className="
                  mb-5
                  font-mono
                  text-[0.55rem]
                  uppercase
                  tracking-[0.22em]
                  text-muted-foreground
                "
              >
                / What I do
              </p>

              <div
                className="
                  border-t
                  border-foreground/25
                "
              >
                {focusItems.map(
                  (
                    item,
                    index
                  ) => {
                    const isActive =
                      activeIndex ===
                      index;

                    return (
                      <motion.button
                        key={item.number}
                        type="button"
                        onMouseEnter={() =>
                          setActiveIndex(
                            index
                          )
                        }
                        onFocus={() =>
                          setActiveIndex(
                            index
                          )
                        }
                        onClick={() =>
                          setActiveIndex(
                            index
                          )
                        }
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
                          amount: 0.4,
                        }}
                        transition={{
                          duration: 0.6,
                          delay:
                            index *
                            0.055,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                        className="
                          group
                          w-full

                          border-b
                          border-foreground/25

                          py-6
                          text-left

                          sm:py-7
                        "
                      >
                        <div
                          className="
                            grid
                            grid-cols-[36px_1fr_auto]
                            items-start
                            gap-3

                            sm:grid-cols-[48px_1fr_auto]
                          "
                        >
                          <span
                            className="
                              pt-1

                              font-mono
                              text-[0.52rem]
                              tracking-[0.18em]
                              text-muted-foreground
                            "
                          >
                            {item.number}
                          </span>

                            <h3
                            className={`
                              font-serif
                              text-[clamp(1.6rem,3.5vw,3.4rem)]
                              leading-[1]
                              tracking-[-0.04em]

                              transition-all
                              duration-500

                              ${
                              isActive
                                ? "translate-x-2 italic text-foreground"
                                : "text-foreground/60 group-hover:text-foreground"
                              }
                            `}
                            >
                            {item.title}
                            </h3>

                          <span
                            className={`
                              pt-1
                              text-lg

                              transition-all
                              duration-500

                              ${
                                isActive
                                  ? "rotate-45 text-foreground"
                                  : "text-muted-foreground"
                              }
                            `}
                          >
                            +
                          </span>
                        </div>

                        <AnimatePresence
                          initial={false}
                        >
                          {isActive && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height:
                                  "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration:
                                  0.45,
                                ease: [
                                  0.22,
                                  1,
                                  0.36,
                                  1,
                                ],
                              }}
                              className="overflow-hidden"
                            >
                              <div
                                className="
                                  ml-[48px]
                                  pt-6

                                  sm:ml-[60px]
                                "
                              >
                                <p
                                  className="
                                    max-w-[440px]
                                    text-sm
                                    leading-6
                                    text-muted-foreground
                                  "
                                >
                                  {
                                    item.text
                                  }
                                </p>

                                <div
                                  className="
                                    mt-5
                                    flex
                                    flex-wrap
                                    gap-x-3
                                    gap-y-2
                                  "
                                >
                                  {item.tools.map(
                                    (
                                      tool,
                                      toolIndex
                                    ) => (
                                      <span
                                        key={
                                          tool
                                        }
                                        className="
                                          flex
                                          items-center
                                          gap-3

                                          font-mono
                                          text-[0.55rem]
                                          uppercase
                                          tracking-[0.12em]
                                          text-muted-foreground
                                        "
                                      >
                                        {
                                          tool
                                        }

                                        {toolIndex <
                                          item
                                            .tools
                                            .length -
                                            1 && (
                                          <span
                                            aria-hidden
                                            className="
                                              h-[2px]
                                              w-[2px]
                                              rounded-full
                                              bg-muted-foreground/50
                                            "
                                          />
                                        )}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  }
                )}
              </div>

              {/* Active editorial footer */}

              <AnimatePresence
                mode="wait"
              >
                <motion.div
                  key={
                    activeItem.number
                  }
                  initial={{
                    opacity: 0,
                    y: 8,
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
                  }}
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between

                    font-mono
                    text-[0.5rem]
                    uppercase
                    tracking-[0.16em]
                    text-muted-foreground/60
                  "
                >
                  <span>
                    Currently viewing
                  </span>

                  <span>
                    {activeItem.number} /
                    04
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}