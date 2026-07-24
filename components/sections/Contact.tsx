import { profile } from "@/content/profile";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import DuskPanel from "@/components/dusk/DuskPanel";

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-line py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Framing + direct fallback */}
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-fg-subtle">
                Contact
              </p>
            </Reveal>
            <SplitReveal
              as="h2"
              type="chars"
              stagger={0.03}
              className="mt-5 font-display text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl"
            >
              Let&apos;s talk.
            </SplitReveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md leading-relaxed text-fg-muted">
                Ask Dusk about John Peter&apos;s work, or reach him directly. He&apos;s
                open to part-time, remote roles.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <dl className="mt-10 space-y-5">
                <div>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fg-subtle">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-fg-muted transition-colors hover:text-fg"
                    >
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fg-subtle">
                    Elsewhere
                  </dt>
                  <dd className="mt-1 flex gap-5">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg-muted transition-colors hover:text-fg"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg-muted transition-colors hover:text-fg"
                    >
                      GitHub
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Dusk */}
          <Reveal delay={0.1}>
            <DuskPanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
