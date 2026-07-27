"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { useSmoothScrollTo } from "@/components/providers/SmoothScroll";
import ThemeToggle from "./ThemeToggle";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
] as const;

const NAV_OFFSET = -72; // clears the fixed bar when scrolling to a section

export default function Nav() {
  const scrollTo = useSmoothScrollTo();
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Scrollspy: mark the section currently occupying the upper viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollTo(`#${id}`, { offset: NAV_OFFSET });
  };

  const goTop = () => {
    setMenuOpen(false);
    scrollTo(0);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        {/* Seal stamp — the one permitted stamp mark bearing his initials. */}
        <button
          type="button"
          onClick={goTop}
          aria-label={`${profile.initials} — back to top`}
          className="grid h-9 w-9 place-items-center rounded-[3px] bg-seal font-display text-sm font-medium leading-none text-paper transition-opacity duration-500 ease-[var(--ease-settle)] hover:opacity-90"
        >
          {profile.initials}
        </button>

        <div className="flex items-center gap-1">
          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => go(id)}
                  aria-current={active === id ? "true" : undefined}
                  className="group relative px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-fg-muted transition-colors duration-300 hover:text-fg aria-[current=true]:text-fg"
                >
                  {label}
                  <span
                    className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left bg-seal transition-transform duration-500 ease-[var(--ease-settle)] ${
                      active === id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="ml-1 flex items-center gap-1">
            <ThemeToggle />
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-9 w-9 place-items-center text-fg-muted transition-colors hover:text-fg md:hidden"
            >
              <MenuGlyph open={menuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-line bg-bg/95 backdrop-blur-sm md:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-8">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                aria-current={active === id ? "true" : undefined}
                className="w-full py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg aria-[current=true]:text-seal"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <line
        x1="3"
        y1={open ? "10" : "6.5"}
        x2="17"
        y2={open ? "10" : "6.5"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        style={{
          transform: open ? "rotate(45deg)" : "none",
          transformOrigin: "center",
          transition: "transform 300ms var(--ease-settle), y1 300ms",
        }}
      />
      <line
        x1="3"
        y1={open ? "10" : "13.5"}
        x2="17"
        y2={open ? "10" : "13.5"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        style={{
          transform: open ? "rotate(-45deg)" : "none",
          transformOrigin: "center",
          transition: "transform 300ms var(--ease-settle)",
        }}
      />
    </svg>
  );
}
