"use client";

import { useEffect, useState } from "react";
import {
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
type CursorType = GradientVariant | "plain";

export default function GradientCursor() {
  const [variant, setVariant] =
    useState<CursorType>("default");

  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /*
   * Main cursor
   * Fast and responsive.
   */
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

  /*
   * Glow trail
   * Slightly slower for the soft trailing effect.
   */
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
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      setIsVisible(true);

      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        setVariant("default");
        setIsPointer(false);
        return;
      }

      const cursorArea = target.closest<HTMLElement>(
        "[data-cursor]"
      );

      const clickable = target.closest(
        "a, button, [role='button'], input, select, textarea, summary"
      );

      const requestedVariant =
        cursorArea?.dataset.cursor;

      setIsPointer(Boolean(clickable));

      /*
       * "plain" is intentionally handled separately
       * because it doesn't have a gradient.
       */
      if (requestedVariant === "plain") {
        setVariant("plain");
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

  /*
   * Both default and plain use the compact cursor.
   *
   * Difference:
   * default can react to clickable elements,
   * plain deliberately stays quiet.
   */
  const isPlain = variant === "plain";
  const isCompact =
    variant === "default" || variant === "plain";

  const shouldReactToPointer =
    isPointer && !isPlain;

  const gradient =
    variant !== "plain"
      ? gradients[variant]
      : gradients.default;

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none fixed inset-0
        z-[9999] hidden md:block
      "
    >
      {/* Soft trailing glow */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          x: trailX,
          y: trailY,

          width: isCompact ? 58 : 150,
          height: isCompact ? 58 : 150,

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

          scale: shouldReactToPointer
            ? 1.3
            : 1,
        }}
        transition={{
          opacity: {
            duration: 0.2,
          },

          scale: {
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
      />

      {/* Main cursor */}
      <motion.div
        className="
          absolute rounded-full
          border backdrop-blur-sm
        "
        style={{
          x: cursorX,
          y: cursorY,

          width: isCompact ? 16 : 42,
          height: isCompact ? 16 : 42,

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
          opacity: isVisible ? 1 : 0,

          scale: shouldReactToPointer
            ? 1.22
            : 1,
        }}
        transition={{
          opacity: {
            duration: 0.15,
          },

          scale: {
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
      />

      {/* Center dot */}
      <motion.div
        className="absolute rounded-full"
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
          opacity: isVisible ? 1 : 0,

          scale: shouldReactToPointer
            ? 0.75
            : 1,
        }}
        transition={{
          duration: 0.15,
        }}
      />
    </div>
  );
}