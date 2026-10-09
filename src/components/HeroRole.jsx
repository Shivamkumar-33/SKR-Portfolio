import { motion as Motion, useReducedMotion } from "motion/react";

const LayersIcon = () => (
  <svg
    className="hero-role-icon"
    width="36"
    height="32"
    viewBox="0 0 36 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <defs>
      <linearGradient id="heroSlabRed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FF5A5A" />
        <stop offset="100%" stopColor="#E11D1D" />
      </linearGradient>
      <linearGradient id="heroSlabRedSide" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
      <linearGradient id="heroSlabLite" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#D4D4D8" />
      </linearGradient>
      <linearGradient id="heroSlabLiteSide" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E4E4E7" />
        <stop offset="100%" stopColor="#A1A1AA" />
      </linearGradient>
    </defs>

    {/* Left slab */}
    <path d="M3 8.5L9 5.8V22.2L3 24.9V8.5Z" fill="url(#heroSlabRedSide)" />
    <path d="M9 5.8L15 8.5V24.9L9 22.2V5.8Z" fill="url(#heroSlabRed)" />
    <path d="M3 8.5L9 5.8L15 8.5L9 11.2L3 8.5Z" fill="#FF7A7A" />

    {/* Center slab */}
    <path d="M11.5 5.2L17.5 2.2V24.5L11.5 27.5V5.2Z" fill="url(#heroSlabLiteSide)" />
    <path d="M17.5 2.2L23.5 5.2V27.5L17.5 24.5V2.2Z" fill="url(#heroSlabLite)" />
    <path d="M11.5 5.2L17.5 2.2L23.5 5.2L17.5 8.2L11.5 5.2Z" fill="#FFFFFF" />

    {/* Right slab */}
    <path d="M21 9.2L27 6.5V21.8L21 24.5V9.2Z" fill="url(#heroSlabRedSide)" />
    <path d="M27 6.5L33 9.2V24.5L27 21.8V6.5Z" fill="url(#heroSlabRed)" />
    <path d="M21 9.2L27 6.5L33 9.2L27 11.9L21 9.2Z" fill="#FF7A7A" />
  </svg>
);

const HeroRole = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      className="hero-role flex flex-col items-center gap-3 text-center"
      aria-label="Current role"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Motion.span
        className="hero-role-icon-wrap relative inline-flex"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -3, 0] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <LayersIcon />
        <span className="hero-role-icon-shadow" aria-hidden />
      </Motion.span>

      <div className="hero-role-title flex flex-col items-center leading-[1.2]">
        <span className="hero-status-title">Full Stack Dev,</span>
        <span className="hero-status-subtitle">& Designer</span>
      </div>
    </Motion.div>
  );
};

export default HeroRole;
