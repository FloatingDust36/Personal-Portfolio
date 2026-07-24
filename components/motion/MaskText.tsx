"use client";

import { motion, useReducedMotion } from "motion/react";
import { createElement, type ElementType, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Line-by-line masked reveal: each line rises from behind a clip, staggered.
 * Under reduced motion it simply fades in. Pass lines as an array of strings
 * (or nodes) so each gets its own overflow-clipped row.
 */
export default function MaskText({
  lines,
  as: Tag = "div",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
  start = false,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** When true, animate as sections enter view instead of on mount. */
  start?: boolean;
}) {
  const reduced = useReducedMotion();
  const animateProps = start
    ? { whileInView: reduced ? { opacity: 1 } : { y: "0%", opacity: 1 }, viewport: { once: true, margin: "-12% 0px" } }
    : { animate: reduced ? { opacity: 1 } : { y: "0%", opacity: 1 } };

  return createElement(
    Tag,
    { className },
    lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.08em]">
        <motion.span
          className={`block ${lineClassName ?? ""}`}
          initial={reduced ? { opacity: 0 } : { y: "115%", opacity: 0 }}
          {...animateProps}
          transition={{
            duration: reduced ? 0.4 : 0.95,
            delay: delay + i * stagger,
            ease: EASE,
          }}
        >
          {line}
        </motion.span>
      </span>
    )),
  );
}
