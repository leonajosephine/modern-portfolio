
"use client";

import { useSyncExternalStore } from "react";

type GalleryLayout = "bento" | "editorial";

function getGalleryLayout(): GalleryLayout {
  const theme =
    document.documentElement.getAttribute("data-theme") ??
    document.body.getAttribute("data-theme") ??
    document.querySelector("[data-theme]")?.getAttribute("data-theme");

  return theme === "light" || theme === "sunset"
    ? "editorial"
    : "bento";
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);

  observer.observe(document.documentElement, {
    subtree: true,
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => observer.disconnect();
}

export function useGalleryLayout(): GalleryLayout {
  return useSyncExternalStore(subscribe, getGalleryLayout, () => "bento");
}
