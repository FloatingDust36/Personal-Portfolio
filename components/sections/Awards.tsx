"use client";

import { useEffect, useRef } from "react";
import { featured, recognition, credentials } from "@/content/awards";
import { gsap } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

export default function Awards() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-scramble]", root).forEach((el) => {
        const text = el.textContent ?? "";
        gsap.to(el, {
          duration: 1,
          scrambleText: { text, chars: "0123456789", speed: 0.4 },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
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

        {/* Featured — the live-contest win */}
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
                {featured.year}
              </span>
            </div>
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fg-subtle">
                Competition · live contest
              </p>
              <h3 className="mt-2 font-display text-4xl font-light leading-[1.02] text-fg sm:text-6xl">
                {featured.placement}
              </h3>
              <p className="mt-2 text-lg text-fg-muted">{featured.subject}</p>
              <p className="mt-1 text-sm text-fg-subtle">{featured.detail}</p>
            </div>
          </div>
        </Reveal>

        {/* Recognition — by education level */}
        <Reveal>
          <h3 className="mt-20 font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
            Recognition
          </h3>
        </Reveal>
        <div className="mt-8 grid gap-10 lg:grid-cols-3 lg:gap-12">
          {recognition.map((group) => (
            <Reveal key={group.level}>
              <div>
                <p className="border-b border-line pb-3 font-display text-xl font-light text-fg">
                  {group.level}
                </p>
                <ul className="mt-5 space-y-6">
                  {group.items.map((a) => (
                    <li key={a.title}>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-mono text-[0.78rem] uppercase tracking-[0.1em] text-fg">
                          {a.title}
                        </p>
                        {a.year && (
                          <span
                            data-scramble
                            className="shrink-0 font-mono text-[0.7rem] tracking-[0.14em] text-fg-subtle"
                          >
                            {a.year}
                          </span>
                        )}
                      </div>
                      {a.detail && (
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                          {a.detail}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Credentials — by category */}
        <Reveal>
          <h3 className="mt-24 font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
            Credentials
          </h3>
        </Reveal>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:gap-x-16">
          {credentials.map((group) => (
            <Reveal key={group.category}>
              <div>
                <p className="border-b border-line pb-3 font-display text-xl font-light text-fg">
                  {group.category}
                </p>
                <ul className="mt-5 space-y-4">
                  {group.items.map((c) => (
                    <li key={c.name} className="flex items-baseline justify-between gap-4">
                      <div>
                        {c.url ? (
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-baseline gap-1.5 text-fg-muted transition-colors hover:text-fg"
                          >
                            {c.name}
                            <span className="text-xs text-fg-subtle group-hover:text-seal" aria-hidden="true">
                              ↗
                            </span>
                          </a>
                        ) : (
                          <span className="text-fg-muted">{c.name}</span>
                        )}
                        <span className="ml-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-subtle">
                          {c.issuer}
                        </span>
                      </div>
                      <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg-subtle">
                        {c.done ? (c.when ?? "Done") : "In progress"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
