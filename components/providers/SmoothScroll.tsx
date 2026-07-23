"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollToTarget = string | number | HTMLElement;
type ScrollToFn = (target: ScrollToTarget, options?: { offset?: number }) => void;

const SmoothScrollContext = createContext<ScrollToFn>((target) => {
  if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView();
  }
});

/** Smooth-scroll to a target (id selector, element, or offset). Falls back to
 *  native behavior when Lenis is disabled (reduced motion). */
export const useSmoothScrollTo = () => useContext(SmoothScrollContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Reduced motion: no inertial scroll at all. Native scrolling stays intact.
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis' virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: ScrollToFn = (target, options) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: options?.offset ?? 0 });
      return;
    }
    // Fallback path (reduced motion / not yet mounted).
    if (typeof target === "string") {
      const el = document.querySelector(target);
      if (el instanceof HTMLElement) {
        const top =
          el.getBoundingClientRect().top +
          window.scrollY +
          (options?.offset ?? 0);
        window.scrollTo({ top });
      }
    } else if (typeof target === "number") {
      window.scrollTo({ top: target });
    } else {
      target.scrollIntoView();
    }
  };

  return (
    <SmoothScrollContext.Provider value={scrollTo}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
