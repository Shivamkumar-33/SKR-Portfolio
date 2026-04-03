import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
export const AnimatedTextLines = ({ text, className }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.fromTo(lineRefs.current, {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 96%",
          once: true,
        },
      });
    }
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => (lineRefs.current[index] = el)}
          className="block leading-relaxed tracking-wide text-pretty"
        >
          {line}
        </span>
      ))}
    </div>
  );
};
