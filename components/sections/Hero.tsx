"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/content/profile";
import { useSmoothScrollTo } from "@/components/providers/SmoothScroll";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import MaskText from "@/components/motion/MaskText";
import InkParticles from "@/components/motion/InkParticles";
import InkFlowCanvas from "@/components/motion/InkFlowCanvas";
import InkFigure from "@/components/motion/InkFigure";

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
      data-parallax-scene
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Living ink-wash landscape */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* Flowing ink, rendered on the GPU */}
        <InkFlowCanvas className="absolute inset-0 h-full w-full" />

        {/* Lone figure, emerging from the mist (faint on mobile, full on sm+) */}
        <ParallaxLayer
          speed={0.82}
          className="absolute bottom-[9%] right-[3%] h-[40%] w-[46%] max-w-[200px] opacity-40 sm:bottom-[10%] sm:right-[11%] sm:h-[54%] sm:w-[38%] sm:max-w-[290px] sm:opacity-100"
          aria-hidden
        >
          <div
            className="mx-auto h-full w-full"
            style={{
              maskImage: "linear-gradient(to bottom, #000 74%, transparent 98%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 74%, transparent 98%)",
            }}
          >
            <InkFigure className="mx-auto block h-full w-auto text-fg" />
          </div>
        </ParallaxLayer>

        {/* Fine drifting flecks for foreground texture */}
        <InkParticles className="absolute inset-0" />

        {/* Legibility wash beneath the text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(102deg, color-mix(in srgb, var(--bg) 78%, transparent) 0%, color-mix(in srgb, var(--bg) 34%, transparent) 44%, transparent 66%)",
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
