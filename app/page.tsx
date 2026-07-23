// Phase 4.2 — layout shell. Sections are placeholders; real content lands in
// 4.3 onward. Each section carries its final id and heading so nav scrollspy
// and smooth scroll can be verified now.

const PLACEHOLDER_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "awards", label: "Awards" },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero placeholder */}
      <section
        id="top"
        className="flex min-h-screen scroll-mt-20 flex-col items-center justify-center gap-4 px-6 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-subtle">
          Phase 4.2 — layout shell
        </p>
        <h1 className="font-display text-6xl font-light tracking-tight text-fg sm:text-7xl">
          John Peter Pestaño
        </h1>
        <p className="max-w-md text-fg-muted">
          Computer Engineering student building AI systems that ship.
        </p>
      </section>

      {PLACEHOLDER_SECTIONS.map(({ id, label }) => (
        <section
          key={id}
          id={id}
          className="flex min-h-screen scroll-mt-20 items-center border-t border-line px-6"
        >
          <div className="mx-auto w-full max-w-6xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-fg-subtle">
              {label}
            </p>
            <h2 className="mt-3 font-display text-4xl font-light text-fg">
              {label} section
            </h2>
          </div>
        </section>
      ))}

      {/* Contact placeholder (merged with Dusk later) */}
      <section
        id="contact"
        className="flex min-h-screen scroll-mt-20 items-center border-t border-line px-6"
      >
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-fg-subtle">
            Contact
          </p>
          <h2 className="mt-3 font-display text-4xl font-light text-fg">
            Contact section
          </h2>
        </div>
      </section>
    </>
  );
}
