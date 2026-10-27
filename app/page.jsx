import Hero from "./components/sections/Hero";
import Proof from "./components/sections/Proof";
import Work from "./components/sections/Work";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <Work />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
