"use client";

import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText } from "@/lib/gsap";

type SplitKind = "lines" | "words" | "chars" | "words,chars";

/**
 * Kinetic text reveal: splits the element into lines/words/chars and slides each
 * up from behind a mask, staggered, as it approaches view. Splitting is deferred
 * until the element is near the viewport (and after fonts settle) so no SplitText
 * work runs on initial load. Under reduced motion the text simply renders.
 */
export default function SplitReveal({
  children,
  as = "div",
  className,
  type = "lines",
  stagger = 0.09,
  duration = 0.9,
  delay = 0,
  y = 112,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  type?: SplitKind;
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | null = null;
    let done = false;

    const run = () => {
      if (done || !el) return;
      done = true;
      const maskType = type.includes("lines")
        ? "lines"
        : type.includes("chars")
          ? "chars"
          : "words";
      split = new SplitText(el, { type, mask: maskType as "lines" | "words" | "chars" });
      const targets =
        maskType === "lines" ? split.lines : maskType === "chars" ? split.chars : split.words;
      gsap.from(targets, {
        yPercent: y,
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
        stagger,
      });
    };

    // Defer the split until the heading nears the viewport, after fonts settle.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          if (document.fonts?.ready) document.fonts.ready.then(run);
          else run();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      split?.revert();
    };
  }, [type, stagger, duration, delay, y]);

  return createElement(as, { ref, className }, children);
}
