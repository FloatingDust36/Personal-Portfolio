// Awards — his actual medals/placements, NOT the education milestones (those
// live in the About climb). Recognition is a tabbed set by level; each award
// has room for a description and photos. Elementary and high-school lists are
// intentionally ready to fill — John Peter has many to add. Nothing invented.

export type Award = {
  title: string;
  org?: string;
  year?: string;
  description?: string;
  images?: string[]; // paths in /public/awards; a placeholder shows if empty
};

export type Cert = {
  name: string;
  issuer: string;
  url?: string;
  when?: string;
  done: boolean;
  images?: string[]; // certificate photo(s) in /public/certs
};

export const recognition: { level: string; items: Award[] }[] = [
  {
    // Add elementary medals/awards here — title, year, description, images.
    level: "Elementary",
    items: [],
  },
  {
    // Add high-school medals/awards here.
    level: "High School",
    items: [],
  },
  {
    level: "College",
    items: [
      {
        title: "1st Runner-Up — Competitive Programming (Python)",
        org: 'CpE Regional Challenge, "AutoMATHic," UP Civil Engineering Society',
        year: "2026",
        description: "A live, timed programming contest.",
      },
      {
        title: "Top 10 Finalist",
        org: "MCIA CEB-i Hacks Hackathon",
        year: "2026",
      },
      {
        title: "Shortlisted Finalist — Top 28",
        org: 'IBPAP "Can You HackIT" Hackathon',
        year: "2024",
      },
    ],
  },
];

export const credentials: { category: string; items: Cert[] }[] = [
  {
    category: "AI & LLMs",
    items: [
      {
        name: "AI Fluency: Framework & Foundations",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/xtccmegt54ub",
        done: true,
      },
      { name: "Claude 101", issuer: "Anthropic", url: "https://verify.skilljar.com/c/o2tsfixw7uon", done: true },
      { name: "Claude Code 101", issuer: "Anthropic", url: "https://verify.skilljar.com/c/ke56o447ykhp", done: true },
      { name: "Claude Code in Action", issuer: "Anthropic", url: "https://verify.skilljar.com/c/8mc3rnosvkti", done: true },
    ],
  },
  {
    category: "Data & Python",
    items: [
      { name: "Associate Python Developer", issuer: "DataCamp", when: "Mar 2026", done: true },
      { name: "Associate Data Scientist in Python", issuer: "DataCamp", done: false },
      { name: "Associate AI Engineer for Developers", issuer: "DataCamp", done: false },
    ],
  },
  {
    category: "Web",
    items: [
      { name: "Responsive Web Design", issuer: "freeCodeCamp", done: false },
      { name: "Python", issuer: "freeCodeCamp", done: false },
    ],
  },
  {
    category: "Networking",
    items: [
      {
        name: "Introduction to Packet Tracer",
        issuer: "Cisco Networking Academy",
        url: "https://www.credly.com/badges/4d530872-5301-46e6-8221-de4505d5e427/public_url",
        done: true,
      },
    ],
  },
];
