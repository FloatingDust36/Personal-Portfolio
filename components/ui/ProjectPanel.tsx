import Image from "next/image";
import type { Project } from "@/content/projects";
import MistTexture from "@/components/motion/MistTexture";

/**
 * A large image-forward project panel for the horizontal gallery. Shows a real
 * screenshot when `project.screenshot` is set, otherwise an on-brand ink-wash
 * placeholder well. No drop shadows.
 */
export default function ProjectPanel({
  project,
  index,
  tag,
}: {
  project: Project;
  index: number;
  tag: string;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="group flex w-full shrink-0 flex-col lg:h-full lg:w-[60vw] lg:max-w-[820px]">
      {/* Image well */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-line bg-surface/40 lg:aspect-auto lg:flex-1">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition duration-700 ease-[var(--ease-settle)] group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <MistTexture
              seed={index + 3}
              frequency="0.011 0.02"
              opacity={0.5}
              className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-settle)] group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 100% at 100% 100%, color-mix(in srgb, var(--fg) 10%, transparent), transparent 60%)",
              }}
            />
            <span className="absolute bottom-2 right-6 font-display text-[7rem] leading-none text-fg/10 sm:text-[9rem]">
              {num}
            </span>
            <span className="absolute bottom-5 left-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fg-subtle">
              Preview forthcoming
            </span>
          </>
        )}
        <span className="absolute left-5 top-5 rounded-full bg-bg/70 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fg-muted backdrop-blur-sm">
          {tag}
        </span>
      </div>

      {/* Text */}
      <div className="mt-5 lg:mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl font-light leading-tight text-fg sm:text-3xl">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-fg-subtle">{num}</span>
        </div>
        <p className="mt-2 font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.1em] text-fg-subtle">
          {project.role}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-muted lg:line-clamp-4">
          {project.blurb}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 6).map((s) => (
              <li
                key={s}
                className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-fg-subtle"
              >
                {s}
              </li>
            ))}
          </ul>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-muted transition-colors hover:text-fg"
            >
              Repo <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
