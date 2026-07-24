// Hero background asset (your AIGC ink-wash painting or video loop).
//
// 1. Generate the asset (see the prompt in the build notes) with LEFT negative
//    space for the name; the subject/mountains sit on the RIGHT.
// 2. Drop the file(s) into `public/hero/`.
// 3. Flip `enabled` to true.
//
// When disabled, the hero falls back to the procedural 3D scene, so nothing
// breaks while the asset is being made. Video is preferred (it flows); if a
// video path is set it wins over the image. A dark variant is optional — the
// light asset is reused for dark if a dark one is not provided.

export const heroMedia = {
  enabled: false,

  // Seamless loop, muted. Leave "" to use the image instead.
  videoLight: "/hero/scene-light.mp4",
  videoDark: "/hero/scene-dark.mp4",

  // Still fallback (also the video poster / first paint).
  imageLight: "/hero/scene-light.jpg",
  imageDark: "/hero/scene-dark.jpg",
} as const;

export type HeroMediaConfig = typeof heroMedia;
