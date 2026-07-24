"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/content/profile";
import { useSmoothScrollTo } from "@/components/providers/SmoothScroll";
import MaskText from "@/components/motion/MaskText";

// The 3D scene is heavy and WebGL-only — load it client-side, after the text.
const HeroScene = dynamic(() => import("@/components/hero3d/HeroScene"), {
  ssr: false,
});

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const scrollTo = useSmoothScrollTo();
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Living 3D ink-wash landscape */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <HeroScene />
        {/* Legibility wash beneath the text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(102deg, color-mix(in srgb, var(--bg) 80%, transparent) 0%, color-mix(in srgb, var(--bg) 36%, transparent) 44%, transparent 66%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <motion.p
            {...rise(0.05)}
            className="font-mono text-[0.7rem] uppercase tracking-[0.34em] text-fg-subtle"
          >
            {profile.location}
          </motion.p>

          <MaskText
            as="h1"
            lines={["John Peter", "Pestaño"]}
            delay={0.15}
            stagger={0.11}
            className="mt-5 font-display text-[3.5rem] font-light leading-[0.94] tracking-tight text-fg sm:text-8xl lg:text-[8.5rem]"
          />

          <motion.p
            {...rise(0.5)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl"
          >
            {profile.positioning}
          </motion.p>

          <motion.div {...rise(0.65)} className="mt-8 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-seal" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              {profile.availability}
            </span>
          </motion.div>

          <motion.div {...rise(0.8)} className="mt-11 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => scrollTo("#contact", { offset: -72 })}
              className="rounded-full bg-seal px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-opacity duration-500 ease-[var(--ease-settle)] hover:opacity-90"
            >
              Speak with Dusk
            </button>
            <a
              href="/resume.pdf"
              className="group inline-flex items-center gap-2 py-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-muted transition-colors duration-300 hover:text-fg"
            >
              Résumé
              <span
                className="inline-block transition-transform duration-500 ease-[var(--ease-settle)] group-hover:translate-y-0.5"
                aria-hidden="true"
              >
                ↓
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-fg-subtle">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
