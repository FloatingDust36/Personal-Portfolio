// Projects — verified from BRIEF §6.5. Blurbs are used as written; do not grow
// the claims (ReliefMatch stays at the systems level — no gradient-boosting /
// Shapley / CVRP detail). Group A internship repos are featured WITHOUT links.
// `repo` is set only where a public URL is confirmed. `screenshot` points at an
// asset in /public; cards render cleanly text-only until one exists.

export type Project = {
  title: string;
  group: "A" | "B";
  role: string;
  stack: string[];
  blurb: string;
  note?: string;
  repo?: string;
  screenshot?: string;
};

export const groupA: Project[] = [
  {
    title: "BuckedUp Dashboard",
    group: "A",
    role: "Contributor — owned the system architecture, the database design, and the embedded AI assistant.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Supabase",
      "Vercel AI SDK",
      "OpenRouter",
      "Zod",
    ],
    blurb:
      "An internal dashboard for managing a video content production pipeline — tracking work through stages, with analytics, catalog management, and an embedded AI assistant that answers operational questions and performs guarded admin actions through tool-calling. The assistant queries through the signed-in user's own session, so database row-level security bounds what it can read to exactly what that user could already see. Account-management actions are gated so they never run on the model's say-so alone.",
  },
  {
    title: "Lumina",
    group: "A",
    role: "Contributor — designed and built the core production-plan to Power BI pipeline.",
    stack: [
      "Python",
      "FastMCP",
      "FastAPI",
      "pandas",
      "openpyxl",
      "Supabase",
      "TMDL",
      "Next.js 15",
      "OpenClaw",
    ],
    blurb:
      "An agentic system that turns a production-plan Excel file into a real, ready-to-open Power BI dashboard — reachable both through a web studio and through WhatsApp. It parses the plan, stores the dataset, has a model choose a sensible set of visuals for the report type, and generates a native Power BI project file. Not a mockup of a dashboard: the output opens in Power BI.",
  },
];

export const groupB: Project[] = [
  {
    title: "Tuklascope Mobile",
    group: "B",
    role: "AI and backend developer — owned all AI implementations.",
    stack: [
      "Flutter",
      "Riverpod",
      "Python",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "Gemini 2.5 Flash",
      "Neo4j AuraDB",
      "Qdrant",
      "Supabase",
      "Docker",
      "GitHub Actions",
    ],
    blurb:
      "An educational mobile app with an AI tutor that maps personalized learning pathways. A graph database models how skills and domains connect; a vector database backs the tutor's retrieval. Multimodal image input returns structured output. Containerized with CI/CD.",
    note: "Started as a hackathon web app, then rebuilt as a substantially more advanced mobile application.",
    repo: "https://github.com/D4rkbyte-Hackathon/tuklascope_mobile",
  },
  {
    title: "ReliefMatch AI",
    group: "B",
    role: "Solo.",
    stack: [
      "Python",
      "FastAPI",
      "XGBoost",
      "scikit-learn",
      "SHAP",
      "Google OR-Tools",
      "SQLAlchemy",
      "PostgreSQL",
      "React",
      "Leaflet",
    ],
    blurb:
      "A disaster-relief allocation system for Cebu City barangays. It combines a ranking model that prioritizes which areas need supplies most with a routing optimizer that plans delivery under truck capacity limits. The priority rankings come with plain-language explanations written in the style of an official situation report, so a coordinator can see why an area ranked highest without knowing any machine learning.",
  },
  {
    title: "FSL AI Classifier",
    group: "B",
    role: "Solo.",
    stack: ["Python", "MediaPipe", "TensorFlow/Keras", "OpenCV", "TensorFlow.js", "JavaScript"],
    blurb:
      "A Filipino Sign Language recognizer that runs entirely in the browser. Hand landmarks are collected and normalized, a classifier is trained in Python, then exported to run client-side — so recognition happens with no server call.",
  },
  {
    title: "MediBridge",
    group: "B",
    role: "Built the entire AI triage chatbot and all AI capabilities.",
    stack: ["Python", "FastAPI", "Google Gemini 2.5 Flash", "React", "TypeScript"],
    blurb:
      "A telemedicine platform. The triage assistant accepts photos alongside text, works through a structured triage flow, persists sessions, and generates a PDF summary for the doctor. Because it is medical-adjacent, it was built to keep asking rather than assume, and to treat patient information as private.",
  },
  {
    title: "SiyensyaGo",
    group: "B",
    role: "Built almost the entire application (2-person team).",
    stack: ["React Native", "Expo", "Google Gemini", "Supabase", "TypeScript"],
    blurb:
      "A camera-based educational mobile app using Gemini for content generation. Software Design course final project.",
  },
];

// Smaller academic / secondary builds — a compact list.
export const groupMore: { title: string; stack: string; note: string }[] = [
  { title: "CampuSee", stack: "React Native · Supabase", note: "Backend developer." },
  { title: "WeatherSphere", stack: "C# · .NET WinForms", note: "OOP-2 final project." },
  { title: "CalculatorEmulator", stack: "C# · .NET WinForms", note: "OOP coursework." },
];
