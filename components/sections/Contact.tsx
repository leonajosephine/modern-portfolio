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
    <section id="contact" className="px-5 pt-20 pb-12 sm:px-6 sm:pt-24 lg:pt-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[860px] text-center"
        >
          {/* Section Title */}
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-muted-foreground">
            Contact
          </p>

          <h2 className="mx-auto mt-4 text-[clamp(2.8rem,6vw,6.8rem)] font-medium leading-[0.9] tracking-[-0.065em] text-foreground">
            Let’s create something
            <span className="font-serif italic"> meaningful</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[540px] text-[1rem] leading-8 text-muted-foreground sm:text-[1.08rem]">
            Have a project in mind, a collaboration idea or just want to say hi?
            I’d love to hear from you. I’m always open to new ideas, collaborations and creative challenges.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
                    : "border-border bg-transparent text-foreground hover:border-foreground hover:bg-foreground/10 "
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}