"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A soft ink dot that trails the pointer, with a lagging ring that swells over
 * interactive elements. Only active on fine-pointer devices with motion
 * allowed; otherwise nothing renders and the native cursor stays. The native
 * cursor is hidden via the `cursor-custom` class only while this is mounted.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false); // over an interactive target
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 900, damping: 40 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-custom");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setActive(!!target?.closest("a, button, [data-cursor='link'], input, textarea"));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms" }}
    >
      <motion.div
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-fg-subtle"
        style={{
          x: ringX,
          y: ringY,
          scale: active ? 1.9 : 1,
          opacity: active ? 0.5 : 0.35,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      <motion.div
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-fg"
        style={{
          x: dotX,
          y: dotY,
          scale: active ? 0 : 1,
        }}
      />
    </div>
  );
}
