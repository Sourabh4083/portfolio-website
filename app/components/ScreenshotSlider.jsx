"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaExpand, FaTimes } from "react-icons/fa";

const AUTOPLAY_MS = 4500;

const slide = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

function Arrow({ dir, onClick, className = "" }) {
  const Icon = dir < 0 ? FaChevronLeft : FaChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir < 0 ? "Previous screenshot" : "Next screenshot"}
      className={`grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition hover:bg-black/80 ${className}`}
    >
      <Icon className="text-sm" />
    </button>
  );
}

function Lightbox({ shots, index, dir, go, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  const shot = shots[index];

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-mono text-xs text-muted">
          {index + 1} / {shots.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10"
        >
          <FaTimes />
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={shot.src}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 mx-4 sm:mx-20"
          >
            <Image src={shot.src} alt={shot.caption ?? "Screenshot"} fill sizes="100vw" className="object-contain" />
          </motion.div>
        </AnimatePresence>
        {shots.length > 1 && (
          <>
            <Arrow dir={-1} onClick={() => go(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 sm:left-5" />
            <Arrow dir={1} onClick={() => go(1)} className="absolute right-2 top-1/2 -translate-y-1/2 sm:right-5" />
          </>
        )}
      </div>

      <p className="px-4 py-4 text-center text-sm text-gray-300">{shot.caption}</p>
    </motion.div>,
    document.body
  );
}

export default function ScreenshotSlider({ shots, url, title }) {
  const [[index, dir], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);

  const go = useCallback(
    (step) => setState(([i]) => [(i + step + shots.length) % shots.length, step]),
    [shots.length]
  );
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (paused || open || shots.length < 2) return;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, open, go, shots.length]);

  const shot = shots[index];

  return (
    <figure className="mt-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* browser frame */}
      <div className="overflow-hidden rounded-2xl border border-line bg-[#0b0b18] shadow-2xl shadow-cyan-500/5">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          {url && <span className="ml-4 truncate font-mono text-[11px] text-muted">{url.replace(/^https?:\/\//, "")}</span>}
        </div>

        <div className="group relative aspect-[16/10] overflow-hidden">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.button
              key={shot.src}
              type="button"
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(true)}
              aria-label={`Open ${shot.caption ?? "screenshot"} full size`}
              className="absolute inset-0 cursor-zoom-in"
            >
              <Image
                src={shot.src}
                alt={shot.caption ?? `${title} screenshot`}
                fill
                priority={index === 0}
                sizes="(min-width: 896px) 832px, 100vw"
                className="object-contain"
              />
            </motion.button>
          </AnimatePresence>

          <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[11px] text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
            <FaExpand className="text-[10px]" /> Click to enlarge
          </span>

          {shots.length > 1 && (
            <>
              <Arrow dir={-1} onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100" />
              <Arrow dir={1} onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100" />
            </>
          )}
        </div>
      </div>

      <figcaption className="mt-4 flex flex-col items-center gap-3">
        {shots.length > 1 && (
          <div className="flex gap-2">
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Show ${s.caption ?? `screenshot ${i + 1}`}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-accent" : "w-1.5 bg-white/25 hover:bg-white/50"}`}
              />
            ))}
          </div>
        )}
        {shot.caption && <span className="text-center text-sm text-muted">{shot.caption}</span>}
      </figcaption>

      <AnimatePresence>{open && <Lightbox shots={shots} index={index} dir={dir} go={go} onClose={close} />}</AnimatePresence>
    </figure>
  );
}
