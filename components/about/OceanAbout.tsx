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
    accent:
      "var(--ocean-lavender)",
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
    accent:
      "var(--ocean-blue)",
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
    accent:
      "var(--ocean-pink)",
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
    accent:
      "var(--ocean-peach)",
  },
];

export default function OceanAbout() {
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

        bg-[var(--ocean-surface-soft)]

        px-4 py-16
        sm:px-6 sm:py-24
        lg:py-32

        text-[var(--ocean-indigo-deep)]
      "
    >
      <div className="container">
        <div className="mx-auto max-w-[1240px]">

          {/* ================================================================ */}
          {/* INTRO                                                            */}
          {/* ================================================================ */}

          <motion.div
            initial={{
              opacity: 0,
              y: 22,
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
              duration: 0.75,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              grid
              gap-8

              md:grid-cols-[1fr_0.7fr]
              md:items-end

              lg:gap-16
            "
          >
            <div>
              <p
                className="
                  font-mono
                  text-[0.58rem]
                  uppercase
                  tracking-[0.2em]
                  text-[var(--ocean-indigo-deep)]/45
                "
              >
                A little about me
              </p>

              <h2
                className="
                    mt-4
                    max-w-[820px]

                    font-sans
                    text-[clamp(2rem,6vw,4rem)]
                    font-medium
                    leading-[0.9]
                    tracking-[-0.05em]
                "
                >
                Curious by nature.
                <br />
                Always making.
                </h2>
            </div>

            <div
              className="
                max-w-[430px]

                md:justify-self-end
              "
            >
              <p
                className="
                  text-[0.92rem]
                  leading-7
                  text-[var(--ocean-indigo-deep)]/60

                  sm:text-[1.02rem]
                  sm:leading-8
                "
              >
                I&apos;m Leona, a
                developer working across
                web, mobile, product
                design and visual
                direction. I like taking
                ideas apart, shaping
                them, and turning them
                into thoughtful digital
                experiences.
              </p>
            </div>
          </motion.div>

          {/* ================================================================ */}
          {/* PLAYGROUND                                                       */}
          {/* ================================================================ */}

          <div
            className="
              relative
              mt-12

              overflow-hidden
              rounded-[2.25rem]

              border
              border-[var(--ocean-glass-border)]

              bg-[var(--ocean-surface-lavender)]

              p-3

              sm:mt-16
              sm:rounded-[3rem]
              sm:p-4

              lg:mt-20
              lg:min-h-[600px]
              lg:p-6
            "
          >
            {/* Background decorations */}

            <div
              aria-hidden
              className="
                pointer-events-none
                absolute
                -right-20
                -top-24
                h-72
                w-72
                rounded-full

                bg-[var(--ocean-blue)]
                opacity-35
                blur-[80px]
              "
            />

            <div
              aria-hidden
              className="
                pointer-events-none
                absolute
                -bottom-28
                left-[20%]
                h-80
                w-80
                rounded-full

                bg-[var(--ocean-pink)]
                opacity-25
                blur-[90px]
              "
            />

            <div
              className="
                relative
                grid
                gap-3

                lg:min-h-[550px]
                lg:grid-cols-[0.9fr_1.1fr]
                lg:gap-5
              "
            >
              {/* ============================================================ */}
              {/* DISCIPLINES                                                  */}
              {/* ============================================================ */}

              <div
                className="
                  flex
                  flex-col
                  gap-2
                "
              >
                {focusItems.map(
                  (
                    item,
                    index
                  ) => {
                    const isActive =
                      index ===
                      activeIndex;

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
                        whileHover={{
                          x: 4,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className={`
                          group
                          relative

                          flex
                          items-center
                          justify-between

                          overflow-hidden

                          rounded-[1.5rem]

                          px-4
                          py-4

                          text-left

                          transition-colors
                          duration-300

                          sm:px-5
                          sm:py-5

                          ${
                            isActive
                              ? "bg-[var(--ocean-indigo-deep)] text-[var(--ocean-surface-soft)]"
                              : "bg-[rgba(255,255,255,0.34)] text-[var(--ocean-indigo-deep)] hover:bg-[rgba(255,255,255,0.55)]"
                          }
                        `}
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-4
                          "
                        >
                          <span
                            className={`
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center

                              rounded-full

                              font-mono
                              text-[0.5rem]

                              ${
                                isActive
                                  ? "bg-white/10"
                                  : "bg-white/50"
                              }
                            `}
                          >
                            {
                              item.number
                            }
                          </span>

                          <span
                            className="
                              text-[1.05rem]
                              font-medium
                              tracking-[-0.035em]

                              sm:text-xl
                            "
                          >
                            {item.title}
                          </span>
                        </div>

                        <motion.span
                          animate={{
                            rotate:
                              isActive
                                ? 45
                                : 0,
                          }}
                          className="
                            text-lg
                            opacity-60
                          "
                        >
                          +
                        </motion.span>
                      </motion.button>
                    );
                  }
                )}
              </div>

              {/* ============================================================ */}
              {/* ACTIVE PANEL                                                 */}
              {/* ============================================================ */}

              <div
                className="
                  relative
                  min-h-[390px]
                  overflow-hidden

                  rounded-[1.75rem]

                  bg-[var(--ocean-glass-strong)]

                  p-6

                  shadow-[var(--ocean-glass-shadow)]

                  backdrop-blur-xl

                  sm:min-h-[430px]
                  sm:p-8

                  lg:min-h-0
                  lg:rounded-[2.5rem]
                  lg:p-10
                "
              >
                <AnimatePresence
                  mode="wait"
                >
                  <motion.div
                    key={
                      activeItem.number
                    }
                    initial={{
                      opacity: 0,
                      y: 14,
                      scale: 0.985,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.99,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="
                      flex
                      h-full
                      flex-col
                    "
                  >
                    {/* Blob */}

                    <motion.div
                      key={`${activeItem.number}-blob`}
                      initial={{
                        scale: 0.75,
                        rotate: -8,
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                      }}
                      transition={{
                        duration: 0.65,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      style={{
                        background:
                          activeItem.accent,
                      }}
                      className="
                        absolute
                        -right-12
                        -top-14

                        h-52
                        w-52

                        rounded-[42%_58%_62%_38%/48%_40%_60%_52%]

                        opacity-55
                        blur-[1px]

                        sm:h-64
                        sm:w-64
                      "
                    />

                    {/* Meta */}

                    <div
                      className="
                        relative
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className="
                          font-mono
                          text-[0.52rem]
                          uppercase
                          tracking-[0.18em]
                          text-[var(--ocean-indigo-deep)]/45
                        "
                      >
                        Discipline
                      </span>

                      <span
                        className="
                          font-mono
                          text-[0.52rem]
                          uppercase
                          tracking-[0.18em]
                          text-[var(--ocean-indigo-deep)]/45
                        "
                      >
                        {activeItem.number} /
                        04
                      </span>
                    </div>

                    {/* Content */}

                    <div
                      className="
                        relative
                        mt-auto
                        pt-24
                      "
                    >
                      <h3
                        className="
                          max-w-[520px]

                          font-display
                          text-[clamp(2.5rem,6vw,5.5rem)]
                          font-medium
                          leading-[0.86]
                          tracking-[-0.07em]
                        "
                      >
                        {
                          activeItem.title
                        }
                      </h3>

                      <p
                        className="
                          mt-5
                          max-w-[430px]

                          text-sm
                          leading-6
                          text-[var(--ocean-indigo-deep)]/60

                          sm:text-base
                          sm:leading-7
                        "
                      >
                        {activeItem.text}
                      </p>

                      <div
                        className="
                          mt-7
                          flex
                          flex-wrap
                          gap-2
                        "
                      >
                        {activeItem.tools.map(
                          (
                            tool,
                            index
                          ) => (
                            <motion.span
                              key={tool}
                              initial={{
                                opacity: 0,
                                scale:
                                  0.92,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              transition={{
                                delay:
                                  index *
                                  0.035,
                              }}
                              className="
                                rounded-full

                                border
                                border-[var(--ocean-glass-border)]

                                bg-white/35

                                px-3
                                py-2

                                font-mono
                                text-[0.52rem]
                                uppercase
                                tracking-[0.1em]

                                backdrop-blur-md
                              "
                            >
                              {tool}
                            </motion.span>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* FOOT NOTE                                                        */}
          {/* ================================================================ */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between

              px-1

              font-mono
              text-[0.5rem]
              uppercase
              tracking-[0.16em]
              text-[var(--ocean-indigo-deep)]/35
            "
          >
            <span>
              Explore the disciplines
            </span>

            <span>
              01 — 04
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}