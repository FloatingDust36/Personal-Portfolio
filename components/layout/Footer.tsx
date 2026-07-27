import { profile } from "@/content/profile";
import SplitReveal from "@/components/motion/SplitReveal";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line">
      {/* Oversized name */}
      <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
        <SplitReveal
          as="h2"
          type="words"
          stagger={0.08}
          className="font-display font-light leading-[0.86] tracking-tight text-fg"
        >
          <span className="block text-[clamp(2.75rem,13vw,11rem)]">John Peter</span>
          <span className="block text-[clamp(2.75rem,13vw,11rem)]">Pestaño</span>
        </SplitReveal>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
          {profile.location} · Open to part-time, remote
        </p>

        <nav aria-label="Contact and profiles">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.14em]">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="text-fg-muted transition-colors hover:text-fg"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted transition-colors hover:text-fg"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted transition-colors hover:text-fg"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fg-subtle">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}
