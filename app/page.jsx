"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LandingPage() {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const maxParticles = 40;

  // ⭐ Cursor Game Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticle = (x, y) => ({
      x,
      y,
      size: Math.random() * 8 + 2,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      opacity: 1,
    });

    const handleMouseMove = (e) => {
      if (particles.length > maxParticles) particles.shift();
      particles.push(createParticle(e.clientX, e.clientY));
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= 0.01;

        if (p.opacity <= 0) particles.splice(i, 1);

        ctx.fillStyle = `rgba(0, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particles]);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#050510] overflow-hidden text-white px-6">
      {/* ⭐ Background Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.15),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* ⭐ Canvas Mouse Game */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* ⭐ Center Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl max-w-3xl text-center"
      >
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 3 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <Image
            src="/profile.jpg"
            width={180}
            height={180}
            alt="Profile"
            className="rounded-full border-4 border-cyan-400 shadow-xl"
          />
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mt-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Hi, I'm Sourabh Prasad
        </h1>

        <p className="mt-4 text-gray-300 text-lg sm:text-xl">
          Full Stack Developer | Next.js | React | Node | MongoDB
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.1 }}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl font-semibold shadow-lg"
          >
            🚀 See My Projects
          </motion.a>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.1 }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg"
          >
            📩 Contact Me
          </motion.a>
        </div>
      </motion.div>
    </main>
  );
}
