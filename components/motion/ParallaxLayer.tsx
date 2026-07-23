"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll-linked parallax. `speed` is the layer's movement relative to the
 * scroll: 1 tracks the content one-to-one (no drift); lower values lag behind,
 * so distant layers (mist ~0.2, mountains ~0.5) drift slower than foreground.
 *
 * The layer scrubs against the nearest ancestor marked `data-parallax-scene`.
 * Disabled entirely under reduced motion — the layer renders, it just holds
 * still.
 */
export default function ParallaxLayer({
  speed,
  className,
  children,
  "aria-hidden": ariaHidden,
}: {
  speed: number;
  className?: string;
  children?: ReactNode;
  "aria-hidden"?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = el.closest("[data-parallax-scene]") ?? el;
    // Slower layers travel further down as the scene scrolls past, producing depth.
    const drift = (1 - speed) * 45;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0 },
        {
          yPercent: drift,
          ease: "none",
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className} aria-hidden={ariaHidden}>
      {children}
    </div>
  );
}
