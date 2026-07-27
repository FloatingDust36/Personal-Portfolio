"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { recognition, type Award } from "@/content/awards";
import Lightbox from "@/components/ui/Lightbox";

export default function RecognitionTabs() {
  const [active, setActive] = useState(
    Math.max(0, recognition.findIndex((g) => g.items.length > 0)),
  );
  const [lb, setLb] = useState<{ images: string[]; alt: string } | null>(null);
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
      <div role="tabpanel" id={`rec-panel-${active}`} aria-labelledby={`rec-tab-${active}`} className="mt-8">
        {group.items.length === 0 ? (
          <p className="max-w-md text-sm leading-relaxed text-fg-subtle">
            {group.level} awards are being compiled — the medals and placements
            from this level will appear here soon.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {group.items.map((a) => (
              <li key={a.title}>
                <Row award={a} onOpen={(images) => setLb({ images, alt: a.title })} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {lb && <Lightbox images={lb.images} alt={lb.alt} onClose={() => setLb(null)} />}
    </div>
  );
}

function Row({ award: a, onOpen }: { award: Award; onOpen: (images: string[]) => void }) {
  const imgs = a.images ?? [];
  return (
    <article className="grid grid-cols-[110px_1fr] gap-5 py-7 sm:grid-cols-[150px_1fr] sm:gap-8">
      {/* Compact thumbnail */}
      {imgs.length > 0 ? (
        <button
          type="button"
          onClick={() => onOpen(imgs)}
          aria-label={`View photos of ${a.title}`}
          className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-line"
        >
          <Image
            src={imgs[0]}
            alt={`${a.title}${a.org ? ` — ${a.org}` : ""}`}
            fill
            sizes="150px"
            className="object-cover transition-transform duration-500 ease-[var(--ease-settle)] group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-fg/0 transition-colors duration-300 group-hover:bg-fg/10" />
          {imgs.length > 1 && (
            <span className="absolute bottom-1.5 right-1.5 rounded-full bg-bg/85 px-2 py-0.5 font-mono text-[0.55rem] tracking-wide text-fg-muted backdrop-blur-sm">
              +{imgs.length - 1}
            </span>
          )}
        </button>
      ) : (
        <div className="grid aspect-[4/3] w-full place-items-center rounded-sm border border-dashed border-line">
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-fg-subtle">
            No photo
          </span>
        </div>
      )}

      {/* Text */}
      <div className="min-w-0 self-center">
        {a.year && (
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fg-subtle">
            {a.year}
          </p>
        )}
        <h4 className="mt-1 font-display text-2xl font-light leading-tight text-fg">
          {a.title}
        </h4>
        {a.org && <p className="mt-1 text-sm text-fg-muted">{a.org}</p>}
        {a.description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
            {a.description}
          </p>
        )}
      </div>
    </article>
  );
}
