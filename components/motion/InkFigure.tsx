/**
 * Original vector ink silhouette — a lone swordsman resting on a planted jian,
 * long hair and cloak streaming in the wind. Fills `currentColor`, so the
 * parent controls tone and opacity. Purely decorative.
 */
export default function InkFigure({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 360"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {/* Cloak draping and lifting in the wind, to the left */}
      <path
        d="M83,84 C59,98 45,122 25,140 C41,138 57,130 71,118 C59,136 45,152 31,163
           C57,152 83,124 96,101 Z"
        fillOpacity="0.9"
      />
      {/* Long hair streaming left */}
      <path
        d="M90,50 C73,53 59,61 43,63 C57,69 73,67 87,61 C71,73 57,87 41,97
           C59,91 81,75 95,59 Z"
        fillOpacity="0.95"
      />
      {/* Hairpin through the bun */}
      <path d="M112,33 l7,-3 l1.2,2.6 l-7,3 Z" />
      {/* Sword: hilt, guard, blade planted down and to the right */}
      <circle cx="127" cy="139" r="2.7" />
      <path d="M116,152 l15,-8 l1.7,3 l-15,8 Z" />
      <path d="M119,148 L167,305 L162,307 L114,152 Z" />
      {/* Robe and torso */}
      <path
        d="M85,66
           C79,72 77,82 79,98
           C74,150 70,210 60,268
           C56,290 50,306 46,320
           C72,331 100,331 122,324
           C132,320 139,312 143,298
           C137,248 131,182 125,120
           C123,98 121,80 115,68
           C107,61 93,61 85,66 Z"
      />
      {/* Head + bun */}
      <ellipse cx="100" cy="52" rx="11" ry="13" />
      <circle cx="107" cy="40" r="5.6" />
      {/* Ink splatter drifting off the windward side */}
      <circle cx="34" cy="300" r="2.2" fillOpacity="0.5" />
      <circle cx="24" cy="286" r="1.5" fillOpacity="0.4" />
      <circle cx="16" cy="298" r="1" fillOpacity="0.35" />
    </svg>
  );
}
