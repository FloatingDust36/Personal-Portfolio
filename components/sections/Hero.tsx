"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/content/profile";
import { useSmoothScrollTo } from "@/components/providers/SmoothScroll";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import MistTexture from "@/components/motion/MistTexture";
import MaskText from "@/components/motion/MaskText";
import InkParticles from "@/components/motion/InkParticles";
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
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* Far: mist wash + pale disc + fractal haze (slowest) */}
        <ParallaxLayer speed={0.2} className="absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(62% 48% at 62% 24%, color-mix(in srgb, var(--ash) 22%, transparent), transparent 70%)",
            }}
          />
          <div
            className="absolute right-[16%] top-[14%] h-44 w-44 rounded-full sm:h-64 sm:w-64"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--ash) 38%, transparent), transparent 66%)",
            }}
          />
          <MistTexture seed={4} opacity={0.45} className="absolute inset-0 h-full w-full" />
        </ParallaxLayer>

        {/* Mid: mountains */}
        <ParallaxLayer speed={0.5} className="absolute inset-x-0 bottom-0 h-[82%]" aria-hidden>
          <Mountains />
        </ParallaxLayer>

        {/* Mid mist band weaving through the range */}
        <ParallaxLayer speed={0.62} className="absolute inset-x-0 bottom-[10%] h-[52%]" aria-hidden>
          <MistTexture seed={9} frequency="0.012 0.022" opacity={0.4} className="h-full w-full" />
        </ParallaxLayer>

        {/* Near: lone figure emerging from the mist (faint on mobile, full on sm+) */}
        <ParallaxLayer
          speed={0.8}
          className="absolute bottom-[9%] right-[3%] h-[40%] w-[46%] max-w-[200px] opacity-40 sm:bottom-[10%] sm:right-[11%] sm:h-[54%] sm:w-[38%] sm:max-w-[290px] sm:opacity-100"
          aria-hidden
        >
          <div
            className="mx-auto h-full w-full"
            style={{
              maskImage: "linear-gradient(to bottom, #000 76%, transparent 98%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 76%, transparent 98%)",
            }}
          >
            <InkFigure className="mx-auto block h-full w-auto text-fg" />
          </div>
        </ParallaxLayer>

        {/* Foreground mist veil at the base */}
        <ParallaxLayer speed={0.92} className="absolute inset-x-0 bottom-0 h-[28%]" aria-hidden>
          <MistTexture seed={15} frequency="0.014 0.03" opacity={0.5} className="h-full w-full" />
        </ParallaxLayer>

        {/* Drifting ink flecks */}
        <InkParticles className="absolute inset-0" />

        {/* Legibility fade toward the text side */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, color-mix(in srgb, var(--bg) 70%, transparent) 0%, color-mix(in srgb, var(--bg) 30%, transparent) 42%, transparent 68%)",
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

/** Distant range + a dramatic jagged peak to the right. Uses the mist token so
 *  it reads on both paper and ink. */
function Mountains() {
  return (
    <svg
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      style={{ color: "var(--mist)" }}
      aria-hidden="true"
    >
      {/* distant soft range */}
      <path
        d="M0,360 C200,300 360,320 540,300 C760,276 900,340 1120,300 C1280,272 1360,320 1440,300 L1440,600 L0,600 Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* main jagged peak, right */}
      <path
        d="M760,600 L980,280 L1040,360 L1150,120 L1210,250 L1270,180 L1440,440 L1440,600 Z"
        fill="currentColor"
        fillOpacity="0.24"
      />
      {/* nearer foothill left */}
      <path
        d="M0,600 L0,440 C120,400 240,430 360,470 C500,516 560,470 700,510 L760,600 Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
    </svg>
  );
}

