import { groupA, groupB, groupMore } from "@/content/projects";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-20 border-t border-line py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-fg-subtle">
            Projects
          </p>
        </Reveal>
        <SplitReveal
          as="h2"
          type="lines"
          className="mt-5 max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl"
        >
          Systems built to ship.
        </SplitReveal>

        {/* Group A — internship systems */}
        <Reveal>
          <div className="mt-20 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
              Internship systems · Lifewood
            </h3>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-subtle">
              Internal — repositories not public
            </p>
          </div>
        </Reveal>
        <div className="mt-6">
          {groupA.map((p, i) => (
            <Reveal key={p.title}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Group B — personal and academic */}
        <Reveal>
          <h3 className="mt-24 font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
            Personal &amp; academic
          </h3>
        </Reveal>
        <div className="mt-6">
          {groupB.map((p, i) => (
            <Reveal key={p.title}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Smaller builds */}
        <Reveal>
          <h3 className="mt-24 font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
            Also
          </h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {groupMore.map((m) => (
              <li
                key={m.title}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
              >
                <span className="font-display text-xl font-light text-fg">
                  {m.title}
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-subtle">
                  {m.stack}
                </span>
                <span className="w-full text-sm text-fg-muted sm:w-auto">
                  {m.note}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
