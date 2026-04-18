import { useEffect, useRef } from "react";
import gsap from "gsap";

const ConnectButton = () => {
  const buttonRef = useRef(null);
  const flairRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const flair = flairRef.current;
    if (!button || !flair) return;

    const xSet = gsap.quickSetter(flair, "xPercent");
    const ySet = gsap.quickSetter(flair, "yPercent");

    const getXY = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();

      const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      return {
        x: xTransformer(e.clientX - left),
        y: yTransformer(e.clientY - top),
      };
    };

    const handleMouseEnter = (e) => {
      const { x, y } = getXY(e);
      xSet(x);
      ySet(y);

      gsap.to(flair, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (e) => {
      const { x, y } = getXY(e);
      gsap.killTweensOf(flair);
      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e) => {
      const { x, y } = getXY(e);
      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mousemove", handleMouseMove);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <a
      href="#contact"
      ref={buttonRef}
      className="group relative inline-flex items-center overflow-hidden rounded-full border border-white/20 bg-transparent p-[1px] shadow-[0_0_20px_-5px_rgba(207,163,85,0.15)] transition-colors duration-500 hover:border-gold/60"
      style={{ isolation: "isolate" }}
    >
      {/* The trailing mouse flair effect */}
      <div
        ref={flairRef}
        className="pointer-events-none absolute z-[-1] left-[-25%] top-[-25%] h-[150%] w-[150%] origin-center scale-0 rounded-full bg-gold/50 blur-[24px] pointer-events-none"
      />

      {/* Inner span containing text */}
      <div className="relative z-10 flex w-full items-center justify-between rounded-full bg-transparent px-1.5 py-1.5 sm:py-2">
        <span className="relative z-20 pl-4 pr-5 text-sm sm:text-base font-semibold tracking-wide text-white/85 group-hover:text-white">
          Let's Connect
        </span>
        
        <span className="relative z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-white text-black overflow-hidden transition-transform duration-500 group-hover:bg-gold group-hover:text-black">
          {/* Default arrow */}
          <svg
            className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 19L19 5M19 5v10m0-10H9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          
          {/* Hover arrow */}
          <svg
            className="absolute h-4 w-4 -translate-x-[150%] translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 group-hover:translate-y-0"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 19L19 5M19 5v10m0-10H9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </span>
      </div>
    </a>
  );
};

export default ConnectButton;