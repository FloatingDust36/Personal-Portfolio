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

// Skill → brand icon. Skills with no clean logo fall back to a monogram tile.
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

/** Dark brand marks (GitHub, Next, Vercel…) vanish in dark mode, so fall those
 *  back to the theme foreground; everything else keeps its brand colour. */
function colorFor(hex: string): string {
  const n = parseInt(hex, 16);
  const lum = 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return lum < 55 ? "var(--fg)" : `#${hex}`;
}

function monogram(name: string): string {
  const words = name.replace(/[/+]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words.map((w) => w[0]).join("").slice(0, 3).toUpperCase();
}

function Tile({ name }: { name: string }) {
  const icon = ICONS[name];
  return (
    <div className="group flex flex-col items-center gap-3 rounded-md border border-line bg-surface/40 px-3 py-6 text-center transition-colors duration-300 hover:border-fg-subtle/40">
      <div className="grid h-9 w-9 place-items-center">
        {icon ? (
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill={colorFor(icon.hex)}
            aria-hidden="true"
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="font-display text-2xl font-light text-fg-muted">
            {monogram(name)}
          </span>
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
    <div className="space-y-12">
      {skillTiers.map((tier) => (
        <div key={tier.name}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
            <h3 className="font-display text-2xl font-light text-fg">{tier.name}</h3>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-subtle">
              {tier.blurb}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
            {tier.items.map((item) => (
              <Tile key={item} name={item} />
            ))}
          </div>
        </div>
      ))}

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
          <h3 className="font-display text-2xl font-light italic text-fg-muted">
            {currentlyLearning.label}
          </h3>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-subtle">
            Not yet shipped
          </span>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
          {currentlyLearning.items.map((item) => (
            <Tile key={item} name={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
