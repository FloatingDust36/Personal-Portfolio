// Skills — verified from BRIEF §6.7. Tier names stay literal (no thematic
// renaming). PyTorch is "currently learning" only — it has not been used in a
// project and must never be listed as a skill.

export type SkillTier = { name: string; blurb: string; items: string[] };

export const skillTiers: SkillTier[] = [
  {
    name: "Working",
    blurb: "Built real, non-trivial features with it.",
    items: [
      "Python",
      "TypeScript / JavaScript",
      "SQL",
      "HTML/CSS",
      "React",
      "Next.js",
      "React Native / Expo",
      "Tailwind CSS",
      "FastAPI",
      "Node.js",
      "REST API design",
      "Supabase",
      "PostgreSQL",
      "Git / GitHub",
      "LLM integration",
      "Agentic tool-calling",
      "XGBoost / scikit-learn / SHAP",
      "MediaPipe + TensorFlow/Keras",
      "pandas",
      "Power BI",
    ],
  },
  {
    name: "Familiar",
    blurb: "Used in a project, with less depth.",
    items: [
      "C#",
      "Dart",
      "Flutter",
      "Framer Motion",
      "Recharts / D3 / Leaflet",
      "SQLAlchemy",
      "LangChain / LangGraph",
      "Qdrant",
      "Neo4j",
      "Google OR-Tools",
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Alembic",
    ],
  },
  {
    name: "Exposure",
    blurb: "Coursework or a single project.",
    items: ["C / C++", "Verilog", "Arduino", "ESP32", "Firebase"],
  },
];

export const currentlyLearning = {
  label: "Currently learning",
  items: ["PyTorch"],
};
