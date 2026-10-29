"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";

// phases: idle -> cover (color bursts out of the click point) -> hold (navigate under the color) -> reveal (color is sucked into the navbar ".dev")
const TransitionContext = createContext({ start: () => {} });

export const usePageTransition = () => useContext(TransitionContext);

const EASE = [0.65, 0, 0.35, 1];
// easeInBack: swells a touch, then accelerates into the logo with no slow tail
const SUCK_EASE = [0.6, -0.28, 0.735, 0.045];
const SUCK_DURATION = 1;

const GRADIENT = "linear-gradient(135deg, #67e8f9, var(--color-accent) 45%, var(--color-accent-2))";

// radius that reaches the farthest corner of the viewport from a point
const coverRadius = (x, y) =>
  Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

export function PageTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState({ phase: "idle" });
  const radius = useMotionValue(0);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const clipPath = useMotionTemplate`circle(${radius}px at ${cx}px ${cy}px)`;

  const start = useCallback(
    ({ href, x, y, label }) => {
      if (state.phase !== "idle") return;
      if (reduceMotion) {
        router.push(href);
        return;
      }
      // the color gets sucked back into the ".dev" in the navbar logo
      const target = document.querySelector("[data-transition-target]")?.getBoundingClientRect();
      const tx = target ? target.left + target.width / 2 : window.innerWidth / 2;
      const ty = target ? target.top + target.height / 2 : window.innerHeight / 2;
      cx.set(x);
      cy.set(y);
      radius.set(0);
      setState({ phase: "cover", href, r: coverRadius(x, y), tx, ty, tr: coverRadius(tx, ty), label });
    },
    [state.phase, reduceMotion, router, radius, cx, cy]
  );

  // once the new route has rendered under the color, jump to top and lift the overlay
  useEffect(() => {
    if (state.phase !== "hold") return;
    if (pathname !== state.href) {
      const fallback = setTimeout(() => setState((s) => ({ ...s, phase: "reveal" })), 4000);
      return () => clearTimeout(fallback);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = setTimeout(() => setState((s) => ({ ...s, phase: "reveal" })), 250);
    return () => clearTimeout(t);
  }, [state.phase, state.href, pathname]);

  // the circle is driven by plain motion values (JS, every frame) instead of animating clipPath directly:
  // framer hands clipPath to WAAPI and leaves the old full-screen value on the element for one frame at
  // the end, which showed up as a full-color flash after the suck
  useEffect(() => {
    const { phase } = state;
    if (phase !== "cover" && phase !== "reveal") return;
    let cancelled = false;
    const controls =
      phase === "cover"
        ? animate(radius, state.r, { duration: 0.55, ease: EASE })
        : animate(radius, 0, { duration: SUCK_DURATION, ease: SUCK_EASE });
    controls.then(() => {
      if (cancelled) return;
      if (phase === "reveal") {
        setState({ phase: "idle" });
        return;
      }
      // re-centre the (already full-screen) circle on ".dev" so reveal can shrink straight into it
      cx.set(state.tx);
      cy.set(state.ty);
      radius.set(state.tr);
      router.push(state.href);
      setState((s) => ({ ...s, phase: "hold" }));
    });
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [state, radius, cx, cy, router]);

  useEffect(() => {
    if (state.phase === "idle") return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [state.phase]);

  const { phase, label } = state;

  return (
    <TransitionContext.Provider value={{ start }}>
      {children}
      {phase !== "idle" && (
        <div aria-hidden="true" className="fixed inset-0 z-[100]">
          <motion.div className="absolute inset-0" style={{ background: GRADIENT, clipPath }} />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.span
              className="px-6 text-center text-3xl font-semibold tracking-tight text-[#031018] sm:text-5xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={phase === "reveal" ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
              transition={{ duration: phase === "reveal" ? 0.25 : 0.35, delay: phase === "cover" ? 0.25 : 0, ease: EASE }}
            >
              {label}
            </motion.span>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  );
}
