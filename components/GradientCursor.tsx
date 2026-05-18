"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const gradients = {
  default:
    "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 38%, transparent 72%)",

  hero:
    "radial-gradient(circle, rgba(196,181,253,0.72) 0%, rgba(251,146,60,0.58) 42%, transparent 74%)",

  nav:
    "radial-gradient(circle, rgba(255,255,255,0.62) 0%, rgba(168,85,247,0.42) 44%, transparent 74%)",

  theme:
    "radial-gradient(circle, rgba(143,199,255,0.68) 0%, rgba(255,201,214,0.48) 44%, transparent 76%)",

  design:
    "radial-gradient(circle, rgba(255,170,85,0.72) 0%, rgba(203,222,244,0.55) 42%, transparent 74%)",
};

type CursorType = keyof typeof gradients;

export default function GradientCursor() {
  const [variant, setVariant] = useState<CursorType>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Main cursor follows quickly
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

  // Trail follows slower
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

      const target = event.target as HTMLElement;

      const cursorArea = target.closest(
        "[data-cursor]"
      ) as HTMLElement | null;

      const clickable = target.closest("a, button");

      setIsPointer(Boolean(clickable));

      const nextVariant = cursorArea?.dataset
        .cursor as CursorType | undefined;

      setVariant(
        nextVariant && gradients[nextVariant]
          ? nextVariant
          : "default"
      );
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);

    document.documentElement.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden mix-blend-screen md:block">
      {/* TRAIL */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          x: trailX,
          y: trailY,

          width: variant === "default" ? 58 : 150,
          height: variant === "default" ? 58 : 150,

          translateX: "-50%",
          translateY: "-50%",

          background: gradients[variant],
        }}
        animate={{
          opacity: isVisible
            ? variant === "default"
              ? 0.35
              : 0.68
            : 0,

          scale: isPointer ? 1.35 : 1,
        }}
        transition={{
          duration: 0.25,
        }}
      />

      {/* MAIN CURSOR */}
      <motion.div
        className="absolute rounded-full border border-white/20 backdrop-blur-sm"
        style={{
          x: cursorX,
          y: cursorY,

          width: variant === "default" ? 16 : 42,
          height: variant === "default" ? 16 : 42,

          translateX: "-50%",
          translateY: "-50%",

          background:
            variant === "default"
              ? "rgba(255,255,255,0.18)"
              : gradients[variant],

          boxShadow:
            variant === "default"
              ? "0 0 18px rgba(255,255,255,0.18)"
              : "0 0 42px rgba(255,255,255,0.20)",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,

          scale: isPointer ? 1.22 : 1,
        }}
        transition={{
          duration: 0.2,
        }}
      />
    </div>
  );
}