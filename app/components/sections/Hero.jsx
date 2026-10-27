"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowDown, FaFileAlt } from "react-icons/fa";
import { profile } from "../../data/portfolio";
import { openCommandPalette } from "../openCommandPalette";

const MAX_PARTICLES = 24;

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % profile.rotating.length), 2400);
    return () => clearInterval(id);
  }, []);

  // cursor trail + spotlight that follows the mouse
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];
    let animationFrame;

    const resizeCanvas = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      section.style.setProperty("--mx", `${x}px`);
      section.style.setProperty("--my", `${y}px`);
      if (particles.length >= MAX_PARTICLES) particles.shift();
      particles.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        speedX: Math.random() - 0.5,
        speedY: Math.random() - 0.5,
        opacity: 0.8,
        hue: Math.random() > 0.5 ? "34, 211, 238" : "167, 139, 250",
      });
    };
    section.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // loop backwards so removing an item doesn't skip the next one
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= 0.012;
        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(${p.hue}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      section.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[calc(100svh-4rem)] flex items-center"
    >
      {/* background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent-2/15 blur-[140px]" />
      <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[140px]" />
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 40%), rgba(34,211,238,0.07), transparent 40%)",
        }}
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 py-20 grid gap-14 md:grid-cols-[1.4fr_1fr] items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for full-time roles
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-mono text-sm text-muted"
          >
            Hi, I&apos;m {profile.name} · {profile.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-white"
          >
            {profile.headline}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 flex flex-wrap items-baseline gap-x-2 text-lg sm:text-xl text-muted"
          >
            Currently shipping
            <span className="relative inline-flex h-[1.6em] overflow-hidden align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent font-medium"
                >
                  {profile.rotating[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-gray-200 transition"
            >
              View my work
              <FaArrowDown className="text-xs transition-transform group-hover:translate-y-0.5" />
            </Link>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold text-white hover:border-white/25 transition"
            >
              <FaFileAlt className="text-xs" /> Resume
            </a>
            <button
              onClick={openCommandPalette}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-3 text-sm text-muted hover:text-white transition"
            >
              or press <kbd className="font-mono rounded bg-white/10 px-1.5 py-0.5 text-xs">Ctrl K</kbd>
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto w-56 sm:w-72"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/40 to-accent-2/40 blur-2xl opacity-60" />
          <div className="relative rounded-[2rem] border border-line bg-surface p-2 rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/profile.jpg"
              width={320}
              height={320}
              alt={profile.name}
              priority
              className="aspect-square w-full rounded-[1.6rem] object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-6 rounded-xl border border-line bg-[#0b0b18]/90 px-3 py-2 font-mono text-xs text-gray-300 shadow-xl backdrop-blur">
            <span className="text-accent">●</span> {profile.location}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
