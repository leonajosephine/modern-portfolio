"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const contactLinks = [
  {
    label: "Mail",
    href: "mailto:leona.redmann@gmx.net?subject=Portfolio%20Inquiry",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/leona-redmann-388900233?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/leonajosephine",
    icon: FaGithub,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 pt-24 pb-0 sm:px-6 sm:pt-28 lg:pt-36"
    >
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[760px] text-center"
        >
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-muted-foreground">
            Contact
          </p>

          <h2 className="mx-auto mt-4 text-[clamp(2.6rem,5.6vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-foreground">
            Let’s create something
            <span className="font-serif italic"> together</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[520px] text-[1rem] leading-8 text-muted-foreground sm:text-[1.05rem]">
            Have a project in mind, a collaboration idea or just want to say hi?
            I’d love to hear from you.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {contactLinks.map(({ label, href, icon: Icon }, index) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 + index * 0.08, duration: 0.45 }}
                className={`group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full border px-6 text-sm font-medium transition-all duration-300 sm:w-auto ${
                  index === 0
                    ? "border-foreground bg-foreground text-primary-foreground hover:bg-transparent hover:text-foreground"
                    : "border-border bg-transparent text-foreground hover:border-foreground hover:bg-foreground/10"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-20 select-none text-center sm:mt-24 lg:mt-28"
      >
        <p className="whitespace-nowrap text-[clamp(4.8rem,18vw,18rem)] font-semibold uppercase leading-[0.75] tracking-[-0.09em] text-foreground/10">
          Contact
        </p>
      </motion.div>
    </section>
  );
}