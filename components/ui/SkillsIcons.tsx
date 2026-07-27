import {
  siPython,
  siTypescript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siFlutter,
  siDart,
  siCplusplus,
  siExpo,
  siFastapi,
  siNodedotjs,
  siSupabase,
  siPostgresql,
  siGithub,
  siGithubactions,
  siVercel,
  siDocker,
  siFirebase,
  siArduino,
  siEspressif,
  siTensorflow,
  siScikitlearn,
  siPandas,
  siNeo4j,
  siLangchain,
  siLeaflet,
  siFramer,
  siPytorch,
  siHtml5,
  siGoogle,
  siQdrant,
  type SimpleIcon,
} from "simple-icons";
import { skillTiers } from "@/content/skills";

const ICONS: Record<string, SimpleIcon> = {
  Python: siPython,
  "TypeScript / JavaScript": siTypescript,
  "HTML/CSS": siHtml5,
  React: siReact,
  "Next.js": siNextdotjs,
  "React Native / Expo": siExpo,
  "Tailwind CSS": siTailwindcss,
  FastAPI: siFastapi,
  "Node.js": siNodedotjs,
  Supabase: siSupabase,
  PostgreSQL: siPostgresql,
  "Git / GitHub": siGithub,
  "XGBoost / scikit-learn / SHAP": siScikitlearn,
  "MediaPipe + TensorFlow/Keras": siTensorflow,
  pandas: siPandas,
  Dart: siDart,
  Flutter: siFlutter,
  "Framer Motion": siFramer,
  "Recharts / D3 / Leaflet": siLeaflet,
  "LangChain / LangGraph": siLangchain,
  Qdrant: siQdrant,
  Neo4j: siNeo4j,
  "Google OR-Tools": siGoogle,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  Vercel: siVercel,
  "C / C++": siCplusplus,
  Arduino: siArduino,
  ESP32: siEspressif,
  Firebase: siFirebase,
  PyTorch: siPytorch,
};

// Tools grouped by domain (only ones with a logo appear as tiles).
const CATEGORIES: Record<string, string[]> = {
  Languages: ["Python", "TypeScript / JavaScript", "HTML/CSS", "C / C++"],
  Frontend: [
    "React",
    "Next.js",
    "React Native / Expo",
    "Tailwind CSS",
    "Flutter",
    "Framer Motion",
    "Recharts / D3 / Leaflet",
  ],
  Backend: ["FastAPI", "Node.js"],
  "AI / ML": [
    "XGBoost / scikit-learn / SHAP",
    "MediaPipe + TensorFlow/Keras",
    "pandas",
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

const TIER: Record<string, string> = {};
skillTiers.forEach((t) => t.items.forEach((i) => (TIER[i] = t.name)));

// Skills that are practices/concepts rather than a tool with a logo.
const CONCEPTS = skillTiers.flatMap((t) => t.items).filter((s) => !ICONS[s]);

function colorFor(hex: string): string {
  const n = parseInt(hex, 16);
  const lum = 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return lum < 55 ? "var(--fg)" : `#${hex}`;
}

function TierDot({ tier }: { tier?: string }) {
  const cls =
    tier === "Working"
      ? "bg-fg"
      : tier === "Familiar"
        ? "bg-fg-muted"
        : "border-[1.5px] border-fg-subtle";
  return <span className={`block h-2 w-2 rounded-full ${cls}`} aria-hidden="true" />;
}

function Tile({ name }: { name: string }) {
  const icon = ICONS[name];
  return (
    <div className="group relative flex flex-col items-center gap-2.5 rounded-md border border-line bg-surface/40 px-2.5 py-5 text-center transition-colors duration-300 hover:border-fg-subtle/40">
      <span className="absolute right-2 top-2">
        <TierDot tier={TIER[name]} />
      </span>
      <div className="grid h-8 w-8 place-items-center">
        {icon && (
          <svg viewBox="0 0 24 24" width="28" height="28" fill={colorFor(icon.hex)} aria-hidden="true">
            <path d={icon.path} />
          </svg>
        )}
      </div>
      <span className="font-mono text-[0.56rem] uppercase tracking-[0.1em] leading-tight text-fg-subtle">
        {name}
      </span>
    </div>
  );
}

function Panel({ cat, tools }: { cat: string; tools: string[] }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-muted">
        {cat}
      </h3>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {tools.map((item) => (
          <Tile key={item} name={item} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsIcons() {
  const panels = Object.entries(CATEGORIES)
    .map(([cat, items]) => ({ cat, tools: items.filter((i) => ICONS[i]) }))
    .filter((p) => p.tools.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="grid gap-x-10 gap-y-12 lg:grid-cols-2 lg:items-stretch">
        {panels.map((p) => (
          <Panel key={p.cat} cat={p.cat} tools={p.tools} />
        ))}

        {/* Practices & approaches — a vertical marquee that stands beside the
            tool tiles instead of trailing after them. */}
        <div className="flex flex-col">
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-muted">
            Practices &amp; approaches
          </h3>
          <div
            className="vmarquee group relative mt-4 h-[340px] overflow-hidden rounded-md border border-line bg-surface/40"
            aria-hidden="true"
          >
            <div className="vmarquee-track flex flex-col gap-5 px-6 py-6">
              {[...CONCEPTS, ...CONCEPTS].map((s, i) => (
                <span
                  key={i}
                  className="font-display text-2xl font-light leading-none text-fg-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend for the proficiency dots */}
      <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-subtle">
        <span className="flex items-center gap-2">
          <TierDot tier="Working" /> Working
        </span>
        <span className="flex items-center gap-2">
          <TierDot tier="Familiar" /> Familiar
        </span>
        <span className="flex items-center gap-2">
          <TierDot tier="Exposure" /> Exposure
        </span>
      </div>

      {/* Accessible fallback */}
      <div className="sr-only">
        {skillTiers.map((t) => (
          <p key={t.name}>
            {t.name}: {t.items.join(", ")}.
          </p>
        ))}
      </div>
    </div>
  );
}
