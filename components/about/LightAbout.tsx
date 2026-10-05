"use client";

import {
  motion,
  type Variants,
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

/* -------------------------------------------------------------------------- */
/* Motion                                                                     */
/* -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
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

/* -------------------------------------------------------------------------- */
/* Light About                                                                */
/* -------------------------------------------------------------------------- */

export default function LightAbout() {
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
      <div className="container">
        <div className="mx-auto max-w-[1240px]">

          {/* ---------------------------------------------------------------- */}
          {/* Section header                                                   */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              items-center
              justify-between
              border-b
              border-foreground
              pb-3
            "
          >
            <p
              className="
                font-mono
                text-[0.58rem]
                font-medium
                uppercase
                tracking-[0.2em]
                text-foreground
                sm:text-[0.65rem]
              "
            >
              About / 01
            </p>

            <p
              className="
                hidden
                font-mono
                text-[0.58rem]
                uppercase
                tracking-[0.18em]
                text-muted-foreground
                sm:block
              "
            >
              Developer · Designer
            </p>
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* Intro                                                            */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            variants={containerVariants}
            className="
              grid
              gap-10
              border-b
              border-border
              py-10

              sm:py-12

              lg:grid-cols-12
              lg:gap-8
              lg:py-14
            "
          >
            <motion.div
              variants={itemVariants}
              className="
                lg:col-span-7
              "
            >
              <h2
                className="
                  max-w-[800px]

                  font-display
                  text-[clamp(3rem,8vw,7rem)]
                  font-medium
                  uppercase
                  leading-[0.86]
                  tracking-[-0.075em]
                  text-foreground
                "
              >
                Developer &
                <br />
                Designer.
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="
                flex
                items-end

                lg:col-span-4
                lg:col-start-9
              "
            >
              <div className="max-w-[390px]">
                <p
                  className="
                    text-[0.95rem]
                    leading-7
                    text-muted-foreground

                    sm:text-[1.05rem]
                    sm:leading-8
                  "
                >
                  I work across web, mobile,
                  product design and visual
                  direction — taking ideas from
                  early concepts to thoughtful,
                  polished digital experiences.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* Disciplines                                                      */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            variants={containerVariants}
          >
            {focusItems.map((item) => (
              <motion.div
                key={item.number}
                variants={itemVariants}
                className="
                  group
                  relative
                  grid
                  gap-5
                  overflow-hidden
                  border-b
                  border-border
                  py-7
                  px-4

                  sm:py-9

                  lg:grid-cols-12
                  lg:gap-8
                  lg:py-10
                "
              >
                {/* Hover background */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0

                    origin-left
                    scale-x-0

                    bg-foreground

                    transition-transform
                    duration-[550ms]
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    group-hover:scale-x-100
                  "
                />

                {/* Number */}

                <div
                  className="
                    relative
                    z-10

                    lg:col-span-1
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[0.58rem]
                      uppercase
                      tracking-[0.18em]
                      text-muted-foreground

                      transition-colors
                      duration-300

                      group-hover:text-background/55
                    "
                  >
                    {item.number}
                  </span>
                </div>

                {/* Title */}

                <div
                  className="
                    relative
                    z-10

                    lg:col-span-4
                  "
                >
                  <h3
                    className="
                      max-w-[300px]

                      font-display
                      text-[1.65rem]
                      font-medium
                      leading-[0.95]
                      tracking-[-0.055em]
                      text-foreground

                      transition-[color,transform]
                      duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:translate-x-2
                      group-hover:text-background

                      sm:text-[2rem]
                    "
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Description */}

                <div
                  className="
                    relative
                    z-10

                    lg:col-span-3
                  "
                >
                  <p
                    className="
                      max-w-[300px]

                      text-[0.82rem]
                      leading-6
                      text-muted-foreground

                      transition-colors
                      duration-300

                      group-hover:text-background/65

                      sm:text-sm
                    "
                  >
                    {item.text}
                  </p>
                </div>

                {/* Tools */}

                <div
                  className="
                    relative
                    z-10

                    lg:col-span-4
                  "
                >
                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-x-2.5
                      gap-y-1.5
                    "
                  >
                    {item.tools.map(
                      (tool, index) => (
                        <div
                          key={tool}
                          className="
                            flex
                            items-center
                            gap-2.5
                          "
                        >
                          <span
                            className="
                              font-mono
                              text-[0.58rem]
                              uppercase
                              tracking-[0.1em]
                              text-muted-foreground

                              transition-colors
                              duration-300

                              group-hover:text-background/70
                            "
                          >
                            {tool}
                          </span>

                          {index <
                            item.tools.length - 1 && (
                            <span
                              aria-hidden="true"
                              className="
                                h-[2px]
                                w-[2px]
                                rounded-full

                                bg-muted-foreground/40

                                transition-colors
                                duration-300

                                group-hover:bg-background/35
                              "
                            />
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* Bottom                                                           */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="
              flex
              items-center
              justify-between
              pt-4
            "
          >
            <span
              className="
                font-mono
                text-[0.5rem]
                uppercase
                tracking-[0.18em]
                text-muted-foreground/60
              "
            >
              Hamburg · Germany
            </span>

            <span
              className="
                font-mono
                text-[0.5rem]
                uppercase
                tracking-[0.18em]
                text-muted-foreground/60
              "
            >
              04 disciplines
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}