import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import DesignHighlights from "@/components/sections/DesignHighlights";
import Contact from "@/components/sections/Contact";

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