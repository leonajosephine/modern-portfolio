"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const gradients = {
  default:
    "radial-gradient(circle, var(--cursor-glow-inner) 0%, var(--cursor-glow-middle) 38%, transparent 72%)",

  hero:
    "radial-gradient(circle, rgba(196,181,253,0.72) 0%, rgba(251,146,60,0.58) 42%, transparent 74%)",

  nav:
    "radial-gradient(circle, var(--cursor-nav-inner) 0%, var(--cursor-nav-middle) 44%, transparent 74%)",

  theme:
    "radial-gradient(circle, rgba(143,199,255,0.68) 0%, rgba(255,201,214,0.48) 44%, transparent 76%)",

  design:
    "radial-gradient(circle, rgba(255,170,85,0.72) 0%, rgba(203,222,244,0.55) 42%, transparent 74%)",
} as const;

type GradientVariant = keyof typeof gradients;

type MartiniVariant =
  | "martini"
  | "martini-view"
  | "martini-explore";

type CursorType =
  | GradientVariant
  | MartiniVariant
  | "plain";

export default function GradientCursor() {
  const [variant, setVariant] =
    useState<CursorType>("default");

  const [isVisible, setIsVisible] =
    useState(false);

  const [isPointer, setIsPointer] =
    useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* ------------------------------------------------------------------ */
  /* Main cursor                                                        */
  /* ------------------------------------------------------------------ */

  const cursorX = useSpring(mouseX, {
    stiffness: 520,
    damping: 38,
    mass: 0.4,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 520,
    damping: 38,
    mass: 0.4,
  });

  /* ------------------------------------------------------------------ */
  /* Glow trail                                                         */
  /* ------------------------------------------------------------------ */

  const trailX = useSpring(mouseX, {
    stiffness: 120,
    damping: 26,
    mass: 0.9,
  });

  const trailY = useSpring(mouseY, {
    stiffness: 120,
    damping: 26,
    mass: 0.9,
  });

  useEffect(() => {
    const handleMouseMove = (
      event: MouseEvent
    ) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      setIsVisible(true);

      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        setVariant("default");
        setIsPointer(false);
        return;
      }

      const cursorArea =
        target.closest<HTMLElement>(
          "[data-cursor]"
        );

      const clickable = target.closest(
        "a, button, [role='button'], input, select, textarea, summary"
      );

      const requestedVariant =
        cursorArea?.dataset.cursor;

      setIsPointer(Boolean(clickable));

      if (requestedVariant === "plain") {
        setVariant("plain");
        return;
      }

      if (
        requestedVariant === "martini" ||
        requestedVariant ===
          "martini-view" ||
        requestedVariant ===
          "martini-explore"
      ) {
        setVariant(requestedVariant);
        return;
      }

      if (
        requestedVariant &&
        requestedVariant in gradients
      ) {
        setVariant(
          requestedVariant as GradientVariant
        );
        return;
      }

      setVariant("default");
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleWindowBlur = () => {
      setIsVisible(false);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    window.addEventListener(
      "blur",
      handleWindowBlur
    );

    document.documentElement.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );

      window.removeEventListener(
        "blur",
        handleWindowBlur
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, [mouseX, mouseY]);

  /* ------------------------------------------------------------------ */
  /* Cursor modes                                                       */
  /* ------------------------------------------------------------------ */

  const isPlain =
    variant === "plain";

  const isMartini =
    variant === "martini" ||
    variant === "martini-view" ||
    variant === "martini-explore";

  const isMartiniAction =
    variant === "martini-view" ||
    variant === "martini-explore";

  const isCompact =
    variant === "default" ||
    variant === "plain";

  const shouldReactToPointer =
    isPointer &&
    !isPlain &&
    !isMartini;

  const gradient =
    variant !== "plain" &&
    !isMartini
      ? gradients[
          variant as GradientVariant
        ]
      : gradients.default;

  const martiniLabel =
    variant === "martini-view"
      ? "VIEW"
      : variant === "martini-explore"
        ? "EXPLORE"
        : "";

  /* ------------------------------------------------------------------ */
  /* Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed inset-0
        z-[9999]
        hidden
        md:block
      "
    >
      {/* =============================================================== */}
      {/* STANDARD GLOW CURSOR                                            */}
      {/* =============================================================== */}

      {!isMartini && (
        <>
          {/* Soft trailing glow */}
          <motion.div
            className="
              absolute
              rounded-full
              blur-3xl
            "
            style={{
              x: trailX,
              y: trailY,

              width: isCompact
                ? 58
                : 150,

              height: isCompact
                ? 58
                : 150,

              translateX: "-50%",
              translateY: "-50%",

              background: gradient,

              willChange:
                "transform, opacity",
            }}
            animate={{
              opacity: isVisible
                ? isCompact
                  ? isPlain
                    ? 0.22
                    : 0.42
                  : 0.68
                : 0,

              scale:
                shouldReactToPointer
                  ? 1.3
                  : 1,
            }}
            transition={{
              opacity: {
                duration: 0.2,
              },

              scale: {
                duration: 0.25,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              },
            }}
          />

          {/* Main cursor */}
          <motion.div
            className="
              absolute
              rounded-full
              border
              backdrop-blur-sm
            "
            style={{
              x: cursorX,
              y: cursorY,

              width: isCompact
                ? 16
                : 42,

              height: isCompact
                ? 16
                : 42,

              translateX: "-50%",
              translateY: "-50%",

              borderColor:
                "var(--cursor-border)",

              background: isCompact
                ? "var(--cursor-main)"
                : gradient,

              boxShadow: isCompact
                ? "0 0 18px var(--cursor-shadow)"
                : "0 0 42px var(--cursor-shadow)",

              willChange:
                "transform, opacity",
            }}
            animate={{
              opacity: isVisible
                ? 1
                : 0,

              scale:
                shouldReactToPointer
                  ? 1.22
                  : 1,
            }}
            transition={{
              opacity: {
                duration: 0.15,
              },

              scale: {
                duration: 0.2,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              },
            }}
          />

          {/* Center dot */}
          <motion.div
            className="
              absolute
              rounded-full
            "
            style={{
              x: cursorX,
              y: cursorY,

              width: 3,
              height: 3,

              translateX: "-50%",
              translateY: "-50%",

              background:
                "var(--cursor-dot)",

              boxShadow:
                "0 0 8px var(--cursor-shadow)",

              willChange:
                "transform, opacity",
            }}
            animate={{
              opacity: isVisible
                ? 1
                : 0,

              scale:
                shouldReactToPointer
                  ? 0.75
                  : 1,
            }}
            transition={{
              duration: 0.15,
            }}
          />
        </>
      )}

      {/* =============================================================== */}
      {/* MARTINI EDITORIAL CURSOR                                        */}
      {/* =============================================================== */}

      {isMartini && (
        <motion.div
          className="
            absolute
            flex
            items-center
            justify-center

            rounded-full
            border
            border-foreground

            bg-foreground
            text-background
          "
          style={{
            x: cursorX,
            y: cursorY,

            translateX: "-50%",
            translateY: "-50%",

            willChange:
              "transform, width, height, opacity",
          }}
          initial={false}
          animate={{
            opacity: isVisible
              ? 1
              : 0,

            width: isMartiniAction
              ? 82
              : 18,

            height: isMartiniAction
              ? 82
              : 18,
          }}
          transition={{
            opacity: {
              duration: 0.15,
            },

            width: {
              type: "spring",
              stiffness: 260,
              damping: 22,
            },

            height: {
              type: "spring",
              stiffness: 260,
              damping: 22,
            },
          }}
        >
          <AnimatePresence mode="wait">
            {isMartiniAction && (
              <motion.span
                key={martiniLabel}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.16,
                }}
                className="
                  font-mono
                  text-[0.52rem]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                "
              >
                {martiniLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}