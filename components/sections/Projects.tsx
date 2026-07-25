"use client";

import { useEffect, useRef } from "react";
import { groupA, groupB, groupMore } from "@/content/projects";
import { gsap } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import ProjectPanel from "@/components/ui/ProjectPanel";

const panels = [
  ...groupA.map((p) => ({ p, tag: "Lifewood · internal" })),
  ...groupB.map((p) => ({ p, tag: "Personal / academic" })),
];

export default function Projects() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    // Horizontal pin only on wide screens with motion allowed; otherwise the
    // markup is a normal vertical stack and no JS runs.
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;

        const distance = () => track.scrollWidth - pin.offsetWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current)
                progressRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section id="projects" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-28 sm:px-8 sm:pt-36">
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
        <Reveal delay={0.1}>
          <p className="mt-6 hidden font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fg-subtle lg:block">
            Keep scrolling to move through the work →
          </p>
        </Reveal>
      </div>

      {/* Pinned horizontal gallery on desktop; vertical stack elsewhere */}
      <div
        ref={pinRef}
        className="relative mt-12 lg:mt-16 lg:flex lg:h-screen lg:items-center lg:overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-16 px-5 sm:px-8 lg:h-[74vh] lg:flex-row lg:items-stretch lg:gap-12 lg:px-[8vw]"
        >
          {panels.map(({ p, tag }, i) => (
            <ProjectPanel key={p.title} project={p} index={i} tag={tag} />
          ))}
        </div>

        {/* Scrub progress line (desktop) */}
        <div className="pointer-events-none absolute inset-x-[8vw] bottom-8 hidden h-px bg-line lg:block">
          <div
            ref={progressRef}
            className="h-full origin-left bg-seal"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Smaller builds */}
      <div className="mx-auto max-w-6xl px-5 pb-28 sm:px-8 sm:pb-36">
        <Reveal>
          <h3 className="mt-24 font-mono text-xs uppercase tracking-[0.24em] text-fg-muted lg:mt-16">
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
