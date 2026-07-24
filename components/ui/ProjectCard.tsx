import Image from "next/image";
import type { Project } from "@/content/projects";

/** An editorial project row. Shows a screenshot when one is supplied, otherwise
 *  a large index numeral. Hover reveals the image; no drop shadows anywhere. */
export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <article className="group grid gap-6 border-t border-line py-12 lg:grid-cols-[0.85fr_1.55fr] lg:gap-12">
      {/* Media / index */}
      <div>
        {project.screenshot ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-line">
            <Image
              src={project.screenshot}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover grayscale-[0.25] transition duration-700 ease-[var(--ease-settle)] group-hover:grayscale-0 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <p className="font-mono text-5xl font-light leading-none tracking-tight text-fg-subtle/45">
            {num}
          </p>
        )}
      </div>

      {/* Text */}
      <div>
        <h3 className="font-display text-3xl font-light leading-tight text-fg sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-xl font-mono text-[0.72rem] uppercase leading-relaxed tracking-[0.12em] text-fg-subtle">
          {project.role}
        </p>
        <p className="mt-5 max-w-2xl leading-relaxed text-fg-muted">
          {project.blurb}
        </p>
        {project.note && (
          <p className="mt-3 max-w-2xl text-sm italic leading-relaxed text-fg-subtle">
            {project.note}
          </p>
        )}

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-fg-subtle"
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
            className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-fg-muted transition-colors hover:text-fg"
          >
            View repo
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
