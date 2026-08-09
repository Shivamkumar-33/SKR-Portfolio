import gsap from "gsap";
import { Observer, ScrollTrigger } from "gsap/all";

let registered = false;

export const registerGsapPlugins = () => {
  if (registered) return gsap;
  gsap.registerPlugin(ScrollTrigger, Observer);
  registered = true;
  return gsap;
};

registerGsapPlugins();

export { gsap, ScrollTrigger, Observer };
export default gsap;
