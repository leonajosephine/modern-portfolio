
"use client";

import { useGalleryLayout } from "@/components/portfolio/useGalleryLayout";

import DefaultDesignPrinciples from "./DefaultDesignPrinciples";
import MartiniDesignPrinciples from "./MartiniDesignPrinciples";

export default function DesignPrinciples() {
  const layout = useGalleryLayout();

  if (layout === "editorial") {
    return <MartiniDesignPrinciples />;
  }

  return <DefaultDesignPrinciples />;
}
