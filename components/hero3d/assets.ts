import * as THREE from "three";

/**
 * Draw an ink-wash mountain ridge to a canvas texture: solid toward the base,
 * dissolving into mist at the peaks. Drawn in white so a material color can
 * tint it per theme. `seed` varies the ridge; `crest` sets peak height (0..1,
 * higher = taller).
 */
export function makeMountainTexture(
  seed: number,
  crest: number,
): THREE.CanvasTexture {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  const rand = mulberry32(seed);
  const phase1 = rand() * 6.28;
  const phase2 = rand() * 6.28;
  const phase3 = rand() * 6.28;

  const baseline = h * (1 - crest * 0.62); // higher crest → higher peaks
  const ridge = (x: number) => {
    const u = x / w;
    return (
      baseline -
      Math.sin(u * 3.1 + phase1) * h * 0.11 * crest -
      Math.sin(u * 6.7 + phase2) * h * 0.05 -
      Math.sin(u * 13.3 + phase3) * h * 0.025 -
      (rand() - 0.5) * h * 0.01
    );
  };

  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, ridge(0));
  for (let x = 1; x <= w; x += 4) ctx.lineTo(x, ridge(x));
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.clip();

  let minY = h;
  for (let x = 0; x <= w; x += 8) minY = Math.min(minY, ridge(x));

  const grad = ctx.createLinearGradient(0, minY, 0, h);
  grad.addColorStop(0, "rgba(255,255,255,0.20)");
  grad.addColorStop(0.32, "rgba(255,255,255,0.86)");
  grad.addColorStop(1, "rgba(255,255,255,1.0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The lone-figure silhouette as a white SVG data URI (tinted by material). */
export function figureDataUri(): string {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='720' viewBox='0 0 200 360'>` +
    `<g fill='#ffffff'>` +
    `<path d='M83,84 C59,98 45,122 25,140 C41,138 57,130 71,118 C59,136 45,152 31,163 C57,152 83,124 96,101 Z' fill-opacity='0.9'/>` +
    `<path d='M90,50 C73,53 59,61 43,63 C57,69 73,67 87,61 C71,73 57,87 41,97 C59,91 81,75 95,59 Z' fill-opacity='0.95'/>` +
    `<path d='M112,33 l7,-3 l1.2,2.6 l-7,3 Z'/>` +
    `<circle cx='127' cy='139' r='2.7'/>` +
    `<path d='M116,152 l15,-8 l1.7,3 l-15,8 Z'/>` +
    `<path d='M119,148 L167,305 L162,307 L114,152 Z'/>` +
    `<path d='M85,66 C79,72 77,82 79,98 C74,150 70,210 60,268 C56,290 50,306 46,320 C72,331 100,331 122,324 C132,320 139,312 143,298 C137,248 131,182 125,120 C123,98 121,80 115,68 C107,61 93,61 85,66 Z'/>` +
    `<ellipse cx='100' cy='52' rx='11' ry='13'/>` +
    `<circle cx='107' cy='40' r='5.6'/>` +
    `</g></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}
