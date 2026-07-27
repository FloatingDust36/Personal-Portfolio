import { skillTiers, currentlyLearning } from "@/content/skills";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import SkillsConstellation from "@/components/ui/SkillsConstellation";
import SkillsMeters from "@/components/ui/SkillsMeters";

// Swap this to compare treatments: "constellation" | "meters".
const VARIANT: "constellation" | "meters" = "meters";

const HINT: Record<string, string> = {
  constellation: "A map of what he works with — hover a cluster to trace it.",
  meters: "Grouped by how deeply he's worked with each — honest, not inflated.",
};

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-fg-subtle">
            Skills
          </p>
        </Reveal>
        <SplitReveal
          as="h2"
          type="lines"
          className="mt-5 max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl"
        >
          Honest about the depth.
        </SplitReveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fg-subtle">
            {HINT[VARIANT]}
          </p>
        </Reveal>

        {VARIANT === "constellation" ? (
          <Reveal delay={0.15}>
            <div className="relative mt-8 h-[62vh] min-h-[440px] w-full">
              <SkillsConstellation />
            </div>
          </Reveal>
        ) : (
          <div className="mt-12">
            <SkillsMeters />
          </div>
        )}

        {/* Accessible, crawlable fallback of the same content */}
        <div className="sr-only">
          {skillTiers.map((t) => (
            <p key={t.name}>
              {t.name} ({t.blurb}): {t.items.join(", ")}.
            </p>
          ))}
          <p>
            {currentlyLearning.label}: {currentlyLearning.items.join(", ")}.
          </p>
        </div>
      </div>
    </section>
  );
}
