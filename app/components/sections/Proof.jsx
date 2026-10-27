"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiVercel,
  SiVitest,
  SiSupabase,
  SiFramer,
  SiN8N,
} from "react-icons/si";
import { stats } from "../../data/portfolio";

const tech = [
  [SiNextdotjs, "Next.js"],
  [SiReact, "React"],
  [SiTypescript, "TypeScript"],
  [SiNodedotjs, "Node.js"],
  [SiPostgresql, "PostgreSQL"],
  [SiPrisma, "Prisma"],
  [SiMongodb, "MongoDB"],
  [SiExpress, "Express"],
  [SiTailwindcss, "Tailwind"],
  [SiFramer, "Framer Motion"],
  [SiSupabase, "Supabase"],
  [SiVitest, "Vitest"],
  [SiVercel, "Vercel"],
  [SiN8N, "n8n"],
];

function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Proof() {
  return (
    <section className="border-y border-line bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="font-mono text-4xl sm:text-5xl font-semibold text-white">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative overflow-hidden border-t border-line py-6 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 pr-12 hover:[animation-play-state:paused]">
          {[...tech, ...tech].map(([Icon, name], i) => (
            <div key={i} className="flex items-center gap-2.5 text-muted hover:text-white transition-colors" aria-hidden={i >= tech.length}>
              <Icon className="text-xl" />
              <span className="text-sm whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
