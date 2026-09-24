"use client";

import { AnimatePresence, motion } from "framer-motion";

import { usePortfolioTheme } from "@/hooks/usePortfolioTheme";

import DarkHero from "@/components/hero/DarkHero";
import LightHero from "@/components/hero/LightHero";
import MartiniHero from "@/components/hero/MartiniHero";
import OceanHero from "@/components/hero/OceanHero";

export default function Hero() {
  const theme = usePortfolioTheme();

  const heroes = {
    dark: DarkHero,
    light: LightHero,
    sunset: MartiniHero,
    ocean: OceanHero,
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