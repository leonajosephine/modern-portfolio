"use client";

import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="px-5 pb-12 pt-16 sm:px-6">
      <div className="container">
        <div className="border-t border-border pt-8">

          {/* Top Row */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

            {/* Name / Brand */}
            <p className="text-sm text-muted-foreground">
              LJR 🐬
            </p>

            {/* Icon Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition hover:scale-105 hover:bg-muted"
                aria-label="GitHub"
              >
                <FaGithub size={18} className="text-muted-foreground transition group-hover:text-foreground" />
              </a>

              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition hover:scale-105 hover:bg-muted"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} className="text-muted-foreground transition group-hover:text-foreground" />
              </a>

              <a
                href="mailto:leona.redmann@gmx.net"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition hover:scale-105 hover:bg-muted"
                aria-label="Email"
              >
                <Mail size={18} className="text-muted-foreground transition group-hover:text-foreground" />
              </a>
            </div>
          </div>

          {/* Optional: secondary contact */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Leona Josephine Redmann. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}