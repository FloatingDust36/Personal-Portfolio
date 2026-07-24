import { skillTiers, currentlyLearning } from "@/content/skills";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

export default function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-line py-28 sm:py-36"
    >
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

        <div className="mt-14 space-y-px">
          {skillTiers.map((tier) => (
            <Reveal key={tier.name}>
              <div className="grid gap-5 border-t border-line py-10 lg:grid-cols-[0.8fr_2fr] lg:gap-12">
                <div>
                  <h3 className="font-display text-2xl font-light text-fg">
                    {tier.name}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-fg-subtle">
                    {tier.blurb}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2 self-start">
                  {tier.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {/* Currently learning — clearly separated from actual skills */}
          <Reveal>
            <div className="grid gap-5 border-t border-line py-10 lg:grid-cols-[0.8fr_2fr] lg:gap-12">
              <div>
                <h3 className="font-display text-2xl font-light italic text-fg-muted">
                  {currentlyLearning.label}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-fg-subtle">
                  In progress — not yet used in a shipped project.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2 self-start">
                {currentlyLearning.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-dashed border-line px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-subtle"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
