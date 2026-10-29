"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { profile, sections } from "../data/portfolio";
import { openCommandPalette } from "./openCommandPalette";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visibleSection, setActive] = useState(null);
  const pathname = usePathname();
  const active = pathname === "/" ? visibleSection : null;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // highlight the section currently in the middle of the viewport
  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-ink/70 backdrop-blur-xl border-b border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex justify-between items-center">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-white">
          sourabh<span data-transition-target className="inline-block text-accent">.dev</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-1 text-sm">
          {sections.map(({ id, label }) => (
            <Link
              key={id}
              href={`/#${id}`}
              className={`relative px-3 py-2 rounded-lg transition-colors ${
                active === id ? "text-white" : "text-muted hover:text-white"
              }`}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-lg bg-white/[0.07]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={openCommandPalette}
            className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs text-muted hover:text-white hover:border-white/20 transition"
            aria-label="Open command palette"
          >
            Search
            <kbd className="font-mono rounded bg-white/10 px-1.5 py-0.5 text-[10px]">Ctrl K</kbd>
          </button>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted hover:text-white transition text-lg">
            <FaGithub />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted hover:text-white transition text-lg">
            <FaLinkedin />
          </a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={openCommandPalette}
            className="rounded-lg border border-line px-2.5 py-1 text-xs text-muted"
            aria-label="Open command palette"
          >
            Search
          </button>
          <button
            className="text-white text-xl w-8"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-line bg-ink/95"
          >
            <div className="px-5 py-5 space-y-1">
              {sections.map(({ id, label }) => (
                <Link
                  key={id}
                  href={`/#${id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-gray-200 hover:bg-white/5"
                >
                  {label}
                </Link>
              ))}
              <div className="flex gap-5 px-3 pt-4 text-xl text-muted">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-accent to-accent-2"
      />
    </nav>
  );
}
