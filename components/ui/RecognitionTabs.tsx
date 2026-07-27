"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { recognition } from "@/content/awards";

export default function RecognitionTabs() {
  const [active, setActive] = useState(
    Math.max(0, recognition.findIndex((g) => g.items.length > 0)),
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (i + 1) % recognition.length
        : (i - 1 + recognition.length) % recognition.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const group = recognition[active];

  return (
    <div className="mt-8">
      {/* Tabs */}
      <div role="tablist" aria-label="Recognition by level" className="flex flex-wrap gap-6 border-b border-line">
        {recognition.map((g, i) => (
          <button
            key={g.level}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`rec-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`rec-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`group relative -mb-px pb-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
              active === i ? "text-fg" : "text-fg-subtle hover:text-fg-muted"
            }`}
          >
            {g.level}
            <span className="ml-1.5 text-[0.6rem] text-fg-subtle">{g.items.length}</span>
            <span
              className={`absolute inset-x-0 -bottom-px h-px origin-left bg-seal transition-transform duration-500 ease-[var(--ease-settle)] ${
                active === i ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        id={`rec-panel-${active}`}
        aria-labelledby={`rec-tab-${active}`}
        className="mt-10"
      >
        {group.items.length === 0 ? (
          <div className="flex min-h-[180px] items-center rounded-sm border border-dashed border-line px-8 py-12">
            <p className="max-w-md text-sm leading-relaxed text-fg-subtle">
              {group.level} awards are being compiled — the medals and placements
              from this level will appear here soon.
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {group.items.map((a) => (
              <article
                key={a.title}
                className="grid gap-8 border-b border-line pb-14 last:border-0 last:pb-0 lg:grid-cols-2 lg:gap-12"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-surface/40">
                  {a.images && a.images[0] ? (
                    <Image
                      src={a.images[0]}
                      alt={`${a.title} — ${a.org ?? ""}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(130% 110% at 80% 85%, color-mix(in srgb, var(--fg) 14%, transparent), transparent 58%)",
                        }}
                      />
                      <span className="absolute bottom-5 left-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fg-subtle">
                        Photo forthcoming
                      </span>
                    </>
                  )}
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center">
                  {a.year && (
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
                      {a.year}
                    </p>
                  )}
                  <h4 className="mt-2 font-display text-3xl font-light leading-tight text-fg sm:text-4xl">
                    {a.title}
                  </h4>
                  {a.org && <p className="mt-2 text-fg-muted">{a.org}</p>}
                  {a.description && (
                    <p className="mt-4 max-w-md leading-relaxed text-fg-muted">
                      {a.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
