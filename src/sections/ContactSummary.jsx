import Marquee from "../components/Marquee";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const ContactSummary = () => {
  const containerRef = useRef(null);
  const quoteRef = useRef(null);

  const items = [
    "Innovation",
    "Precision",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = ["contact", "contact", "contact", "contact", "contact"];

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

      if (reduceMotion) return;

      // ~1s scroll hold, then release so Contact below reveals
      const holdDistance = () => Math.round(Math.min(window.innerHeight * 0.42, 420));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => `+=${holdDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        quoteRef.current,
        { scale: 0.97, opacity: 0.88 },
        { scale: 1, opacity: 1, ease: "none", duration: 1 },
        0
      );

      const onRefresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onRefresh);

      return () => {
        window.removeEventListener("resize", onRefresh);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="theme-section relative z-10 flex min-h-screen flex-col items-center justify-between gap-8 px-3 py-12 sm:px-6 sm:py-14 md:px-8"
    >
      <div className="contact-summary-reveal w-full">
        <Marquee items={items} className="marquee-surface" speed={40} />
      </div>

      <div
        ref={quoteRef}
        className="contact-summary-reveal overflow-hidden font-light text-center contact-text-responsive will-change-transform"
      >
        <p>
          “ Let’s build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web application <span className="text-gold">together</span> “
        </p>
      </div>

      <div className="contact-summary-reveal w-full">
        <Marquee
          items={items2}
          reverse={true}
          className="marquee-surface border-y-2"
          iconClassName="stroke-gold stroke-2 text-gold"
          icon="material-symbols-light:square"
          speed={32}
        />
      </div>
    </section>
  );
};

export default ContactSummary;
