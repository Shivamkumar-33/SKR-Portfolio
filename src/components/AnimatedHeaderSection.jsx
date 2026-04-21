import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
            start: "top 90%",
            once: true,
          }
        : undefined,
    });

    tl.from(contextRef.current, {
      y: "35vh",
      duration: 1,
      ease: "circ.out",
    });

    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: 120,
        duration: 0.9,
        ease: "circ.out",
      },
      "<+0.2"
    );

    if (titleRef.current) {
      gsap.set(titleRef.current, { "--title-fill": "0%" });

      if (withScrollTrigger) {
        gsap.to(titleRef.current, {
          "--title-fill": "100%",
          ease: "none",
          scrollTrigger: {
            trigger: contextRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        });
      } else {
        gsap.to(titleRef.current, {
          "--title-fill": "100%",
          duration: 1.1,
          ease: "power2.out",
          delay: 0.45,
        });
      }
    }
  }, []);

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-8 pt-12 sm:gap-10"
        >
          <p
            className={`technical-label px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              ref={titleRef}
              className={`section-outline-title flex flex-col gap-8 uppercase banner-text-responsive sm:gap-10 md:block ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2 border-current/60" />
        <div className="py-8 sm:py-10 text-end">
          <AnimatedTextLines
            text={text}
            className={`premium-body-copy value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
