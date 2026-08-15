import { useEffect, useRef } from "react";
import gsap from "gsap";
import ButtonWithIcon from "./ui/button-with-icon";

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
    <ButtonWithIcon
      ref={btnRef}
      href="#contact"
      className="will-change-transform"
    >
      Let&apos;s Connect
    </ButtonWithIcon>
  );
};

export default ConnectButton;
