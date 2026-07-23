"use client";

import { useEffect, useRef } from "react";

type Fleck = {
  x: number;
  y: number;
  size: number;
  rot: number;
  vrot: number;
  vx: number;
  vy: number;
  alpha: number;
};

/**
 * Slow-drifting ink flecks / wind-blown motes across the hero. Canvas-based,
 * count scaled to area and capped. Fully skipped under reduced motion, and the
 * animation loop pauses when the hero scrolls out of view or the tab is hidden.
 */
export default function InkParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement!;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let flecks: Fleck[] = [];
    let raf = 0;
    let running = true;

    const readColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--fg").trim() ||
      "#0d0e11";
    let color = readColor();

    const seed = () => {
      const count = Math.min(70, Math.round((width * height) / 26000));
      flecks = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 3.5,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.01,
        vx: 0.05 + Math.random() * 0.35,
        vy: (Math.random() - 0.5) * 0.18,
        alpha: 0.06 + Math.random() * 0.16,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      for (const f of flecks) {
        f.x += f.vx;
        f.y += f.vy;
        f.rot += f.vrot;
        if (f.x > width + 10) f.x = -10;
        if (f.y > height + 10) f.y = -10;
        if (f.y < -10) f.y = height + 10;
        ctx.globalAlpha = f.alpha;
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rot);
        ctx.fillRect(-f.size / 2, -f.size / 4, f.size, f.size / 2);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    // Pause when the hero leaves the viewport.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(parent);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Recolor flecks when the theme flips.
    const mo = new MutationObserver(() => (color = readColor()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
