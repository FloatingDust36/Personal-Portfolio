// Identity and contact. Verified from BRIEF §6.1 / §6.2.
// Never add facts here that are not confirmed in the BRIEF or by John Peter.

export const profile = {
  name: "John Peter D. Pestaño",
  shortName: "John Peter Pestaño",
  initials: "JP",
  role: "AI/ML Engineer",
  location: "Cebu, Philippines",

  // BRIEF §6.2 — claims must not grow beyond this line.
  positioning:
    "Computer Engineering student building AI systems that ship — agentic tool-calling, retrieval pipelines, and the backends that hold them together.",
  availability: "Open to part-time, remote roles.",

  email: "johnpeter.diongzon.pestano@gmail.com",
  phone: "(+63) 960 672 8563",
  github: "https://github.com/FloatingDust36",
  githubHandle: "FloatingDust36",
  linkedin: "https://www.linkedin.com/in/john-peter-pestaño/",
} as const;

export type Profile = typeof profile;
