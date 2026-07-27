"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { skillTiers, currentlyLearning } from "@/content/skills";

// Proficiency reads off the honest tier, not a fabricated per-skill number.
const LEVEL: Record<string, number> = { Working: 0.9, Familiar: 0.62, Exposure: 0.4 };
// A soft right edge on the ink bar, done with a background gradient (reliable
// across browsers, unlike a CSS mask).
const INK = "linear-gradient(to right, var(--fg) 82%, color-mix(in srgb, var(--fg) 15%, transparent))";

export default function SkillsMeters() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // One ScrollTrigger per tier group (not per bar) to keep setup cheap.
      const groups = gsap.utils.toArray<HTMLElement>("[data-tier-group]", root);
      groups.forEach((group) => {
        const fills = gsap.utils.toArray<HTMLElement>("[data-fill]", group);
        gsap.set(fills, { scaleX: 0 });
        gsap.to(fills, {
          scaleX: (_i, t) => Number((t as HTMLElement).dataset.level ?? 0.5),
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  const Bar = ({ level }: { level: number }) => (
    <span className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-line">
      <span
        data-fill
        data-level={level}
        className="absolute inset-0 block origin-left rounded-full"
        style={{ transform: `scaleX(${level})`, backgroundImage: INK }}
      />
    </span>
  );

  return (
    <div ref={rootRef} className="space-y-14">
      {skillTiers.map((tier) => {
        const level = LEVEL[tier.name] ?? 0.5;
        return (
          <div key={tier.name}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
              <h3 className="font-display text-2xl font-light text-fg">{tier.name}</h3>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-subtle">
                {tier.blurb}
              </span>
            </div>
            <div data-tier-group className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {tier.items.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="w-[46%] shrink-0 truncate text-sm text-fg-muted">
                    {item}
                  </span>
                  <Bar level={level} />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Currently learning — an empty, dashed track */}
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
          <h3 className="font-display text-2xl font-light italic text-fg-muted">
            {currentlyLearning.label}
          </h3>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-subtle">
            Not yet shipped
          </span>
        </div>
        <div className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {currentlyLearning.items.map((item) => (
            <div key={item} className="flex items-center gap-4">
              <span className="w-[46%] shrink-0 truncate text-sm text-fg-subtle">
                {item}
              </span>
              <span className="h-[6px] flex-1 rounded-full border border-dashed border-fg-subtle/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
