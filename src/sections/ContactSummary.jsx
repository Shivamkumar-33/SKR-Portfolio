import Marquee from "../components/Marquee";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ContactSummary = () => {
  const containerRef = useRef(null);

  const items = [
    "Innovation",
    "Precision",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = [
    "contact",
    "contact",
    "contact",
    "contact",
    "contact",
  ];

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="theme-section relative z-10 mt-8 flex min-h-screen flex-col items-center justify-between gap-8 px-6 py-12 sm:px-10 sm:py-14"
    >
      <Marquee items={items} className="marquee-surface" />
      <div className="overflow-hidden font-light text-center contact-text-responsive">
        <p>
          “ Let’s build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web application <span className="text-gold">together</span> “
        </p>
      </div>
      <Marquee
        items={items2}
        reverse={true}
        className="marquee-surface border-y-2"
        iconClassName="stroke-gold stroke-2 text-gold"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;
