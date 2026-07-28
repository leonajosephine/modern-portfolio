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

type CursorType = keyof typeof gradients;

export default function GradientCursor() {
  const [variant, setVariant] =
    useState<CursorType>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

      const nextVariant = cursorArea?.dataset
        .cursor as CursorType | undefined;

      setIsPointer(Boolean(clickable));

      setVariant(
        nextVariant && nextVariant in gradients
          ? nextVariant
          : "default"
      );
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("blur", handleWindowBlur);

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

  const isDefault = variant === "default";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
    >
      {/* Soft trailing glow */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          x: trailX,
          y: trailY,
          width: isDefault ? 58 : 150,
          height: isDefault ? 58 : 150,
          translateX: "-50%",
          translateY: "-50%",
          background: gradients[variant],
          willChange: "transform, opacity",
        }}
        animate={{
          opacity: isVisible
            ? isDefault
              ? 0.42
              : 0.68
            : 0,
          scale: isPointer ? 1.3 : 1,
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

      {/* Main glass cursor */}
      <motion.div
        className="absolute rounded-full border backdrop-blur-sm"
        style={{
          x: cursorX,
          y: cursorY,
          width: isDefault ? 16 : 42,
          height: isDefault ? 16 : 42,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--cursor-border)",
          background: isDefault
            ? "var(--cursor-main)"
            : gradients[variant],
          boxShadow: isDefault
            ? "0 0 18px var(--cursor-shadow)"
            : "0 0 42px var(--cursor-shadow)",
          willChange: "transform, opacity",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 1.22 : 1,
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

      {/* Small center dot for contrast */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: 3,
          height: 3,
          translateX: "-50%",
          translateY: "-50%",
          background: "var(--cursor-dot)",
          boxShadow: "0 0 8px var(--cursor-shadow)",
          willChange: "transform, opacity",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 0.75 : 1,
        }}
        transition={{
          duration: 0.15,
        }}
      />
    </div>
  );
}