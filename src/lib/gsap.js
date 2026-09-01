import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export const registerGsapPlugins = () => {
  if (registered) return gsap;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  return gsap;
};

registerGsapPlugins();

export { gsap, ScrollTrigger };
export default gsap;
