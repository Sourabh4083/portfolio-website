"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-[#050510] text-gray-200 px-6 sm:px-10 py-20 relative overflow-hidden">

      {/* ⭐ Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[140px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* ⭐ Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-5xl font-extrabold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
        >
          About Me
        </motion.h1>

        {/* ⭐ Intro Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl mb-14"
        >
          <p className="text-lg sm:text-xl leading-relaxed text-gray-300 text-center">
            I'm{" "}
            <span className="font-semibold text-cyan-400">
              Sourabh Prasad
            </span>
            , a dedicated{" "}
            <strong className="text-blue-400">Full Stack Developer</strong>{" "}
            who loves crafting modern, fast, and scalable digital experiences.
            I primarily build using{" "}
            <span className="text-cyan-400 font-semibold">Next.js</span>,
            enhanced with powerful backend logic, clean UI, and cloud integrations.
          </p>
        </motion.section>

        {/* ⭐ Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            🚀 Tech Stack
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              "Next.js",
              "React",
              "Node.js",
              "MongoDB",
              "Tailwind CSS",
              "Cloudinary",
              "JWT Auth",
              "REST APIs",
              "Razorpay",
              "Express.js",
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.07 }}
                className="bg-white/10 border border-white/10 py-3 text-center rounded-xl shadow-md text-gray-200"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ⭐ Featured Project */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-4">
            💼 Latest Project: Full-Stack E-commerce Platform
          </h2>

          <p className="leading-relaxed text-gray-300 mb-4">
            I recently developed a complete{" "}
            <strong className="text-cyan-400">
              e-commerce platform
            </strong>{" "}
            using the MERN + Next.js stack. It includes:
          </p>

          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Secure authentication (JWT + HTTP-only cookies)</li>
            <li>Admin dashboard with full product controls</li>
            <li>Razorpay payment gateway integration</li>
            <li>Cloudinary for high-performance image uploads</li>
            <li>Product filtering, sorting & dynamic search</li>
            <li>Order tracking + role-based access</li>
          </ul>

          <Link
            href="/projects"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold shadow-md transition-transform hover:scale-105"
          >
            🔍 Explore Project Details
          </Link>
        </motion.section>

        {/* ⭐ CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 mb-4">
            Want to collaborate or hire me?
          </p>

          <div className="space-x-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-xl hover:bg-cyan-700 transition hover:scale-105"
            >
              📬 Contact Me
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              className="px-6 py-3 border border-cyan-500 text-cyan-400 font-semibold rounded-xl hover:bg-cyan-900/40 transition hover:scale-105"
            >
              📄 Download Resume
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
