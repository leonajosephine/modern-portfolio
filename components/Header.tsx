"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import DefaultHeader from "@/components/header/DefaultHeader";
import OceanHeader from "@/components/header/OceanHeader";
import LightHeader from "@/components/header/LightHeader";

import { usePortfolioTheme } from "@/hooks/usePortfolioTheme";

export type NavItem = {
  label: string;
  href: string;
};

export type HeaderVariantProps = {
  navItems: NavItem[];
  isMenuOpen: boolean;
  isScrolled: boolean;
  closeMenu: () => void;
  toggleMenu: () => void;
};

export const navItems: NavItem[] = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Work",
    href: "#portfolio",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  const headerRef =
    useRef<HTMLElement>(null);

  const theme = usePortfolioTheme();

  const isSwiss = theme === "light";
  const isOcean = theme === "ocean";

  /* ---------------------------------------------------------------------- */
  /* Scroll state                                                           */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 32
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Close menu                                                             */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const handlePointerDown = (
      event: PointerEvent
    ) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Theme change                                                           */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    setIsMenuOpen(false);
  }, [theme]);

  /* ---------------------------------------------------------------------- */
  /* Swiss mobile menu                                                      */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
  
    document.body.style.overflow = "hidden";
  
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(
      (current) => !current
    );
  };

  const variantProps: HeaderVariantProps =
    {
      navItems,
      isMenuOpen,
      isScrolled,
      closeMenu,
      toggleMenu,
    };

  return (
    <header
      ref={headerRef}
      data-cursor="plain"
      className="
        fixed
        inset-x-0
        top-0
        z-50
      "
    >
      {isSwiss ? (
        <LightHeader
          {...variantProps}
        />
      ) : isOcean ? (
        <OceanHeader
          {...variantProps}
        />
      ) : (
        <DefaultHeader
          {...variantProps}
        />
      )}
    </header>
  );
}