import { skillTiers, currentlyLearning } from "@/content/skills";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import SkillsConstellation from "@/components/ui/SkillsConstellation";

const LEGEND = [
  { name: "Working", size: 12, blurb: "Built real features" },
  { name: "Familiar", size: 9, blurb: "Used in a project" },
  { name: "Exposure", size: 7, blurb: "Coursework / one project" },
];

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
            A map of what he works with — hover a cluster to trace it.
          </p>
        </Reveal>

        {/* Constellation */}
        <Reveal delay={0.15}>
          <div className="relative mt-8 h-[62vh] min-h-[440px] w-full">
            <SkillsConstellation />
          </div>
        </Reveal>

        {/* Legend + currently learning */}
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
          {LEGEND.map((l) => (
            <div key={l.name} className="flex items-center gap-2.5">
              <span
                className="rounded-full bg-fg"
                style={{ width: l.size, height: l.size }}
              />
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-muted">
                {l.name}
              </span>
              <span className="hidden text-xs text-fg-subtle sm:inline">
                — {l.blurb}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full border border-dashed border-fg-subtle" />
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-subtle italic">
              {currentlyLearning.label}: {currentlyLearning.items.join(", ")}
            </span>
          </div>
        </div>

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
