import { useEffect, useRef } from "react";
import gsap from "gsap";

const ConnectButton = ({ magnetic = false }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    if (!magnetic) return undefined;
    const btn = btnRef.current;
    if (!btn) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return undefined;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      xTo(x * 0.28);
      yTo(y * 0.28);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);

    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
      gsap.set(btn, { x: 0, y: 0 });
    };
  }, [magnetic]);

  return (
    <a
      ref={btnRef}
      href="#contact"
      className="connect-btn connect-btn-glow group relative z-0 inline-flex items-center justify-center overflow-hidden rounded-full p-0.5 transition duration-300 hover:scale-105 active:scale-100 will-change-transform"
    >
      <span className="connect-btn-inner relative z-10 flex w-full items-center justify-between rounded-full px-1.5 py-1.5 backdrop-blur sm:py-2">
        <span className="connect-btn-label relative z-20 pl-4 pr-5 text-sm font-semibold tracking-wide sm:text-base">
          Let&apos;s Connect
        </span>

        <span className="connect-btn-icon relative z-20 flex size-9 items-center justify-center overflow-hidden rounded-full transition-transform duration-500 sm:size-10 group-hover:bg-gold group-hover:text-black">
          <svg
            className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 19L19 5M19 5v10m0-10H9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>

          <svg
            className="absolute h-4 w-4 -translate-x-[150%] translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 group-hover:translate-y-0"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
      </span>
    </a>
  );
};

export default ConnectButton;
