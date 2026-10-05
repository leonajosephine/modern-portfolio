"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/leona-redmann-388900233?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    label: "GitHub",
    href: "https://github.com/leonajosephine",
  },
];

export default function MartiniContact() {
  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        px-5
        pb-10
        pt-24

        sm:px-6
        sm:pt-32

        lg:pt-40
      "
    >
      <div className="container">
        <div className="mx-auto max-w-[1240px]">

          {/* Intro */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
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
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p
              className="
                font-mono
                text-[0.55rem]
                uppercase
                tracking-[0.2em]
                text-muted-foreground
              "
            >
              Contact
            </p>

            <div
              className="
                mt-10
                grid
                gap-10

                sm:mt-14

                lg:grid-cols-12
                lg:items-end
                lg:gap-8
              "
            >
              <div className="lg:col-span-8">
                <h2
                  className="
                    max-w-[850px]

                    font-display
                    text-[clamp(3.8rem,8vw,8rem)]
                    font-medium
                    leading-[0.86]
                    tracking-[-0.07em]
                    text-foreground
                  "
                >
                  Have something
                  <br />
                  in mind?
                </h2>
              </div>

              <div
                className="
                  lg:col-span-3
                  lg:col-start-10
                  lg:pb-2
                "
              >
                <p
                  className="
                    max-w-[300px]
                    text-sm
                    leading-7
                    text-muted-foreground

                    sm:text-[0.95rem]
                  "
                >
                  Have a project, an idea or
                  something worth exploring?
                  I&apos;d love to hear about it.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mail */}

          <motion.a
            href="mailto:leona.redmann@gmx.net?subject=Portfolio%20Inquiry"
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
              amount: 0.5,
            }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              group

              mt-16
              flex
              items-center
              justify-between
              gap-6

              border-y
              border-foreground/20

              py-6

              sm:mt-20
              sm:py-8

              lg:mt-28
            "
          >
            <span
              className="
                break-all

                text-[clamp(1.15rem,3vw,2.4rem)]
                font-medium
                tracking-[-0.045em]
                text-foreground
              "
            >
              leona.redmann@gmx.net
            </span>

            <span
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center

                rounded-full
                border
                border-foreground/25

                transition-all
                duration-300

                group-hover:border-foreground
                group-hover:bg-foreground
                group-hover:text-background

                sm:h-12
                sm:w-12
              "
            >
              <ArrowUpRight
                size={18}
                strokeWidth={1.4}
                className="
                  transition-transform
                  duration-300

                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </span>
          </motion.a>

          {/* Bottom */}

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
              delay: 0.15,
            }}
            className="
              flex
              flex-col
              gap-6
              pt-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-1.5

                    font-mono
                    text-[0.53rem]
                    uppercase
                    tracking-[0.15em]
                    text-muted-foreground

                    transition-colors
                    duration-300

                    hover:text-foreground
                  "
                >
                  {link.label}

                  <ArrowUpRight
                    size={11}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-300

                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </a>
              ))}
            </div>

            <span
              className="
                font-mono
                text-[0.5rem]
                uppercase
                tracking-[0.16em]
                text-muted-foreground/60
              "
            >
              Hamburg · Germany
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}