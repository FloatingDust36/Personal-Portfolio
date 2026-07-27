"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

/** Full-screen image viewer with prev/next, thumbnails, counter, and keyboard
 *  control. Locks scroll while open. */
export default function Lightbox({
  images,
  start = 0,
  alt,
  onClose,
}: {
  images: string[];
  start?: number;
  alt: string;
  onClose: () => void;
}) {
  const [i, setI] = useState(start);
  const prev = useCallback(
    () => setI((v) => (v - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(() => setI((v) => (v + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[150] flex flex-col bg-bg/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
          {i + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted transition-colors hover:text-fg"
        >
          Close ✕
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex flex-1 items-center justify-center px-6 pb-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-full w-full max-w-5xl">
          <Image
            key={images[i]}
            src={images[i]}
            alt={`${alt} — ${i + 1}`}
            fill
            sizes="90vw"
            className="object-contain"
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="absolute left-4 grid h-11 w-11 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:text-fg"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="absolute right-4 grid h-11 w-11 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:text-fg"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          className="flex justify-center gap-2 px-6 pb-6"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Photo ${idx + 1}`}
              className={`relative h-14 w-20 overflow-hidden rounded-sm border transition-opacity ${
                idx === i ? "border-seal" : "border-line opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
