"use client";

import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { skills } from "../../data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-32">
      <SectionHeading
        index="03"
        label="Skills"
        title="The toolkit"
        intro="End to end: interfaces people enjoy using, backends that keep data correct, and the tests and automation that keep both working."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <motion.div
            key={s.group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="rounded-2xl border border-line bg-surface p-6 hover:border-white/20 transition-colors"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">{s.group}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.items.map((item) => (
                <span key={item} className="rounded-lg bg-white/[0.05] px-2.5 py-1.5 text-sm text-gray-200">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
