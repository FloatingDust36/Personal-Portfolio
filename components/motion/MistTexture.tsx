/**
 * Procedural ink-cloud mist via SVG fractal noise, tinted with the mist token
 * (identical in both themes, so it reads on paper and on ink alike). Static —
 * depth comes from parallax on the parent, not from re-generating noise.
 */
export default function MistTexture({
  seed = 4,
  frequency = "0.009 0.014",
  opacity = 0.55,
  className,
}: {
  seed?: number;
  frequency?: string;
  opacity?: number;
  className?: string;
}) {
  const id = `mist-${seed}`;
  return (
    <svg
      className={className}
      style={{ opacity }}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={4}
          seed={seed}
          stitchTiles="stitch"
          result="noise"
        />
        {/* Fix RGB to the mist grey (#676c73) and derive a wispy alpha from the
            noise luminance. */}
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0 0 0 0 0.404
                  0 0 0 0 0.424
                  0 0 0 0 0.451
                  0.85 0 0 0 -0.32"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
