import dynamic from "next/dynamic";
import { skillTiers, currentlyLearning } from "@/content/skills";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

// Code-split so only the chosen variant ships to the browser.
const SkillsConstellation = dynamic(() => import("@/components/ui/SkillsConstellation"));
const SkillsMeters = dynamic(() => import("@/components/ui/SkillsMeters"));
const SkillsMarquee = dynamic(() => import("@/components/ui/SkillsMarquee"));
const SkillsIcons = dynamic(() => import("@/components/ui/SkillsIcons"));

// Swap to compare treatments: "icons" | "constellation" | "meters" | "marquee".
const VARIANT: "icons" | "constellation" | "meters" | "marquee" = "icons";

const HINT: Record<string, string> = {
  icons: "Tools grouped by domain — the dot marks how deeply he's worked with each.",
  constellation: "A map of what he works with — hover a cluster to trace it.",
  meters: "Grouped by how deeply he's worked with each — honest, not inflated.",
  marquee: "What he works with, by depth — hover a row to pause it.",
};

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-fg-subtle">
            Skills
          </p>
        </Reveal>
        <SplitReveal
          as="h2"
          type="lines"
          className="mt-5 max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl"
        >
          Honest about the depth.
        </SplitReveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fg-subtle">
            {HINT[VARIANT]}
          </p>
        </Reveal>
      </div>

      {VARIANT === "marquee" ? (
        <div className="mt-12">
          <SkillsMarquee />
        </div>
      ) : VARIANT === "icons" ? (
        <div className="mt-12">
          <SkillsIcons />
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {VARIANT === "constellation" ? (
            <Reveal delay={0.15}>
              <div className="relative mt-8 h-[62vh] min-h-[440px] w-full">
                <SkillsConstellation />
              </div>
            </Reveal>
          ) : (
            <div className="mt-12">
              <SkillsMeters />
            </div>
          )}
        </div>
      )}

      {/* Accessible, crawlable fallback of the same content */}
      <div className="sr-only">
        {skillTiers.map((t) => (
          <p key={t.name}>
            {t.name} ({t.blurb}): {t.items.join(", ")}.
          </p>
        ))}
        <p>
          {currentlyLearning.label}: {currentlyLearning.items.join(", ")}.
        </p>
      </div>
    </section>
  );
}
