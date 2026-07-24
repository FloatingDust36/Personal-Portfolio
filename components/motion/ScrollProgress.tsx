"use client";

import { useScroll, useSpring, useTransform, motion } from "motion/react";

/**
 * A slim ink rail on the right edge that fills with scroll depth, with a seal
 * mark travelling down it. Desktop only, decorative. Motion's scroll tracking
 * is itself inert under reduced motion.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const markerTop = useTransform(p, (v) => `${v * 100}%`);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden h-44 -translate-y-1/2 lg:block"
    >
      <div className="relative h-full w-px bg-line">
        <motion.div
          className="absolute inset-x-0 top-0 w-px origin-top bg-fg-subtle"
          style={{ scaleY: p, height: "100%" }}
        />
        <motion.span
          className="absolute -left-[3px] block h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-seal"
          style={{ top: markerTop }}
        />
      </div>
    </div>
  );
}
