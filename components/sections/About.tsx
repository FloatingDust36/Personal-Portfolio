import { education } from "@/content/education";
import Reveal from "@/components/motion/Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-line py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Framing */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-fg-subtle">
                About
              </p>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl">
                A decade of advanced tracks.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-fg-muted">
                {education.lead}
              </p>
            </Reveal>
          </div>

          {/* Progression */}
          <ol className="relative border-l border-line pl-8 sm:pl-10">
            {education.milestones.map((m, i) => {
              const current = i === education.milestones.length - 1;
              return (
                <li key={`${m.place}-${i}`} className="relative pb-12 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={`absolute top-1.5 h-2.5 w-2.5 -translate-x-[calc(2rem+1px)] rounded-full sm:-translate-x-[calc(2.5rem+1px)] ${
                      current ? "bg-fg" : "bg-fg-subtle"
                    }`}
                  />
                  <Reveal delay={i * 0.04}>
                    {m.period && (
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fg-subtle">
                        {m.period}
                      </p>
                    )}
                    <h3 className="mt-1 font-display text-2xl font-light text-fg">
                      {m.credential}
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">
                      {m.place}
                    </p>
                    {m.detail && (
                      <p className="mt-3 max-w-md leading-relaxed text-fg-muted">
                        {m.detail}
                      </p>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
