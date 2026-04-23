"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (ref.current) setWidth(ref.current.offsetWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

type RowProps = {
  text: string;
  reverse?: boolean;
  velocity: number;
  className?: string;
};

function VelocityRow({
  text,
  reverse = false,
  velocity,
  className = "",
}: RowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  const baseDirection = reverse ? -1 : 1;
  const directionFactor = useRef(baseDirection);

  function wrap(min: number, max: number, v: number) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  useAnimationFrame((_, delta) => {
    if (copyWidth === 0) return;

    const velocityValue = velocityFactor.get();

    if (velocityValue < 0) {
      directionFactor.current = -baseDirection;
    } else if (velocityValue > 0) {
      directionFactor.current = baseDirection;
    }

    let moveBy = directionFactor.current * velocity * (delta / 1000);
    moveBy += directionFactor.current * Math.abs(moveBy) * Math.abs(velocityValue);

    baseX.set(baseX.get() + moveBy);
  });

  const minCopies = 8;
  const dynamicCopies =
    copyWidth > 0
      ? Math.max(minCopies, Math.ceil((window.innerWidth * 2) / copyWidth) + 2)
      : minCopies;

  const items = Array.from({ length: dynamicCopies }, (_, i) => (
    <span
      key={i}
      ref={i === 0 ? copyRef : null}
      className={`shrink-0 ${className}`}
    >
      {reverse ? <span className="text-outline">{text}&nbsp;</span> : <>{text}&nbsp;</>}
    </span>
  ));

  return (
    <div className="relative flex w-full overflow-hidden py-1">
      <motion.div className="flex whitespace-nowrap will-change-transform" style={{ x }}>
        {items}
      </motion.div>
    </div>
  );
}

type ScrollVelocityProps = {
  texts: string[];
  velocity?: number;
  className?: string;
};

export function ScrollVelocity({
  texts,
  velocity = 90,
  className = "",
}: ScrollVelocityProps) {
  const first = texts[0] ?? "";
  const second = texts[1] ?? first;

  return (
    <div className="w-full">
      <VelocityRow text={first} velocity={velocity} className={className} />
      <VelocityRow text={second} velocity={velocity} reverse className={className} />
    </div>
  );
}

export default ScrollVelocity;