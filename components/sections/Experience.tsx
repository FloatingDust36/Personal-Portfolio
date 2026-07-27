import { experience } from "@/content/experience";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

export default function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-line py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-fg-subtle">
            Experience
          </p>
        </Reveal>
        <SplitReveal
          as="h2"
          type="lines"
          className="mt-5 max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl"
        >
          Two internships, running now.
        </SplitReveal>

        <div className="mt-14 sm:mt-20">
          {experience.map((e, i) => (
            <Reveal key={e.org} delay={i * 0.05}>
              <article className="group grid gap-6 border-t border-line py-12 lg:grid-cols-[0.9fr_1.6fr] lg:gap-12">
                <div>
                  <span className="font-mono text-xs text-fg-subtle">
                    0{i + 1}
                  </span>
                  <SplitReveal
                    as="h3"
                    type="words"
                    stagger={0.06}
                    className="mt-2 font-display text-3xl font-light leading-tight text-fg sm:text-4xl"
                  >
                    {e.org}
                  </SplitReveal>
                  <p className="mt-3 text-fg-muted">{e.role}</p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                    {e.period}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                    {e.location}
                  </p>
                </div>

                <div>
                  <p className="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fg-subtle">
                    {e.focus}
                  </p>
                  <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted">
                    {e.summary}
                  </p>
                  {e.note && (
                    <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-subtle">
                      {e.note}
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
