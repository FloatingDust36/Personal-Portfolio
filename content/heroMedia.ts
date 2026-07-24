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

export type HeroMediaConfig = {
  enabled: boolean;
  videoLight: string;
  videoDark: string;
  imageLight: string;
  imageDark: string;
};

export const heroMedia: HeroMediaConfig = {
  enabled: true,

  // Seamless loop, muted. Empty until the video loops are generated — when a
  // path is set here it takes over from the still.
  videoLight: "",
  videoDark: "",

  // The ink-wash paintings (also the video poster / first paint once video lands).
  imageLight: "/hero/scene-light.webp",
  imageDark: "/hero/scene-dark.webp",
};
