"use client";

import dynamic from "next/dynamic";
import { profile } from "@/content/profile";
import { useSmoothScrollTo } from "@/components/providers/SmoothScroll";
// Imported statically (not lazily) so the artwork ships in the initial HTML
// and the browser can preload it — this is the largest paint on the page.
import HeroMedia from "@/components/sections/HeroMedia";
import { heroMedia } from "@/content/heroMedia";

// The 3D scene is WebGL-only, so it cannot be server-rendered.
const HeroScene = dynamic(() => import("@/components/hero3d/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const scrollTo = useSmoothScrollTo();

  /** CSS-driven entrance — paints without waiting for hydration. */
  const rise = (delay: number, className = "") => ({
    className: `hero-rise ${className}`.trim(),
    style: { animationDelay: `${delay}s` },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Ink-wash backdrop: supplied media when enabled, else the 3D scene */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {heroMedia.enabled ? <HeroMedia /> : <HeroScene />}
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
          <p
            {...rise(0.05, "font-mono text-[0.7rem] uppercase tracking-[0.34em] text-fg-subtle")}
          >
            {profile.location}
          </p>

          {/* Masked line reveal, in CSS so the name paints without hydration. */}
          <h1 className="mt-5 font-display text-[3.5rem] font-light leading-[0.94] tracking-tight text-fg sm:text-8xl lg:text-[8.5rem]">
            {["John Peter", "Pestaño"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span
                  className="hero-line block"
                  style={{ animationDelay: `${0.08 + i * 0.1}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            {...rise(0.22, "mt-8 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl")}
          >
            {profile.positioning}
          </p>

          <div {...rise(0.34, "mt-8 flex items-center gap-3")}>
            <span className="h-1.5 w-1.5 rounded-full bg-seal" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              {profile.availability}
            </span>
          </div>

          <div {...rise(0.46, "mt-11 flex flex-wrap items-center gap-5")}>
            <button
              type="button"
              onClick={() => {
                scrollTo("#contact", { offset: -72 });
                // Land the caret in Dusk once the scroll has settled.
                window.setTimeout(() => {
                  document.getElementById("dusk-input")?.focus({ preventScroll: true });
                }, 900);
              }}
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
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        {...rise(0.7, "pointer-events-none absolute inset-x-0 bottom-8 flex justify-center")}
        aria-hidden="true"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-fg-subtle">
          Scroll
        </span>
      </div>
    </section>
  );
}
