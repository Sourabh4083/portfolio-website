"use client";

import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { experience } from "../../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-32">
      <SectionHeading index="02" label="Experience" title="Where I've been building" />

      <ol className="relative border-l border-line ml-2 space-y-12">
        {experience.map((job, i) => (
          <motion.li
            key={job.role + job.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-8 sm:pl-10"
          >
            <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-ink bg-gradient-to-br from-accent to-accent-2" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-lg font-semibold text-white">
                {job.role} <span className="text-muted font-normal">· {job.company}</span>
              </h3>
              <span className="font-mono text-xs text-muted">{job.period}</span>
            </div>
            <ul className="mt-3 space-y-2 text-gray-300 leading-relaxed">
              {job.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-accent/70">▹</span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
