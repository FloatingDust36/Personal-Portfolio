// Dusk's knowledge context is assembled from the SAME typed content the page
// renders from, so the assistant and the site can never contradict each other.
// Nothing here is hand-written background — it is a serialization of §6 content.

import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { groupA, groupB, groupMore } from "@/content/projects";
import { skillTiers, currentlyLearning } from "@/content/skills";
import { featured, recognition, credentials } from "@/content/awards";

export function buildKnowledgeContext(): string {
  const lines: string[] = [];

  lines.push("# John Peter D. Pestaño — knowledge base");
  lines.push(
    `Location: ${profile.location}. Email: ${profile.email}. GitHub: ${profile.githubHandle}. LinkedIn available.`,
  );
  lines.push(`Positioning: ${profile.positioning}`);
  lines.push(`Availability: ${profile.availability}`);

  lines.push("\n## Education / progression");
  lines.push(education.lead);
  for (const m of education.milestones) {
    lines.push(
      `- ${m.credential}${m.period ? ` (${m.period})` : ""} — ${m.place}. ${m.detail ?? ""}`.trim(),
    );
  }

  lines.push("\n## Experience");
  for (const e of experience) {
    lines.push(`### ${e.org} — ${e.role} (${e.period}, ${e.location})`);
    lines.push(e.summary);
    if (e.note) lines.push(`Note: ${e.note}`);
  }

  lines.push("\n## Projects — Lifewood internship systems (repositories not public)");
  for (const p of groupA) lines.push(projectLine(p));

  lines.push("\n## Projects — personal & academic");
  for (const p of groupB) lines.push(projectLine(p));
  lines.push(
    "Smaller builds: " +
      groupMore.map((m) => `${m.title} (${m.stack}, ${m.note})`).join("; "),
  );

  lines.push("\n## Skills — by honest proficiency tier");
  for (const t of skillTiers) {
    lines.push(`${t.name} (${t.blurb}): ${t.items.join(", ")}.`);
  }
  lines.push(
    `${currentlyLearning.label} (not yet used in a shipped project): ${currentlyLearning.items.join(", ")}.`,
  );

  lines.push("\n## Recognition & credentials");
  lines.push(
    `Flagship: ${featured.placement}, ${featured.subject} (${featured.year}) — ${featured.detail}. This was a live contest.`,
  );
  for (const g of recognition) {
    lines.push(
      `${g.level}: ` +
        g.items
          .map((a) => `${a.title}${a.year ? ` (${a.year})` : ""}${a.detail ? ` — ${a.detail}` : ""}`)
          .join("; "),
    );
  }
  for (const g of credentials) {
    lines.push(
      `Credentials — ${g.category}: ` +
        g.items
          .map((c) => `${c.name} (${c.issuer}${c.done ? c.when ? `, ${c.when}` : "" : ", in progress"})`)
          .join("; "),
    );
  }

  return lines.join("\n");
}

function projectLine(p: {
  title: string;
  role: string;
  stack: string[];
  blurb: string;
  note?: string;
  repo?: string;
}): string {
  return [
    `### ${p.title}`,
    `Role: ${p.role}`,
    `Stack: ${p.stack.join(", ")}.`,
    p.blurb,
    p.note ? `Note: ${p.note}` : "",
    p.repo ? `Repo: ${p.repo}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
