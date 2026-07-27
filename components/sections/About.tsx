"use client";

import { useEffect, useRef } from "react";
import { education } from "@/content/education";
import { gsap } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

export default function About() {
  const listRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const trail = trailRef.current;
    if (!list) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // The ink trail draws itself as the journey scrolls through view.
      if (trail) {
        gsap.fromTo(
          trail,
          { drawSVG: "0% 0%" },
          {
            drawSVG: "0% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 68%",
              end: "bottom 78%",
              scrub: 0.6,
            },
          },
        );
      }

      // Each milestone: node blooms, text rises, year scrambles in.
      const nodes = gsap.utils.toArray<HTMLElement>("[data-milestone]", list);
      nodes.forEach((node) => {
        const dot = node.querySelector("[data-dot]");
        const rise = node.querySelectorAll("[data-rise]");
        const year = node.querySelector<HTMLElement>("[data-year]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: node, start: "top 78%", once: true },
        });
        if (dot) tl.from(dot, { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(2)" });
        tl.from(
          rise,
          { y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.3",
        );
        if (year) {
          const text = year.textContent ?? "";
          tl.to(
            year,
            { duration: 0.8, scrambleText: { text, chars: "0123456789", speed: 0.5 } },
            "-=0.5",
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  const last = education.milestones.length - 1;

  return (
    <section id="about" className="scroll-mt-20 border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Framing */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-fg-subtle">
                About — the climb
              </p>
            </Reveal>
            <SplitReveal
              as="h2"
              type="lines"
              className="mt-5 font-display text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl"
            >
              A decade of advanced tracks.
            </SplitReveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md leading-relaxed text-fg-muted">
                {education.lead}
              </p>
            </Reveal>
          </div>

          {/* The timeline. A two-column grid per row keeps the rail (trail +
              node) cleanly separate from the text, aligned at 14px. */}
          <div ref={listRef} className="relative">
            {/* Ink trail — the drawn line the nodes sit on, centered at x=14 */}
            <svg
              className="absolute inset-y-3 left-[6px] w-4"
              viewBox="0 0 16 100"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                ref={trailRef}
                d="M8,0 C7,20 9,40 8,60 C7,78 9,90 8,100"
                stroke="var(--fg-subtle)"
                strokeWidth="1.4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <ol>
              {education.milestones.map((m, i) => {
                const current = i === last;
                return (
                  <li
                    key={`${m.place}-${i}`}
                    data-milestone
                    className="grid grid-cols-[28px_1fr] gap-x-5 pb-14 last:pb-0 sm:gap-x-8"
                  >
                    {/* Rail column */}
                    <div className="relative">
                      <span
                        data-dot
                        className={`absolute left-[14px] top-[9px] h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-bg ${
                          current ? "bg-seal" : "bg-fg"
                        }`}
                      />
                    </div>

                    {/* Content column */}
                    <div>
                      {m.period && (
                        <p
                          data-rise
                          data-year
                          className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fg-subtle"
                        >
                          {m.period}
                        </p>
                      )}
                      <h3
                        data-rise
                        className="mt-1 font-display text-2xl font-light text-fg sm:text-3xl"
                      >
                        {m.credential}
                      </h3>
                      <p
                        data-rise
                        className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle"
                      >
                        {m.place}
                      </p>
                      {m.detail && (
                        <p data-rise className="mt-3 max-w-md leading-relaxed text-fg-muted">
                          {m.detail}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
