"use client";

import { AnimatePresence, motion } from "framer-motion";

import { usePortfolioTheme } from "@/hooks/usePortfolioTheme";

import EditorialHero from "@/components/hero/EditorialHero";
import SwissHero from "@/components/hero/SwissHero";
import MartiniHero from "@/components/hero/MartiniHero";
import FluidHero from "@/components/hero/FluidHero";

export default function Hero() {
  const theme = usePortfolioTheme();

  const heroes = {
    dark: EditorialHero,
    light: SwissHero,
    sunset: MartiniHero,
    ocean: FluidHero,
  };

  const ActiveHero = heroes[theme];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <ActiveHero />
      </motion.div>
    </AnimatePresence>
  );
}