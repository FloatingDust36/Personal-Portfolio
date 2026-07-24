"use client";

import { motion, useReducedMotion } from "motion/react";

/** A brush-like ink stroke that draws itself as it scrolls into view. */
export default function InkDivider({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg
      className={className}
      viewBox="0 0 1200 20"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M2,11 C220,4 430,16 640,9 C860,2 1040,16 1198,8"
        stroke="var(--fg-subtle)"
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: reduced ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
