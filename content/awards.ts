// Awards & credentials — verified from BRIEF §6.6. Only these exist. The
// competitive-programming placement leads: it is live-contest evidence of
// unassisted coding ability and the strongest single credential.

export type Award = { title: string; detail?: string; year?: string };
export type Cert = { name: string; when?: string; url?: string };

export const competitions: Award[] = [
  {
    title: "1st Runner-Up — Competitive Programming (Python)",
    detail: 'CpE Regional Challenge, "AutoMATHic," UP Civil Engineering Society',
    year: "2026",
  },
  {
    title: "Top 10 Finalist",
    detail: "MCIA CEB-i Hacks Hackathon",
    year: "2026",
  },
  {
    title: "Shortlisted Finalist — Top 28",
    detail: 'IBPAP "Can You HackIT" Hackathon',
    year: "2024",
  },
];

export const scholarship: Award[] = [
  {
    title: "DOST-SEI RA 7687 Scholar",
    detail:
      "Competitive national science and technology undergraduate scholarship",
    year: "2023",
  },
];

export const academicHonors: string[] = [
  "Dean's List — consistent",
  "On track for Magna Cum Laude",
  "Valedictorian — elementary",
];

export const certifications: Cert[] = [
  { name: "DataCamp — Associate Python Developer (career track)", when: "March 2026" },
  {
    name: "Anthropic — AI Fluency: Framework & Foundations",
    url: "https://verify.skilljar.com/c/xtccmegt54ub",
  },
  { name: "Anthropic — Claude 101", url: "https://verify.skilljar.com/c/o2tsfixw7uon" },
  { name: "Anthropic — Claude Code 101", url: "https://verify.skilljar.com/c/ke56o447ykhp" },
  {
    name: "Anthropic — Claude Code in Action",
    url: "https://verify.skilljar.com/c/8mc3rnosvkti",
  },
  {
    name: "Cisco Networking Academy — Introduction to Packet Tracer",
    url: "https://www.credly.com/badges/4d530872-5301-46e6-8221-de4505d5e427/public_url",
  },
];

export const certsInProgress: string[] = [
  "DataCamp — Associate Data Scientist in Python",
  "DataCamp — Associate AI Engineer for Developers",
  "freeCodeCamp — Responsive Web Design",
  "freeCodeCamp — Python",
];
