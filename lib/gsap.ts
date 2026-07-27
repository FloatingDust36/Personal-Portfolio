// Central GSAP setup. Registers only the plugins actually used, on the client,
// so the bundle stays as small as GSAP allows. Import from here everywhere.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, ScrambleTextPlugin);
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, ScrambleTextPlugin };
