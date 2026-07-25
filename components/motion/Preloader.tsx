"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/content/profile";
import MistTexture from "@/components/motion/MistTexture";

const PANELS = 6;
// Ink-splatter dots that burst when the seal stamps.
const SPLATTER = [
  { x: -34, y: -20, r: 4 },
  { x: 30, y: -26, r: 3 },
  { x: 40, y: 16, r: 5 },
  { x: -40, y: 18, r: 3 },
  { x: 0, y: -40, r: 2.5 },
  { x: -14, y: 34, r: 3.5 },
  { x: 22, y: 34, r: 2.5 },
];

/**
 * Cinematic first-load ink reveal. The seal stamps in with a splatter, the name
 * rises, a counter ticks to 100, then the cover peels away in vertical ink
 * panels to reveal the site. Server-rendered and gated by `data-intro` (set
 * before paint in layout.tsx) so repeat visits and reduced motion never flash
 * it. Skippable via pointer / key / scroll.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const el = document.documentElement;
    if (!root || el.dataset.intro !== "show") return;

    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      /* ignore */
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const q = gsap.utils.selector(root);
    const finish = () => {
      el.dataset.intro = "done";
      document.body.style.overflow = prevOverflow;
    };

    const counter = { v: 0 };
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });

    tl.from(q("[data-seal]"), { scale: 1.5, opacity: 0, duration: 0.55, ease: "back.out(2.2)" }, 0.1)
      .from(
        q("[data-splat]"),
        { scale: 0, opacity: 1, duration: 0.4, stagger: 0.02, ease: "power2.out" },
        0.22,
      )
      .to(
        q("[data-splat]"),
        { scale: 1.8, opacity: 0, duration: 0.7, stagger: 0.02, ease: "power2.out" },
        0.42,
      )
      .from(
        q("[data-line]"),
        { yPercent: 115, opacity: 0, duration: 0.75, stagger: 0.1, ease: "power3.out" },
        0.4,
      )
      .to(
        counter,
        {
          v: 100,
          duration: 1.25,
          ease: "power1.inOut",
          onUpdate: () => {
            if (counterRef.current)
              counterRef.current.textContent = String(Math.round(counter.v));
          },
        },
        0.15,
      )
      .to(q("[data-content]"), { opacity: 0, y: -18, duration: 0.4, ease: "power2.in" }, 1.65)
      .to(
        q("[data-panel]"),
        {
          yPercent: -100,
          duration: 0.9,
          stagger: { each: 0.07, from: "start" },
          ease: "power4.inOut",
        },
        1.75,
      );

    const skip = () => {
      if (tl.totalProgress() < 0.6) tl.totalProgress(0.6);
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      document.body.style.overflow = prevOverflow;
      tl.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="intro-overlay" aria-hidden="true">
      {/* Peeling ink panels (the cover) */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: PANELS }).map((_, i) => (
          <div
            key={i}
            data-panel
            className="relative h-full flex-1 overflow-hidden bg-bg"
          >
            <MistTexture
              seed={i * 5 + 2}
              frequency="0.012 0.02"
              opacity={0.35}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        ))}
      </div>

      {/* Foreground content */}
      <div
        data-content
        className="relative flex flex-col items-center gap-6 px-6 text-center"
      >
        <div className="relative">
          <span
            data-seal
            className="grid h-16 w-16 place-items-center rounded-[5px] bg-seal font-display text-2xl font-medium leading-none text-paper"
          >
            {profile.initials}
          </span>
          {SPLATTER.map((s, i) => (
            <span
              key={i}
              data-splat
              className="absolute left-1/2 top-1/2 block rounded-full bg-seal"
              style={{
                width: s.r * 2,
                height: s.r * 2,
                marginLeft: -s.r,
                marginTop: -s.r,
                transform: `translate(${s.x}px, ${s.y}px)`,
              }}
            />
          ))}
        </div>

        <h1 className="font-display text-4xl font-light leading-[0.95] tracking-tight text-fg sm:text-6xl">
          {["John Peter", "Pestaño"].map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Counter */}
      <div
        data-content
        className="absolute bottom-8 right-8 font-mono text-sm uppercase tracking-[0.2em] text-fg-subtle sm:bottom-10 sm:right-12"
      >
        <span ref={counterRef}>0</span>
        <span className="text-fg-subtle/60"> / 100</span>
      </div>
    </div>
  );
}
