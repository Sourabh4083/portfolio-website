"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ index, label, title, intro }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 max-w-2xl"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {index} <span className="text-muted">/ {label}</span>
      </p>
      <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">{title}</h2>
      {intro && <p className="mt-4 text-muted leading-relaxed">{intro}</p>}
    </motion.div>
  );
}
