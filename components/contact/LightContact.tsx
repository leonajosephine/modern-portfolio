
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const links = [
  {
    number: "01",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/leona-redmann-388900233?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    number: "02",
    label: "GitHub",
    href: "https://github.com/leonajosephine",
  },
];

export default function LightContact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:pt-36"
    >
      <div className="container">
        <div className="mx-auto max-w-[1240px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between border-t border-foreground pt-3"
          >
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em]">
              Contact / 03
            </span>

            <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground">
              Hamburg · Germany
            </span>
          </motion.div>

          {/* Main */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-b border-foreground py-14 sm:py-20 lg:py-20"
          >
            <p className="max-w-[1100px] font-sans text-[clamp(3.5rem,8vw,7.5rem)] font-medium uppercase leading-[0.82] tracking-[-0.075em] text-foreground">
              Have an idea?
              <br />
              Let&apos;s talk.
            </p>

            <a
              href="mailto:leona.redmann@gmx.net?subject=Portfolio%20Inquiry"
              className="group mt-12 flex items-end justify-between gap-6 border-t border-border pt-5 sm:mt-16"
            >
              <span className="break-all text-[clamp(1.1rem,3vw,2.3rem)] tracking-[-0.04em] text-foreground">
                leona.redmann@gmx.net
              </span>

              <ArrowUpRight
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
          </motion.div>

          {/* Links */}
          <div className="grid sm:grid-cols-2">
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                }}
                className={`group flex items-center justify-between border-b border-border py-6 ${
                  index === 0
                    ? "sm:border-r sm:pr-8"
                    : "sm:pl-8"
                }`}
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-[0.52rem] text-muted-foreground">
                    {link.number}
                  </span>

                  <span className="text-lg font-medium tracking-[-0.03em]">
                    {link.label}
                  </span>
                </div>

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
