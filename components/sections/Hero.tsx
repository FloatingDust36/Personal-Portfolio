"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/content/profile";
import { useSmoothScrollTo } from "@/components/providers/SmoothScroll";
import ParallaxLayer from "@/components/motion/ParallaxLayer";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const scrollTo = useSmoothScrollTo();
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section
      id="top"
      data-parallax-scene
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Atmosphere — three depth layers behind the content. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* Far mist + pale disc (slowest) */}
        <ParallaxLayer speed={0.2} className="absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(58% 46% at 50% 26%, color-mix(in srgb, var(--mist) 16%, transparent), transparent 72%)",
            }}
          />
          <div
            className="absolute left-1/2 top-[16%] h-40 w-40 -translate-x-1/2 rounded-full sm:h-56 sm:w-56"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--ash) 34%, transparent), transparent 68%)",
            }}
          />
        </ParallaxLayer>

        {/* Distant mountain range (mid) */}
        <ParallaxLayer speed={0.5} className="absolute inset-x-0 bottom-0 h-[62%]" aria-hidden>
          <Ridge variant="far" />
        </ParallaxLayer>

        {/* Near ridge (moves closer to content speed) */}
        <ParallaxLayer speed={0.72} className="absolute inset-x-0 bottom-0 h-[42%]" aria-hidden>
          <Ridge variant="near" />
        </ParallaxLayer>

        {/* Base fade so content sits clear of the mist */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, color-mix(in srgb, var(--bg) 55%, transparent))",
          }}
        />
      </div>

      {/* Content (foreground, 1.0) */}
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <motion.p
            {...rise(0.05)}
            className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-fg-subtle"
          >
            {profile.location}
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            className="mt-5 font-display text-[3.25rem] font-light leading-[0.98] tracking-tight text-fg sm:text-7xl lg:text-8xl"
          >
            {profile.shortName}
          </motion.h1>

          <motion.p
            {...rise(0.3)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl"
          >
            {profile.positioning}
          </motion.p>

          <motion.div {...rise(0.45)} className="mt-8 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-seal" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              {profile.availability}
            </span>
          </motion.div>

          <motion.div {...rise(0.6)} className="mt-11 flex flex-wrap items-center gap-4">
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
        transition={{ duration: 1, delay: 1.1 }}
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

function Ridge({ variant }: { variant: "far" | "near" }) {
  const far = variant === "far";
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="h-full w-full"
      style={{ color: "var(--mist)" }}
      aria-hidden="true"
    >
      {far ? (
        <path
          d="M0,220 C160,150 300,120 440,150 C600,184 720,120 880,132 C1040,144 1180,196 1440,150 L1440,320 L0,320 Z"
          fill="currentColor"
          fillOpacity="0.16"
        />
      ) : (
        <path
          d="M0,270 C180,210 320,244 480,224 C640,204 760,258 920,250 C1090,242 1240,290 1440,246 L1440,320 L0,320 Z"
          fill="currentColor"
          fillOpacity="0.28"
        />
      )}
    </svg>
  );
}
