import { useEffect, useRef } from "react";
import gsap from "gsap";

const AmbientBackdrop = ({ active = true }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!active || !rootRef.current) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return undefined;

    const blobs = rootRef.current.querySelectorAll(".ambient-blob");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: "power2.out" }
      );

      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: i % 2 === 0 ? 48 : -40,
          y: i % 2 === 0 ? -56 : 40,
          scale: 1.12 + i * 0.04,
          duration: 10 + i * 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.45,
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <div
      ref={rootRef}
      className={`ambient-backdrop${active ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <div className="ambient-blob ambient-blob--gold" />
      <div className="ambient-blob ambient-blob--cream" />
      <div className="ambient-blob ambient-blob--amber" />
      <div className="ambient-blob ambient-blob--soft" />
      <div className="ambient-noise" />
    </div>
  );
};

export default AmbientBackdrop;
