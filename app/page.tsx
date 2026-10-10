import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Portfolio from "@/components/portfolio/Portfolio";
import DesignPrinciples from "@/components/designPrinciples/DesignPrinciples";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Portfolio />
      <DesignPrinciples />
      <Contact />
    </main>
  );
}