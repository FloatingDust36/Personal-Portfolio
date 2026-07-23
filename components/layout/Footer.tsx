import { profile } from "@/content/profile";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-2xl font-light text-fg">
            {profile.shortName}
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
            {profile.location}
          </p>
        </div>

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
