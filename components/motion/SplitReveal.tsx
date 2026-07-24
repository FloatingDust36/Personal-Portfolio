"use client";

import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText } from "@/lib/gsap";

type SplitKind = "lines" | "words" | "chars" | "words,chars";

/**
 * Kinetic text reveal: splits the element into lines/words/chars and slides each
 * up from behind a mask, staggered, as it scrolls into view. Splitting waits for
 * fonts so line breaks are correct. Under reduced motion the text simply renders
 * (no split, no animation).
 */
export default function SplitReveal({
  children,
  as = "div",
  className,
  type = "lines",
  stagger = 0.09,
  duration = 0.9,
  delay = 0,
  start = "top 82%",
  y = 112,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  type?: SplitKind;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  y?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | null = null;
    let tween: gsap.core.Tween | null = null;
    let cancelled = false;

    const run = () => {
      if (cancelled || !el) return;
      const maskType = type.includes("lines")
        ? "lines"
        : type.includes("chars")
          ? "chars"
          : "words";
      split = new SplitText(el, { type, mask: maskType as "lines" | "words" | "chars" });
      const targets =
        maskType === "lines" ? split.lines : maskType === "chars" ? split.chars : split.words;
      tween = gsap.from(targets, {
        yPercent: y,
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    };

    if (document.fonts?.ready) document.fonts.ready.then(run);
    else run();

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [type, stagger, duration, delay, start, y]);

  return createElement(as, { ref, className }, children);
}
