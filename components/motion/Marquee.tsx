import type { ReactNode } from "react";

/**
 * Infinite CSS marquee. Content is duplicated and translated -50%, so it loops
 * seamlessly. Pauses on hover (so links inside stay clickable) and freezes under
 * reduced motion via the global animation rule.
 */
export default function Marquee({
  children,
  seconds = 40,
  reverse = false,
  className,
}: {
  children: ReactNode;
  seconds?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`group flex overflow-hidden ${className ?? ""}`}>
      <div
        className="flex shrink-0 items-center gap-10 pr-10 [animation:marquee_var(--dur)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{
          // @ts-expect-error CSS custom properties
          "--dur": `${seconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="flex shrink-0 items-center gap-10 pr-10 [animation:marquee_var(--dur)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{
          // @ts-expect-error CSS custom properties
          "--dur": `${seconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
    </div>
  );
}
