// Central GSAP setup. Registers the full (now-free) plugin suite exactly once,
// on the client. Import { gsap, ScrollTrigger, ... } from here everywhere so
// registration is shared and never duplicated.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
    DrawSVGPlugin,
    MorphSVGPlugin,
    ScrambleTextPlugin,
    Flip,
    Observer,
  );
}

export {
  gsap,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MorphSVGPlugin,
  ScrambleTextPlugin,
  Flip,
  Observer,
};
