/**
 * A fixed, very faint animated film-grain / rice-paper texture over the whole
 * page for tactility. Pure CSS (see `.grain-overlay` in globals.css); the jitter
 * animation is neutralised by the global reduced-motion rule.
 */
export default function PaperGrain() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
