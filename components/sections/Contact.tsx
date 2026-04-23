"use client";

import { useCallback } from "react";

export default function Contact() {
  const onContact = useCallback(() => {
    const email = "leona.redmann@gmx.net";
    const subject = "Portfolio Inquiry";
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailto;
  }, []);

  return (
    <section
      id="contact"
      className="px-5 py-20 sm:px-6 sm:py-24 lg:py-32"
    >
      <div className="container">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-muted-foreground">
            Contact
          </p>

          <h2 className="mt-4 text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.05em] text-foreground">
            Let’s build something
            <span className="font-serif italic"> meaningful</span>
          </h2>

          <p className="mt-6 text-[1rem] leading-8 text-muted-foreground sm:text-[1.05rem]">
            Have a project in mind or just want to connect?  
            I’m always open to new ideas, collaborations and creative challenges.
          </p>

          <div className="mt-10">
            <button
              onClick={onContact}
              className="
                inline-flex items-center justify-center
                rounded-full border border-border
                bg-card px-8 py-3
                text-sm font-medium text-foreground
                transition
                hover:bg-muted hover:border-white/15
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
              "
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}