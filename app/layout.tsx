import type { Metadata } from "next";
import {
  Inter,
  DM_Serif_Display,
  IBM_Plex_Mono,
  Space_Grotesk,
} from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientCursor from "@/components/GradientCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const serif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://leona-redmann-portfolio.com"
  ),

  title: {
    default:
      "Leona Josephine Redmann | Frontend Developer & UI Designer",
    template: "%s | Leona Redmann",
  },

  description:
    "Portfolio of Leona Redmann – Frontend Developer specializing in React, Next.js, TypeScript and modern UI design. Creating fast, accessible and user-focused digital experiences.",

  applicationName: "Leona Redmann Portfolio",

  authors: [
    {
      name: "Leona Redmann",
    },
  ],

  creator: "Leona Redmann",
  publisher: "Leona Redmann",

  keywords: [
    "Leona Redmann",
    "Frontend Developer",
    "Frontend Engineer",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "UI Design",
    "UX Design",
    "Web Development",
    "Accessibility",
    "Hamburg",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Leona Redmann | Frontend Developer & UI Designer",

    description:
      "Portfolio of Leona Redmann – Frontend Developer specializing in React, Next.js, TypeScript and modern UI design.",

    images: ["/og-image.png"],
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          ${serif.variable}
          ${grotesk.variable}
          ${mono.variable}
        `}
      >
        <Header />
        <GradientCursor />

        {children}

        <Footer />
      </body>
    </html>
  );
}