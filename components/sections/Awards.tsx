"use client";

import { useEffect, useRef } from "react";
import {
  competitions,
  scholarship,
  academicHonors,
  certifications,
  certsInProgress,
} from "@/content/awards";
import { gsap } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Marquee from "@/components/motion/Marquee";

const [feature, ...restCompetitions] = competitions;
const [featPlacement, featSubject] = feature.title.split(" — ");

export default function Awards() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-scramble]", root).forEach((elArr) => {
        const el = elArr;
        const text = el.textContent ?? "";
        gsap.to(el, {
          duration: 1,
          scrambleText: { text, chars: "0123456789", speed: 0.4 },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="awards"
      className="scroll-mt-20 border-t border-line py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-fg-subtle">
            Awards
          </p>
        </Reveal>
        <SplitReveal
          as="h2"
          type="lines"
          className="mt-5 max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl"
        >
          Recognition &amp; credentials.
        </SplitReveal>

        {/* Featured — the live-contest win leads */}
        <Reveal delay={0.05}>
          <div className="mt-14 grid gap-8 border-y border-line py-10 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 rotate-[-3deg] place-items-center rounded-[4px] bg-seal font-display text-lg font-medium leading-none text-paper">
                JP
              </span>
              <span
                data-scramble
                className="font-mono text-sm uppercase tracking-[0.2em] text-fg-subtle"
              >
                {feature.year}
              </span>
            </div>
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fg-subtle">
                Competition · live contest
              </p>
              <h3 className="mt-2 font-display text-4xl font-light leading-[1.02] text-fg sm:text-6xl">
                {featPlacement}
              </h3>
              <p className="mt-2 text-lg text-fg-muted">{featSubject}</p>
              <p className="mt-1 text-sm text-fg-subtle">{feature.detail}</p>
            </div>
          </div>
        </Reveal>

        {/* Remaining competitions */}
        <ul className="divide-y divide-line border-b border-line">
          {restCompetitions.map((c) => (
            <Reveal key={c.title}>
              <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                <div className="max-w-2xl">
                  <p className="font-display text-xl font-light text-fg">{c.title}</p>
                  {c.detail && (
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{c.detail}</p>
                  )}
                </div>
                {c.year && (
                  <span
                    data-scramble
                    className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle"
                  >
                    {c.year}
                  </span>
                )}
              </li>
            </Reveal>
          ))}
        </ul>

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
                        <span
                          data-scramble
                          className="ml-2 font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle"
                        >
                          {s.year}
                        </span>
                      )}
                    </p>
                    {s.detail && (
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{s.detail}</p>
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

          {/* In-progress certifications */}
          <Reveal>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
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

      {/* Certifications marquee — full-bleed band */}
      <Reveal>
        <div className="mt-16 border-y border-line py-5">
          <Marquee seconds={55}>
            {certifications.map((c) =>
              c.url ? (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.14em] text-fg-muted transition-colors hover:text-fg"
                >
                  <span className="h-1 w-1 rounded-full bg-seal" aria-hidden="true" />
                  {c.name} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span
                  key={c.name}
                  className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle"
                >
                  <span className="h-1 w-1 rounded-full bg-seal" aria-hidden="true" />
                  {c.name}
                  {c.when ? ` · ${c.when}` : ""}
                </span>
              ),
            )}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
