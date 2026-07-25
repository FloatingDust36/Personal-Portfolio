"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * An ink-brush comet cursor: a soft, feathered ink head with three lagging,
 * fainter trails that read as a fading brush stroke. Blooms over interactive
 * elements. Fine-pointer + motion-allowing devices only; otherwise nothing
 * renders and the native cursor stays. The native cursor is hidden via the
 * `cursor-custom` class only while this is mounted. Ink tone follows the theme
 * through CSS variables, so no theme syncing is needed.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Head → tail, each layer laggier than the last.
  const hx = useSpring(x, { stiffness: 900, damping: 40 });
  const hy = useSpring(y, { stiffness: 900, damping: 40 });
  const ax = useSpring(x, { stiffness: 240, damping: 26 });
  const ay = useSpring(y, { stiffness: 240, damping: 26 });
  const bx = useSpring(x, { stiffness: 140, damping: 22 });
  const by = useSpring(y, { stiffness: 140, damping: 22 });
  const cx = useSpring(x, { stiffness: 85, damping: 20 });
  const cy = useSpring(y, { stiffness: 85, damping: 20 });

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
      setActive(!!target?.closest("a, button, input, textarea, [role='button']"));
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

  const ink =
    "radial-gradient(circle, color-mix(in srgb, var(--fg) 92%, transparent) 0%, color-mix(in srgb, var(--fg) 45%, transparent) 46%, transparent 72%)";

  const layers = [
    { mx: cx, my: cy, size: 30, opacity: 0.1, blur: 4, grow: 1.25 },
    { mx: bx, my: by, size: 22, opacity: 0.16, blur: 2.5, grow: 1.3 },
    { mx: ax, my: ay, size: 15, opacity: 0.26, blur: 1.4, grow: 1.4 },
    { mx: hx, my: hy, size: 9, opacity: 0.92, blur: 0.4, grow: 2.0 },
  ];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms" }}
    >
      {layers.map((l, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            x: l.mx,
            y: l.my,
            width: l.size,
            height: l.size,
            marginLeft: -l.size / 2,
            marginTop: -l.size / 2,
            opacity: l.opacity,
            background: ink,
            filter: `blur(${l.blur}px)`,
          }}
          animate={{ scale: active ? l.grow : 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        />
      ))}
    </div>
  );
}
