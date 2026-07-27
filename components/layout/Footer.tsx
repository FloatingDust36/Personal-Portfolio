import { profile } from "@/content/profile";

const year = new Date().getFullYear();

const NAV = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#awards", label: "Awards" },
  { href: "#contact", label: "Contact" },
];

const CONNECT = [
  { href: `mailto:${profile.email}`, label: "Email", ext: false },
  { href: profile.github, label: "GitHub", ext: true },
  { href: profile.linkedin, label: "LinkedIn", ext: true },
  { href: profile.resumeUrl, label: "Résumé", ext: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <a href="#top" aria-label="Back to top" className="inline-flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-[5px] bg-seal font-mono text-xs font-medium tracking-wide text-white">
                {profile.initials}
              </span>
              <span className="font-display text-lg text-fg">{profile.shortName}</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-muted">
              {profile.role} · {profile.location}
            </p>
            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-fg-subtle">
              {profile.availability}
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-fg-subtle">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-fg-subtle">
              Connect
            </h2>
            <ul className="mt-4 space-y-2.5">
              {CONNECT.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                    {l.ext && (
                      <span
                        className="text-xs text-fg-subtle transition-colors group-hover:text-seal"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p className="sm:order-3">Designed &amp; built by John Peter · Next.js</p>
          <a
            href="#top"
            className="text-fg-muted transition-colors hover:text-fg sm:order-2"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
