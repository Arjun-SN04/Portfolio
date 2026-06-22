import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1440px] pb-20 relative">
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Achievements />
      <Contact />
    </div>
  );
}
