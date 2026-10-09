"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/leona-redmann-388900233?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
  { label: "GitHub", href: "https://github.com/leonajosephine" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function MartiniContact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--martini-blue)] py-24 text-[var(--martini-oxblood)] sm:py-28 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex items-center justify-between gap-4 border-t border-[#750B1B]/25 pt-4 font-mono text-[0.58rem] uppercase tracking-[0.16em]">
            <span>03 / Contact</span><span className="text-[#28425C]/70">Open for collaborations</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.85, ease }} className="mx-auto flex max-w-[850px] flex-col items-center py-20 text-center sm:py-24 lg:py-28">
            <p className="mb-8 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#28425C]">Have an idea in mind?</p>
            <h2 className="font-serif text-[clamp(3.7rem,8vw,8.2rem)] leading-[0.97] tracking-[-0.06em]">
              Let&apos;s make<br /><span className="italic">something good.</span>
            </h2>
            <p className="mt-8 max-w-[440px] text-[0.95rem] leading-8 text-[#28425C] sm:text-base">
              A website, a digital product or something entirely new? I&apos;d love to hear what you have in mind.
            </p>
            <a href="mailto:leona.redmann@gmx.net?subject=Portfolio%20Inquiry" className="group mt-10 inline-flex min-h-14 items-center justify-center gap-5 rounded-2xl bg-[var(--martini-oxblood)] px-8 py-4 text-sm font-medium text-white transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-[#580715] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--martini-oxblood)]">
              Get in touch <ArrowUpRight size={18} strokeWidth={1.7} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="mailto:leona.redmann@gmx.net" className="mt-5 text-xs text-[#28425C] underline decoration-[#28425C]/35 underline-offset-4 transition-colors hover:text-[var(--martini-oxblood)]">leona.redmann@gmx.net</a>
          </motion.div>

          <div className="flex flex-col gap-5 border-t border-[#750B1B]/25 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-7">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[#28425C] transition-colors hover:text-[var(--martini-oxblood)]">
                  {link.label}<ArrowUpRight size={12} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#28425C]/75">Hamburg · Germany</span>
          </div>
        </div>
      </div>
    </section>
  );
}
