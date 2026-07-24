import {
  competitions,
  scholarship,
  academicHonors,
  certifications,
  certsInProgress,
} from "@/content/awards";
import Reveal from "@/components/motion/Reveal";

export default function Awards() {
  return (
    <section
      id="awards"
      className="scroll-mt-20 border-t border-line py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-fg-subtle">
            Awards
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl">
            Recognition &amp; credentials.
          </h2>
        </Reveal>

        {/* Competitions — lead; live-contest proof sits first */}
        <Reveal>
          <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
            Competitions
          </h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {competitions.map((c) => (
              <li
                key={c.title}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
              >
                <div className="max-w-2xl">
                  <p className="font-display text-xl font-light text-fg">
                    {c.title}
                  </p>
                  {c.detail && (
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                      {c.detail}
                    </p>
                  )}
                </div>
                {c.year && (
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                    {c.year}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Scholarship + academic */}
          <Reveal>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
                Scholarship
              </h3>
              <ul className="mt-5 space-y-4">
                {scholarship.map((s) => (
                  <li key={s.title}>
                    <p className="font-display text-lg font-light text-fg">
                      {s.title}
                      {s.year && (
                        <span className="ml-2 font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">
                          {s.year}
                        </span>
                      )}
                    </p>
                    {s.detail && (
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                        {s.detail}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
                Academic
              </h3>
              <ul className="mt-5 space-y-2">
                {academicHonors.map((a) => (
                  <li key={a} className="text-fg-muted">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Certifications + in progress */}
          <Reveal>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
                Certifications
              </h3>
              <ul className="mt-5 space-y-3">
                {certifications.map((c) => (
                  <li key={c.name} className="leading-relaxed">
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-baseline gap-1.5 text-fg-muted transition-colors hover:text-fg"
                      >
                        {c.name}
                        <span
                          className="font-mono text-xs text-fg-subtle transition-colors group-hover:text-seal"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </a>
                    ) : (
                      <span className="text-fg-muted">
                        {c.name}
                        {c.when && (
                          <span className="ml-2 font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">
                            {c.when}
                          </span>
                        )}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
                In progress
              </h3>
              <ul className="mt-5 space-y-2">
                {certsInProgress.map((c) => (
                  <li key={c} className="text-fg-subtle">
                    {c}
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
