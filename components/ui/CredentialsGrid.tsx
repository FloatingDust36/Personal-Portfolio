"use client";

import { useState } from "react";
import Image from "next/image";
import { credentials, type Cert } from "@/content/awards";
import Lightbox from "@/components/ui/Lightbox";

export default function CredentialsGrid() {
  const [lb, setLb] = useState<{ images: string[]; alt: string } | null>(null);

  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:gap-x-16">
      {credentials.map((group) => (
        <div key={group.category}>
          <p className="border-b border-line pb-3 font-display text-xl font-light text-fg">
            {group.category}
          </p>
          <ul className="mt-5 space-y-4">
            {group.items.map((c) => (
              <li key={c.name} className="flex items-center gap-3.5">
                <Thumb cert={c} onOpen={(images) => setLb({ images, alt: c.name })} />
                <div className="min-w-0 flex-1">
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
      ))}

      {lb && <Lightbox images={lb.images} alt={lb.alt} onClose={() => setLb(null)} />}
    </div>
  );
}

function Thumb({ cert: c, onOpen }: { cert: Cert; onOpen: (images: string[]) => void }) {
  const imgs = c.images ?? [];
  if (imgs.length === 0) {
    return (
      <span
        className="grid h-10 w-14 shrink-0 place-items-center rounded-[3px] border border-dashed border-line"
        aria-hidden="true"
      >
        <span className="h-1 w-1 rounded-full bg-fg-subtle/50" />
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onOpen(imgs)}
      aria-label={`View certificate: ${c.name}`}
      className="group relative h-10 w-14 shrink-0 overflow-hidden rounded-[3px] border border-line"
    >
      <Image
        src={imgs[0]}
        alt=""
        fill
        sizes="56px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {imgs.length > 1 && (
        <span className="absolute bottom-0 right-0 bg-bg/80 px-1 font-mono text-[0.5rem] text-fg-muted">
          +{imgs.length - 1}
        </span>
      )}
    </button>
  );
}
