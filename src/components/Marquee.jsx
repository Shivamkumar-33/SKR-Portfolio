import { useRef } from "react";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const MarqueeItem = ({ text, icon, iconClassName }) => (
  <span className="marquee__item">
    <span className="marquee__label">{text}</span>
    <Icon icon={icon} className={`marquee__icon ${iconClassName}`} />
  </span>
);

const Marquee = ({
  items,
  className = "marquee-surface",
  icon = "mdi:star-four-points",
  iconClassName = "",
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
            1 + Math.abs(self.getVelocity()) / 700
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
    >
      <div ref={trackRef} className="marquee__track">
        <div className="marquee__group">
          {items.map((text, index) => (
            <MarqueeItem
              key={`a-${text}-${index}`}
              text={text}
              icon={icon}
              iconClassName={iconClassName}
            />
          ))}
        </div>
        <div className="marquee__group" aria-hidden="true">
          {items.map((text, index) => (
            <MarqueeItem
              key={`b-${text}-${index}`}
              text={text}
              icon={icon}
              iconClassName={iconClassName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
