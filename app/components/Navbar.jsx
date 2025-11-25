"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050510]/40 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* ⭐ Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          <Link href="/">Sourabh.</Link>
        </motion.div>

        {/* ⭐ Desktop Menu */}
        <div className="hidden sm:flex space-x-8 text-gray-300 font-medium">
          <motion.div whileHover={{ scale: 1.08 }}>
            <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }}>
            <Link href="/about" className="hover:text-cyan-400 transition">About</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }}>
            <Link href="/projects" className="hover:text-cyan-400 transition">Projects</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }}>
            <Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link>
          </motion.div>
        </div>

        {/* ⭐ Desktop Icons */}
        <div className="hidden sm:flex space-x-5 text-xl">
          <motion.a
            href="https://github.com/Sourabh4083"
            target="_blank"
            whileHover={{ scale: 1.2, color: "#00eaff" }}
            className="text-gray-300 transition"
          >
            <FaGithub />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/sourabh-prasad-58b5541a1/"
            target="_blank"
            whileHover={{ scale: 1.2, color: "#0077ff" }}
            className="text-gray-300 transition"
          >
            <FaLinkedin />
          </motion.a>
        </div>

        {/* ⭐ Mobile Hamburger */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* ⭐ Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:hidden bg-[#050510]/70 backdrop-blur-xl border-t border-white/10 px-6 py-5 space-y-4 text-center"
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-cyan-400 transition"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-cyan-400 transition"
          >
            About
          </Link>
          <Link
            href="/projects"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-cyan-400 transition"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block text-gray-200 text-lg hover:text-cyan-400 transition"
          >
            Contact
          </Link>

          {/* Mobile Icons */}
          <div className="flex justify-center space-x-6 text-xl pt-4">
            <a
              href="https://github.com/Sourabh4083"
              target="_blank"
              className="text-gray-300 hover:text-cyan-400 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/sourabh-prasad-58b5541a1/"
              target="_blank"
              className="text-gray-300 hover:text-blue-500 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
