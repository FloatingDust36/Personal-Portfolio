// Awards — verified from BRIEF §6.6. Recognition is grouped by education level;
// credentials by category. The competitive-programming placement is featured:
// it is live-contest evidence of unassisted coding ability. Nothing invented —
// high-school entries reflect selection into DepEd's advanced science tracks.

export type Award = { title: string; detail?: string; year?: string };
export type Cert = { name: string; issuer: string; url?: string; when?: string; done: boolean };

// The flagship, called out on its own.
export const featured = {
  placement: "1st Runner-Up",
  subject: "Competitive Programming (Python)",
  detail: 'CpE Regional Challenge, "AutoMATHic," UP Civil Engineering Society',
  year: "2026",
};

export const recognition: { level: string; items: Award[] }[] = [
  {
    level: "Elementary",
    items: [
      {
        title: "Valedictorian",
        detail: "Graduated With High Honors · Lambusan Elementary School",
      },
    ],
  },
  {
    level: "High School",
    items: [
      {
        title: "STE Program · Junior High",
        detail:
          "Selected into a DepEd special curricular science and research program · San Remigio NHS",
      },
      {
        title: "STEM Strand · Senior High",
        detail: "Science, Technology, Engineering and Mathematics · San Remigio NHS",
      },
    ],
  },
  {
    level: "College",
    items: [
      { title: "Top 10 Finalist", detail: "MCIA CEB-i Hacks Hackathon", year: "2026" },
      {
        title: "Shortlisted Finalist — Top 28",
        detail: 'IBPAP "Can You HackIT" Hackathon',
        year: "2024",
      },
      {
        title: "DOST-SEI RA 7687 Scholar",
        detail: "Competitive national science and technology undergraduate scholarship",
        year: "2023",
      },
      { title: "Consistent Dean's List", detail: "Cebu Institute of Technology — University" },
      { title: "On track for Magna Cum Laude", detail: "Based on current standing" },
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
