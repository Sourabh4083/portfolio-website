import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between text-sm text-muted">
        <div>
          <p className="text-white font-medium">{profile.name}</p>
          <p className="mt-1">
            Built with Next.js, Tailwind & Framer Motion. Press{" "}
            <kbd className="font-mono rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-gray-300">Ctrl K</kbd>{" "}
            to explore.
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a href={`mailto:${profile.email}`} className="hover:text-white transition">{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-lg hover:text-white transition"><FaGithub /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-lg hover:text-white transition"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
}
