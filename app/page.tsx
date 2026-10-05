import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Portfolio from "@/components/sections/Portfolio";
import DesignHighlights from "@/components/sections/DesignHighlights";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Portfolio />
      <DesignHighlights />
      <Contact />
    </main>
  );
}