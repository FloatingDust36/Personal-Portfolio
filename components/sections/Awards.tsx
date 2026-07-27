import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import RecognitionTabs from "@/components/ui/RecognitionTabs";
import CredentialsGrid from "@/components/ui/CredentialsGrid";

export default function Awards() {
  return (
    <section id="awards" className="scroll-mt-20 border-t border-line py-28 sm:py-36">
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

        {/* Recognition — tabbed by education level */}
        <Reveal>
          <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
            Recognition
          </h3>
        </Reveal>
        <RecognitionTabs />

        {/* Credentials — by category, with certificate photos */}
        <Reveal>
          <h3 className="mt-24 font-mono text-xs uppercase tracking-[0.24em] text-fg-muted">
            Credentials
          </h3>
        </Reveal>
        <div className="mt-8">
          <CredentialsGrid />
        </div>
      </div>
    </section>
  );
}
