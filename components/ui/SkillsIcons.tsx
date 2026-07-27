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

// Legend copy — the internal tier name "Working" is unclear on its own, so the
// UI shows a plainer label and a one-line gloss of what each tier means.
const LEGEND: { tier: string; label: string; desc: string }[] = [
  { tier: "Working", label: "Proficient", desc: "built real features" },
  { tier: "Familiar", label: "Familiar", desc: "used in a project" },
  { tier: "Exposure", label: "Exposure", desc: "coursework / one project" },
];

// One masonry over every category packs into two balanced columns, so a short
// category no longer leaves a tall gap beside a taller one.
const CATEGORY_KEYS = Object.keys(CATEGORIES);

// Skills that are practices/concepts rather than a tool with a logo.
const CONCEPTS = skillTiers.flatMap((t) => t.items).filter((s) => !ICONS[s]);

function colorFor(hex: string): string {
  const n = parseInt(hex, 16);
  const lum = 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return lum < 55 ? "var(--fg)" : `#${hex}`;
}

function TierDot({ tier }: { tier?: string }) {
  if (tier === "Working") {
    return <span className="block h-2.5 w-2.5 rounded-full bg-fg" aria-hidden="true" />;
  }
  if (tier === "Familiar") {
    // Half-filled "moon" — unmistakably between the solid and the ring.
    return (
      <span
        className="block h-2.5 w-2.5 rounded-full border border-fg"
        style={{ background: "linear-gradient(90deg, var(--fg) 50%, transparent 50%)" }}
        aria-hidden="true"
      />
    );
  }
  return (
    <span
      className="block h-2.5 w-2.5 rounded-full border-[1.5px] border-fg-subtle"
      aria-hidden="true"
    />
  );
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

function Panel({ cat }: { cat: string }) {
  const tools = (CATEGORIES[cat] ?? []).filter((i) => ICONS[i]);
  if (tools.length === 0) return null;
  return (
    <div className="mb-8 break-inside-avoid">
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
  return (
    <div>
      {/* Practices & approaches — a full-width kinetic band leading into the
          tools, prominent rather than trailing after them. */}
      <div className="mb-14 border-y border-line py-7">
        <p className="mx-auto mb-4 max-w-6xl px-5 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-muted sm:px-8">
          Practices &amp; approaches
        </p>
        <Marquee seconds={46}>
          {CONCEPTS.map((s) => (
            <span
              key={s}
              className="flex items-center gap-8 font-display text-3xl font-light text-fg-muted sm:text-4xl"
            >
              {s}
              <span className="text-xl text-seal/50" aria-hidden="true">
                ·
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Every category in one masonry — two balanced columns, no tall gaps. */}
        <div className="gap-8 md:columns-2">
          {CATEGORY_KEYS.map((cat) => (
            <Panel key={cat} cat={cat} />
          ))}
        </div>

        {/* Legend for the proficiency dots */}
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fg-subtle">
          {LEGEND.map((l) => (
            <span key={l.tier} className="flex items-center gap-2">
              <TierDot tier={l.tier} /> {l.label}
              <span className="tracking-normal text-fg-subtle/60 normal-case">
                — {l.desc}
              </span>
            </span>
          ))}
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
    </div>
  );
}
