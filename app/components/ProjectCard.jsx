"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { usePageTransition } from "./PageTransition";

// sets --x/--y so the .spotlight border follows the cursor
const trackSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
};

export default function ProjectCard({ project, featured = false, index = 0 }) {
  const hasCaseStudy = Boolean(project.caseStudy);
  const { start: startTransition } = usePageTransition();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseMove={trackSpotlight}
      className={`spotlight group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={`relative block overflow-hidden bg-black/40 ${featured ? "md:w-[58%] aspect-[16/10] md:aspect-auto md:min-h-[380px]" : "aspect-[16/10]"}`}
        aria-label={`${project.title} case study`}
      >
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes={featured ? "(min-width: 768px) 640px, 100vw" : "(min-width: 768px) 520px, 100vw"}
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className={`absolute inset-0 bg-gradient-to-tr ${project.accent} opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-30`} />
      </Link>

      <div className={`flex flex-1 flex-col p-6 sm:p-8 ${featured ? "md:w-[42%]" : ""}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent">{project.badge}</span>
          <span className="font-mono text-[11px] text-muted">{project.period}</span>
        </div>

        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
        <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
        <p className="mt-4 text-gray-300 leading-relaxed">{project.tagline}</p>

        {featured && (
          <ul className="mt-5 space-y-2 text-sm text-gray-300">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-accent">→</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span key={t} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-gray-300">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-5 pt-7 text-sm font-medium">
          <Link
            href={`/projects/${project.slug}`}
            className="btn-3d group/btn"
            onClick={(e) => {
              // let ctrl/cmd/shift/middle clicks open a new tab as usual
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              startTransition({ href: `/projects/${project.slug}`, x: e.clientX, y: e.clientY, label: project.title });
            }}
          >
            <span className="btn-3d-shadow" aria-hidden="true" />
            <span className="btn-3d-edge" aria-hidden="true" />
            <span className="btn-3d-front">
              {hasCaseStudy ? "Read case study" : "Details"}
              <FaArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
            </span>
          </Link>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-white transition">
              Live <FaExternalLinkAlt className="text-[10px]" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
