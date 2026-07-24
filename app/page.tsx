// Real sections are added one phase at a time; the rest stay as placeholders
// so nav scrollspy and smooth scroll keep working as the page fills in.
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Awards from "@/components/sections/Awards";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Awards />

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
