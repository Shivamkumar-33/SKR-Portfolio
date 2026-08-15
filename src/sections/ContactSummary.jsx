import Marquee from "../components/Marquee";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const ContactSummary = () => {
  const containerRef = useRef(null);

  const items = [
    "Innovation",
    "Precision",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = ["connect", "connect", "connect", "connect", "connect"];

  useGSAP(
    () => {
      const section = containerRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.from(".contact-summary-reveal", {
        y: 28,
        opacity: 0,
        duration: reduceMotion ? 0 : 0.7,
        stagger: reduceMotion ? 0 : 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="theme-section site-section-shell contact-summary-section relative z-10 flex flex-col items-center"
    >
      <div className="contact-summary-reveal w-full">
        <Marquee
          items={items}
          className="marquee-surface contact-summary-marquee"
          speed={38}
        />
      </div>

      <div
        className="contact-summary-reveal overflow-hidden font-light text-center contact-text-responsive will-change-transform"
      >
        <p className="contact-quote">
          “ Let&apos;s build a <br />
          <span>memorable</span> &amp;{" "}
          <span className="contact-quote-inspiring animated-gradient-text">
            inspiring
          </span>{" "}
          <br />
          web application together “
        </p>
      </div>

      <div className="contact-summary-reveal w-full">
        <Marquee
          items={items2}
          reverse={true}
          className="marquee-surface contact-summary-marquee"
          speed={38}
        />
      </div>
    </section>
  );
};

export default ContactSummary;
