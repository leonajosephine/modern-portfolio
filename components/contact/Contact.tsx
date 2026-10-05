"use client";

import DefaultContact from "./DefaultContact";
import LightContact from "./LightContact";
import MartiniContact from "./MartiniContact";
import OceanContact from "./OceanContact";

import { usePortfolioTheme } from "@/hooks/usePortfolioTheme";

export default function Contact() {
  const theme = usePortfolioTheme();

  switch (theme) {
    case "light":
      return <LightContact />;

    case "sunset":
      return <MartiniContact />;

    case "ocean":
      return <OceanContact />;

    default:
      return <DefaultContact />;
  }
}