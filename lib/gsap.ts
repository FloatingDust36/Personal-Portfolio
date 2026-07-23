// Central GSAP setup. Registers ScrollTrigger exactly once, on the client.
// Import { gsap, ScrollTrigger } from here everywhere so registration is shared.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
