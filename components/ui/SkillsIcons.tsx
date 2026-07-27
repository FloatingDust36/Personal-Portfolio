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
import { skillTiers, currentlyLearning } from "@/content/skills";
import Marquee from "@/components/motion/Marquee";

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
        ? "bg-fg-subtle"
        : "border border-fg-subtle";
  return <span className={`h-1.5 w-1.5 rounded-full ${cls}`} aria-hidden="true" />;
}

function Tile({ name }: { name: string }) {
  const icon = ICONS[name];
  return (
    <div className="group relative flex flex-col items-center gap-3 rounded-md border border-line bg-surface/40 px-3 py-6 text-center transition-colors duration-300 hover:border-fg-subtle/40">
      <span className="absolute right-2.5 top-2.5">
        <TierDot tier={TIER[name]} />
      </span>
      <div className="grid h-9 w-9 place-items-center">
        {icon && (
          <svg viewBox="0 0 24 24" width="30" height="30" fill={colorFor(icon.hex)} aria-hidden="true">
            <path d={icon.path} />
          </svg>
        )}
      </div>
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-subtle">
        {name}
      </span>
    </div>
  );
}

export default function SkillsIcons() {
  return (
    <div>
      {/* Tools & technologies — by domain */}
      <div className="mx-auto max-w-6xl space-y-10 px-5 sm:px-8">
        {Object.entries(CATEGORIES).map(([cat, items]) => {
          const tools = items.filter((i) => ICONS[i]);
          if (tools.length === 0) return null;
          return (
            <div key={cat}>
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-muted">
                {cat}
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4 lg:grid-cols-7">
                {tools.map((item) => (
                  <Tile key={item} name={item} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-subtle">
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
      </div>

      {/* Concepts & practices — a marquee */}
      <div className="mt-14 border-y border-line py-8">
        <p className="mx-auto mb-4 max-w-6xl px-5 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-muted sm:px-8">
          Practices &amp; approaches
        </p>
        <Marquee seconds={50}>
          {CONCEPTS.map((s) => (
            <span
              key={s}
              className="flex items-center gap-8 font-display text-3xl font-light text-fg-muted sm:text-5xl"
            >
              {s}
              <span className="text-xl text-seal/60" aria-hidden="true">
                ·
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Currently learning */}
      <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fg-subtle italic">
          {currentlyLearning.label}: {currentlyLearning.items.join(", ")} — not yet shipped
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
