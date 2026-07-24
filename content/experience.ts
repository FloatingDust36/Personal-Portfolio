// Experience — verified from BRIEF §6.3. Do not grow the claims. The FlyRank
// capstone is intentionally left undescribed until John Peter confirms it.

export type Experience = {
  org: string;
  role: string;
  period: string;
  location: string;
  focus: string;
  summary: string;
  note?: string;
};

export const experience: Experience[] = [
  {
    org: "Lifewood Data Technology",
    role: "Intern, Batch 10",
    period: "June 2026 — Present",
    location: "Cebu · on-site",
    focus: "AI data engineering",
    summary:
      "Rotates through hands-on AI and data work rather than a fixed title. Built a production-plan analysis from a raw multilingual image-annotation dataset — pivot table, production plan, and summary — presented the findings, then rebuilt the analysis as a Power BI dashboard. Also produced AIGC image and video content, and contributed to two internal systems.",
    note: "See BuckedUp and Lumina in Projects.",
  },
  {
    org: "FlyRank AI Internship",
    role: "Backend AI Engineering track",
    period: "July 2026 — Present",
    location: "Remote · self-paced",
    focus: "Retrieval, structured outputs, agents",
    summary:
      "A track covering API contract design, retrieval-backed answer flows, structured outputs, tool-calling and agent workflows, and evaluation harnesses. Culminates in a capstone plus a verifiable credential.",
    note: "Capstone in progress.",
  },
];
