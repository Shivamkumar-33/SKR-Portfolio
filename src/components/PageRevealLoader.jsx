import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Exact reveal flow (black line / cover):
 * 1) Loader 0% → 100%
 * 2) Progress bar fills
 * 3) Follow line expands to full width
 * 4) Loader UI hides
 * 5) Line expands vertically (fullscreen black cover)
 * 6) Cover exits → content reveal (opacity + slide via onReveal)
 */
const PageRevealLoader = ({ onReveal, onComplete }) => {
  const rootRef = useRef(null);
  const barFillRef = useRef(null);
  const lineRef = useRef(null);
  const textGroupRef = useRef(null);
  const brandRef = useRef(null);
  const progressRef = useRef({ value: 0 });
  const [displayPct, setDisplayPct] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.documentElement.classList.add("loader-active");
    document.body.style.overflow = "hidden";

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      document.documentElement.classList.remove("loader-active");
      document.body.style.overflow = "";
      onComplete?.();
    };

    if (reduceMotion) {
      gsap.set(barFillRef.current, { scaleX: 1 });
      setDisplayPct(100);
      onReveal?.();
      const t = window.setTimeout(finish, 200);
      return () => {
        window.clearTimeout(t);
        document.documentElement.classList.remove("loader-active");
        document.body.style.overflow = "";
      };
    }

    const ctx = gsap.context(() => {
      const counter = progressRef.current;

      gsap.set(lineRef.current, {
        width: "0%",
        height: 2,
        top: "50%",
        yPercent: -50,
        left: 0,
        opacity: 1,
        backgroundColor: "#ffffff",
      });
      gsap.set(barFillRef.current, { scaleX: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: finish,
      });

      // ── 1 & 2: Counter 0→100 + progress bar fill (fast & snappy) ──
      tl.to(counter, {
        value: 100,
        duration: 0.75,
        ease: "power2.inOut",
        onUpdate: () => {
          const pct = Math.round(counter.value);
          setDisplayPct(pct);
          gsap.set(barFillRef.current, { scaleX: pct / 100 });
        },
      });

      tl.to({}, { duration: 0.06 });

      // ── 3: Follow line → full width ──
      tl.to(lineRef.current, {
        width: "100%",
        duration: 0.25,
      });

      // ── 4: Loader hide ──
      tl.to(
        [textGroupRef.current, brandRef.current],
        {
          opacity: 0,
          y: -15,
          duration: 0.2,
          stagger: 0.03,
          ease: "power2.inOut",
        },
        "-=0.1"
      );

      tl.to(
        root,
        {
          backgroundColor: "rgba(0,0,0,0)",
          duration: 0.15,
          ease: "power2.out",
        },
        "-=0.1"
      );

      tl.set(".page-reveal-loader__vignette, .page-reveal-loader__noise", {
        opacity: 0,
      });

      // ── 5: Line vertical expand → fullscreen BLACK cover ──
      tl.to(lineRef.current, {
        height: "100dvh",
        top: 0,
        yPercent: 0,
        backgroundColor: "#000000",
        boxShadow: "none",
        duration: 0.28,
      });

      // ── 6: Trigger content reveal immediately behind cover so it paints before lift ──
      tl.call(() => {
        onReveal?.();
      });

      // Lift black cover
      tl.to(lineRef.current, {
        yPercent: -100,
        duration: 0.38,
        ease: "power3.inOut",
      });

      tl.to(
        root,
        {
          opacity: 0,
          duration: 0.15,
          ease: "power2.out",
        },
        "-=0.1"
      );
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("loader-active");
      document.body.style.overflow = "";
    };
  }, [onReveal, onComplete]);

  return (
    <div
      ref={rootRef}
      className="page-reveal-loader"
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className="page-reveal-loader__vignette" aria-hidden="true" />
      <div className="page-reveal-loader__noise" aria-hidden="true" />

      <div ref={brandRef} className="page-reveal-loader__brand">
        <span className="page-reveal-loader__brand-mark" />
        <span>SHIVAM</span>
      </div>

      <div ref={textGroupRef} className="page-reveal-loader__content">
        <p className="page-reveal-loader__label">Loading experience</p>

        <div className="page-reveal-loader__counter-row">
          <span className="page-reveal-loader__counter">
            {String(displayPct).padStart(3, "0")}
          </span>
          <span className="page-reveal-loader__percent">%</span>
        </div>

        <div className="page-reveal-loader__bar" aria-hidden="true">
          <div ref={barFillRef} className="page-reveal-loader__bar-fill" />
        </div>
      </div>

      <div ref={lineRef} className="page-reveal-loader__line" aria-hidden="true" />
    </div>
  );
};

export default PageRevealLoader;
