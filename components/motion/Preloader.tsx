"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/content/profile";

/**
 * First-load ink reveal. The overlay is always server-rendered and covered by
 * default; an inline head script sets `data-intro` before paint so repeat visits
 * and reduced-motion hide it with no flash (see globals.css + layout.tsx). When
 * `data-intro="show"`, this runs the reveal, then flips it to "done". Skippable
 * via pointer / key / scroll.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const strokeRef = useRef<SVGPathElement>(null);

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

    const inner = root.querySelector<HTMLElement>("[data-intro-inner]");
    const stroke = strokeRef.current;
    if (stroke) {
      const len = stroke.getTotalLength();
      stroke.style.strokeDasharray = `${len}`;
      stroke.style.strokeDashoffset = `${len}`;
    }

    const finish = () => {
      el.dataset.intro = "done";
      document.body.style.overflow = prevOverflow;
    };

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });
    tl.from(inner, { opacity: 0, y: 16, duration: 0.5 })
      .to(stroke, { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.2")
      .to({}, { duration: 0.25 })
      .to(inner, { opacity: 0, y: -12, duration: 0.4, ease: "power2.in" }, "reveal")
      .to(root, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "reveal+=0.05");

    const skip = () => {
      if (tl.totalProgress() < 0.55) tl.totalProgress(0.55);
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
      <div data-intro-inner className="flex flex-col items-center gap-5">
        <span className="grid h-14 w-14 place-items-center rounded-[4px] bg-seal font-display text-2xl font-medium leading-none text-paper">
          {profile.initials}
        </span>
        <svg width="180" height="12" viewBox="0 0 180 12" fill="none" aria-hidden="true">
          <path
            ref={strokeRef}
            d="M2,7 C40,2 80,10 120,6 C145,3 165,9 178,6"
            stroke="var(--fg-subtle)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-fg-subtle">
          {profile.shortName}
        </span>
      </div>
    </div>
  );
}
