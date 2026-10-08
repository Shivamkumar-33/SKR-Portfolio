import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const MarqueeItem = ({ text }) => (
  <span className="marquee__item">
    <span className="marquee__label">{text}</span>
    <Sparkles size={18} className="marquee__icon" />
  </span>
);

const Marquee = ({
  items,
  className = "marquee-surface",
  reverse = false,
  speed = 35,
}) => {
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const loop = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          duration: speed,
          ease: "none",
          repeat: -1,
        }
      );

      const trigger = ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(
            1,
            5,
            1 + Math.abs(self.getVelocity()) / 800
          );

          gsap.to(loop, {
            timeScale: boost * self.direction,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });

      return () => {
        trigger.kill();
        loop.kill();
      };
    },
    { dependencies: [reverse, speed], revertOnUpdate: true }
  );

  return (
    <div
      className={`marquee flex w-full items-center overflow-hidden font-light uppercase marquee-text-responsive ${className}`}
      aria-roledescription="marquee"
    >
      <div ref={trackRef} className="marquee__track">
        <div className="marquee__group">
          {items.map((text, index) => (
            <MarqueeItem
              key={`a-${text}-${index}`}
              text={text}
            />
          ))}
        </div>
        <div className="marquee__group" aria-hidden="true">
          {items.map((text, index) => (
            <MarqueeItem
              key={`b-${text}-${index}`}
              text={text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
