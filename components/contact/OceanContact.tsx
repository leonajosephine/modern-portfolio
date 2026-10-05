"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
} from "lucide-react";

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

export default function OceanContact() {
  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        bg-[var(--ocean-indigo-deep)]
        px-4 py-4
        text-[var(--ocean-surface-soft)]
        sm:px-6 sm:py-6
      "
    >
      {/* Ambient gradient */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-80
        "
        style={{
          background: `
            radial-gradient(
              circle at 82% 20%,
              rgba(155, 140, 255, 0.42),
              transparent 28%
            ),
            radial-gradient(
              circle at 15% 85%,
              rgba(233, 164, 198, 0.22),
              transparent 32%
            ),
            radial-gradient(
              circle at 65% 90%,
              rgba(169, 212, 255, 0.15),
              transparent 30%
            )
          `,
        }}
      />

      <div
        className="
          container
          relative
          z-10

          flex
          min-h-[82svh]
          flex-col

          rounded-[2rem]

          border
          border-white/10

          px-5
          py-6

          sm:min-h-[78svh]
          sm:rounded-[2.75rem]
          sm:px-8
          sm:py-8

          lg:px-12
          lg:py-10
        "
      >
        {/* Top */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
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
              tracking-[0.2em]
              text-white/45
            "
          >
            Contact / 03
          </span>

          <span
            className="
              hidden
              font-mono
              text-[0.52rem]
              uppercase
              tracking-[0.2em]
              text-white/45
              sm:block
            "
          >
            Open to ideas · collaborations
          </span>
        </motion.div>

        {/* Main */}

        <motion.div
          initial={{
            opacity: 0,
            y: 28,
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
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            my-auto
            py-20
            sm:py-24
          "
        >
          <h2
            className="
              max-w-[1050px]

              font-sans
              text-[clamp(3.6rem,9vw,9rem)]
              font-medium
              leading-[0.84]
              tracking-[-0.075em]
            "
          >
            Let&apos;s make
            <br />
            something great.
          </h2>

          <div
            className="
              mt-10
              grid
              gap-8

              sm:mt-14

              lg:grid-cols-12
              lg:items-end
            "
          >
            <p
              className="
                max-w-[420px]

                text-sm
                leading-7
                text-white/55

                sm:text-base

                lg:col-span-5
              "
            >
              Have a project in mind, a
              collaboration idea or just want
              to say hi? I&apos;d love to hear
              from you.
            </p>

            <div
              className="
                lg:col-span-6
                lg:col-start-7
                lg:flex
                lg:justify-end
              "
            >
              <motion.a
                href="mailto:leona.redmann@gmx.net?subject=Portfolio%20Inquiry"
                whileHover={{
                  scale: 1.025,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group

                  inline-flex
                  min-h-16
                  items-center
                  justify-between
                  gap-10

                  rounded-full

                  bg-[var(--ocean-lime)]

                  px-6
                  py-4

                  text-[var(--ocean-indigo-deep)]

                  sm:min-h-[72px]
                  sm:px-8
                "
              >
                <span
                  className="
                    flex
                    items-center
                    gap-3

                    text-sm
                    font-medium
                    tracking-[-0.02em]

                    sm:text-base
                  "
                >
                  <Mail
                    size={18}
                    strokeWidth={1.6}
                  />

                  Get in touch
                </span>

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.6}
                  className="
                    transition-transform
                    duration-300

                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}

        <div
          className="
            flex
            flex-col
            gap-5

            border-t
            border-white/10

            pt-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <a
            href="mailto:leona.redmann@gmx.net?subject=Portfolio%20Inquiry"
            className="
              text-xs
              text-white/50

              transition-colors
              hover:text-white
            "
          >
            leona.redmann@gmx.net
          </a>

          <div className="flex gap-6">
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
                  text-[0.52rem]
                  uppercase
                  tracking-[0.14em]
                  text-white/45

                  transition-colors
                  hover:text-white
                "
              >
                {link.label}

                <ArrowUpRight
                  size={11}
                  className="
                    transition-transform
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}