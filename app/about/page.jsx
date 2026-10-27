import Image from "next/image";
import Experience from "../components/sections/Experience";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";
import { profile } from "../data/portfolio";

export const metadata = {
  title: "About",
  description: profile.summary,
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-20 pb-4 grid gap-10 md:grid-cols-[1fr_2fr] items-center">
        <Image
          src="/profile.jpg"
          width={320}
          height={320}
          alt={profile.name}
          priority
          className="aspect-square w-48 sm:w-64 rounded-3xl border border-line object-cover"
        />
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">About</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            Hi, I&apos;m {profile.name}.
          </h1>
          <p className="mt-5 text-lg text-gray-300 leading-relaxed">{profile.summary}</p>
        </div>
      </section>
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
