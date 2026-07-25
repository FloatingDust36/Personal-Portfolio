"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/content/profile";

/**
 * First-load ink reveal: a full-screen paper/ink overlay that stamps the seal
 * and draws a brush stroke, then lifts to reveal the site. Shown once per
 * session (sessionStorage), skippable (click / key / scroll), and skipped
 * outright under reduced motion.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const strokeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {
      /* ignore */
    }
    if (seen || reduced) return;

    setShow(true);
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      /* ignore */
    }

    const root = rootRef.current;
    if (!root) return;

    // Prevent scrolling under the overlay while it's up.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const inner = root.querySelector<HTMLElement>("[data-intro-inner]");
    const stroke = strokeRef.current;
    const len = stroke?.getTotalLength() ?? 0;
    if (stroke) {
      stroke.style.strokeDasharray = `${len}`;
      stroke.style.strokeDashoffset = `${len}`;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        setShow(false);
      },
    });

    tl.from(inner, { opacity: 0, y: 16, duration: 0.5 })
      .to(stroke, { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.2")
      .to({}, { duration: 0.2 })
      .to(inner, { opacity: 0, y: -12, duration: 0.4, ease: "power2.in" }, "reveal")
      .to(
        root,
        { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
        "reveal+=0.05",
      );

    const skip = () => tl.progress() < 0.98 && tl.totalProgress(0.6);
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

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
      aria-hidden="true"
    >
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
