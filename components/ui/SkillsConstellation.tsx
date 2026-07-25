"use client";

import { useEffect, useRef } from "react";
import { skillTiers } from "@/content/skills";

/** Explicit category buckets so the graph clusters meaningfully. */
const CATEGORIES: Record<string, string[]> = {
  Languages: [
    "Python",
    "TypeScript / JavaScript",
    "SQL",
    "HTML/CSS",
    "C#",
    "Dart",
    "C / C++",
    "Verilog",
  ],
  Frontend: [
    "React",
    "Next.js",
    "React Native / Expo",
    "Tailwind CSS",
    "Flutter",
    "Framer Motion",
    "Recharts / D3 / Leaflet",
  ],
  Backend: ["FastAPI", "Node.js", "REST API design", "SQLAlchemy", "Alembic"],
  "AI / ML": [
    "LLM integration",
    "Agentic tool-calling",
    "XGBoost / scikit-learn / SHAP",
    "MediaPipe + TensorFlow/Keras",
    "pandas",
    "Power BI",
    "LangChain / LangGraph",
    "Qdrant",
    "Neo4j",
    "Google OR-Tools",
  ],
  "Infra & data": [
    "Git / GitHub",
    "Docker",
    "GitHub Actions",
    "Vercel",
    "Supabase",
    "PostgreSQL",
    "Firebase",
    "Arduino",
    "ESP32",
  ],
};

const TIER_R: Record<string, number> = { Working: 6, Familiar: 4.6, Exposure: 3.6 };

type Node = {
  id: string;
  label: string;
  cat: string;
  anchor: boolean;
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number; // anchor target (anchors only)
  ty: number;
};

function catOf(skill: string): string {
  for (const [cat, list] of Object.entries(CATEGORIES)) if (list.includes(skill)) return cat;
  return "AI / ML";
}

export default function SkillsConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Build nodes + links.
    const cats = Object.keys(CATEGORIES);
    const nodes: Node[] = [];
    const links: [Node, Node][] = [];
    const byId = new Map<string, Node>();

    cats.forEach((cat, i) => {
      const a: Node = {
        id: `cat:${cat}`,
        label: cat,
        cat,
        anchor: true,
        r: 8,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        tx: 0,
        ty: 0,
      };
      nodes.push(a);
      byId.set(a.id, a);
    });
    for (const tier of skillTiers) {
      for (const item of tier.items) {
        const cat = catOf(item);
        const n: Node = {
          id: item,
          label: item,
          cat,
          anchor: false,
          r: TIER_R[tier.name] ?? 4,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          tx: 0,
          ty: 0,
        };
        nodes.push(n);
        byId.set(n.id, n);
        links.push([n, byId.get(`cat:${cat}`)!]);
      }
    }

    let w = 0;
    let h = 0;
    let dpr = 1;
    let colors = { fg: "#0d0e11", mist: "#676c73", seal: "#8c2f27" };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (v: string, f: string) => (cs.getPropertyValue(v).trim() || f);
      colors = {
        fg: get("--fg", "#0d0e11"),
        mist: get("--mist", "#676c73"),
        seal: get("--seal", "#8c2f27"),
      };
    };
    readColors();

    const place = () => {
      const cx = w / 2;
      const cy = h / 2;
      const rad = Math.min(w, h) * 0.3;
      cats.forEach((cat, i) => {
        const ang = (i / cats.length) * Math.PI * 2 - Math.PI / 2;
        const a = byId.get(`cat:${cat}`)!;
        a.tx = cx + Math.cos(ang) * rad;
        a.ty = cy + Math.sin(ang) * rad * 0.8;
        if (a.x === 0) {
          a.x = a.tx;
          a.y = a.ty;
        }
      });
      // scatter skills near their anchor initially
      for (const n of nodes) {
        if (n.anchor) continue;
        if (n.x === 0) {
          const a = byId.get(`cat:${n.cat}`)!;
          n.x = a.tx + (Math.random() - 0.5) * 80;
          n.y = a.ty + (Math.random() - 0.5) * 80;
        }
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      place();
    };
    resize();

    const mouse = { x: -1e4, y: -1e4, over: null as Node | null };

    const step = () => {
      // Repulsion (all pairs).
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) d2 = 1;
          const d = Math.sqrt(d2);
          const force = ((a.anchor || b.anchor ? 2600 : 1200) / d2);
          const fx = (dx / d) * force;
          const fy = (dy / d) * force;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
      }
      // Link springs.
      for (const [n, a] of links) {
        const dx = a.x - n.x;
        const dy = a.y - n.y;
        const d = Math.hypot(dx, dy) || 1;
        const rest = 74;
        const f = (d - rest) * 0.012;
        n.vx += (dx / d) * f;
        n.vy += (dy / d) * f;
      }
      // Anchor targets + centering + mouse.
      for (const n of nodes) {
        if (n.anchor) {
          n.vx += (n.tx - n.x) * 0.02;
          n.vy += (n.ty - n.y) * 0.02;
        }
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 120 * 120) {
          const md = Math.sqrt(md2) || 1;
          const mf = (1 - md / 120) * 6;
          n.vx += (mdx / md) * mf;
          n.vy += (mdy / md) * mf;
        }
        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x += n.vx;
        n.y += n.vy;
        n.x = Math.max(n.r + 4, Math.min(w - n.r - 4, n.x));
        n.y = Math.max(n.r + 4, Math.min(h - n.r - 14, n.y));
      }
    };

    const rgba = (hex: string, a: number) => {
      const h2 = hex.replace("#", "");
      const f = h2.length === 3 ? h2.split("").map((c) => c + c).join("") : h2;
      const n = parseInt(f.slice(0, 6), 16);
      return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const activeCat = mouse.over?.cat ?? null;

      // Links.
      ctx.lineWidth = 1;
      for (const [n, a] of links) {
        const on = activeCat === n.cat;
        ctx.strokeStyle = rgba(colors.mist, on ? 0.5 : activeCat ? 0.06 : 0.16);
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(a.x, a.y);
        ctx.stroke();
      }

      // Nodes + labels.
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (const n of nodes) {
        const on = !activeCat || n.cat === activeCat;
        const isSeal = mouse.over === n;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = isSeal
          ? rgba(colors.seal, 1)
          : rgba(colors.fg, on ? (n.anchor ? 0.95 : 0.85) : 0.14);
        ctx.fill();

        if (n.anchor) {
          ctx.font = "600 12px ui-monospace, monospace";
          ctx.fillStyle = rgba(colors.fg, on ? 0.95 : 0.2);
          ctx.fillText(n.label.toUpperCase(), n.x, n.y + n.r + 5);
        } else if (activeCat === n.cat) {
          ctx.font = "10px ui-monospace, monospace";
          ctx.fillStyle = rgba(colors.fg, 0.75);
          ctx.fillText(n.label, n.x, n.y + n.r + 4);
        }
      }
    };

    let raf = 0;
    let running = true;
    const loop = () => {
      if (!reduce) step();
      draw();
      if (running && !reduce) raf = requestAnimationFrame(loop);
    };
    // Settle a bit before first paint for a calmer entrance.
    for (let i = 0; i < (reduce ? 260 : 60); i++) step();
    loop();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      let best: Node | null = null;
      let bestD = 26;
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < bestD) {
          bestD = d;
          best = n;
        }
      }
      mouse.over = best;
      canvas.style.cursor = best ? "pointer" : "default";
    };
    const onLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
      mouse.over = null;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting;
        if (running && !reduce) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(loop);
        } else cancelAnimationFrame(raf);
      },
      { threshold: 0 },
    );
    io.observe(parent);
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
