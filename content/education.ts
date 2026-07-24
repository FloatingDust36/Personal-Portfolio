// Education / progression — verified from BRIEF §6.4. The story is the pattern:
// consistent selection into advanced tracks over more than a decade.

export type Milestone = {
  place: string;
  credential: string;
  detail?: string;
  period?: string;
};

export const education = {
  lead:
    "A Computer Engineering student at Cebu Institute of Technology — University, graduating May 2027. The through-line is a decade of selection into advanced tracks — from valedictorian to a Magna Cum Laude trajectory.",

  // Oldest → newest, so the journey climbs as you scroll.
  milestones: [
    {
      place: "Lambusan Elementary School",
      credential: "Valedictorian",
      detail: "Graduated With High Honors.",
    },
    {
      place: "San Remigio National High School",
      credential: "STE Program · Junior High",
      detail:
        "A DepEd special curricular program — a selective science and research track.",
    },
    {
      place: "San Remigio National High School",
      credential: "STEM Strand · Senior High",
      detail: "Science, Technology, Engineering, and Mathematics.",
    },
    {
      place: "DOST-SEI Scholarship",
      credential: "RA 7687 Scholar",
      period: "2023",
      detail:
        "A competitive national science and technology undergraduate scholarship.",
    },
    {
      place: "Cebu Institute of Technology — University",
      credential: "BS Computer Engineering",
      period: "Expected May 2027",
      detail: "Consistent Dean's List; on track for Magna Cum Laude.",
    },
  ] as Milestone[],
};
