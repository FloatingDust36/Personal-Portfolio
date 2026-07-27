import { skillTiers, currentlyLearning } from "@/content/skills";
import Marquee from "@/components/motion/Marquee";

/** Kinetic marquee of skills, one scrolling row per tier in alternating
 *  directions. Rows pause on hover; names brighten on hover. */
export default function SkillsMarquee() {
  return (
    <div className="border-t border-line">
      {skillTiers.map((tier, i) => (
        <div key={tier.name} className="border-b border-line py-7">
          <div className="mb-3 flex items-baseline gap-3 px-5 sm:px-8">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fg-muted">
              {tier.name}
            </span>
            <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-subtle sm:inline">
              — {tier.blurb}
            </span>
          </div>
          <Marquee reverse={i % 2 === 1} seconds={46 + i * 8}>
            {tier.items.map((s) => (
              <span
                key={s}
                className="flex items-center gap-10 font-display text-4xl font-light text-fg-muted transition-colors duration-300 hover:text-fg sm:text-6xl"
              >
                {s}
                <span className="text-2xl text-seal/70" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      ))}

      {/* Currently learning */}
      <div className="px-5 py-7 sm:px-8">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fg-subtle italic">
          {currentlyLearning.label}: {currentlyLearning.items.join(", ")} — not yet shipped
        </span>
      </div>
    </div>
  );
}
