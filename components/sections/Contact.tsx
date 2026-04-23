"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Flower } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming Button is imported from a local file

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

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
      ref={ref}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[720px] text-center"
        >
          {/* Section Title */}
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

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Email Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={onContact}
                className="inline-flex items-center gap-2"
              >
                <Mail size={20} />
                leona.redmann@gmx.net
              </Button>
            </motion.div>

            {/* Phone Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button
                variant="secondary"
                size="lg"
                className="inline-flex items-center gap-2"
              >
                <Phone size={20} />
                +49 173 158 32 46
              </Button>
            </motion.div>
          </div>

          {/* LinkedIn */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8"
          >
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              <Flower size={20} />
              Connect on LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}