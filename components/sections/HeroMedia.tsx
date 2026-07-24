"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { heroMedia } from "@/content/heroMedia";
import { profile } from "@/content/profile";
import InkParticles from "@/components/motion/InkParticles";

/**
 * Full-bleed ink-wash hero backdrop driven by a supplied video loop or still
 * image (per content/heroMedia). Adds a slow pointer parallax on the media, a
 * drifting particle layer, and a legibility wash. Under reduced motion the
 * video holds on its poster and nothing moves.
 */
export default function HeroMedia() {
  const reduced = useReducedMotion();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const read = () => setDark(document.documentElement.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  const video = dark ? heroMedia.videoDark || heroMedia.videoLight : heroMedia.videoLight;
  const image = dark ? heroMedia.imageDark || heroMedia.imageLight : heroMedia.imageLight;
  const poster = dark ? heroMedia.imageDark || heroMedia.imageLight : heroMedia.imageLight;

  // Pointer parallax on the media plane.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 20 });
  const y = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set(((e.clientX / window.innerWidth) * 2 - 1) * -14);
      my.set(((e.clientY / window.innerHeight) * 2 - 1) * -10);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mx, my]);

  return (
    <>
      <motion.div className="absolute inset-0 scale-[1.08]" style={{ x, y }}>
        {video ? (
          <video
            key={video}
            className="h-full w-full object-cover"
            autoPlay={!reduced}
            muted
            loop
            playsInline
            poster={poster || undefined}
            preload="metadata"
          >
            <source src={video} type={video.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          </video>
        ) : (
          <Image
            src={image}
            alt=""
            fill
            priority
            // Capped so we never request a variant larger than the source art,
            // and phones get a genuinely small file.
            sizes="(max-width: 640px) 640px, (max-width: 1200px) 1200px, 1920px"
            // Tall screens crop the sides, so bias the framing right to keep
            // the figure in shot; wide screens show the full composition.
            className="object-cover object-[68%_50%] sm:object-center"
          />
        )}
      </motion.div>

      {/* Drifting particles for extra life over the painting */}
      <InkParticles className="absolute inset-0" />

      {/* Legibility wash. Tall screens read top-to-bottom, so the copy is
          protected vertically there; wide screens shield the left column. */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 92%, transparent) 0%, color-mix(in srgb, var(--bg) 80%, transparent) 55%, color-mix(in srgb, var(--bg) 25%, transparent) 82%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(100deg, color-mix(in srgb, var(--bg) 78%, transparent) 0%, color-mix(in srgb, var(--bg) 30%, transparent) 42%, transparent 64%)",
        }}
      />

      {/* Red seal stamp, echoing the reference art */}
      <div className="pointer-events-none absolute bottom-7 right-7 hidden sm:block">
        <span className="grid h-11 w-11 rotate-[-3deg] place-items-center rounded-[4px] bg-seal font-display text-base font-medium leading-none text-paper">
          {profile.initials}
        </span>
      </div>
    </>
  );
}
