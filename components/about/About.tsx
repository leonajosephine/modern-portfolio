"use client";

import DefaultAbout from "./DefaultAbout";
import LightAbout from "./LightAbout";
import MartiniAbout from "./MartiniAbout";
import OceanAbout from "./OceanAbout";

import { usePortfolioTheme } from "@/hooks/usePortfolioTheme";

export default function About() {
  const theme = usePortfolioTheme();

  switch (theme) {
    case "dark":
      return <DefaultAbout />;
    case "light":
      return <LightAbout />;
    case "sunset":
      return <MartiniAbout />;
    case "ocean":
      return <OceanAbout />;
    default:
      return <DefaultAbout />;
  } 
}