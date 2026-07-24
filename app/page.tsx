// Real sections are added one phase at a time; the rest stay as placeholders
// so nav scrollspy and smooth scroll keep working as the page fills in.
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";

const PLACEHOLDER_SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "awards", label: "Awards" },
] as const;

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />

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
