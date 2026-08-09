import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import TechBadge from "../components/TechBadge";
import { projects } from "../constants";
import { getTechIcon } from "../constants/techIcons";
import { gsap } from "../lib/gsap";
import { useGSAP } from "@gsap/react";

const COLLAPSED_HEIGHT = 128;
const EXPANDED_HEIGHT = 360;
const SHOT_STAGGER = 0.12;

// Idle: fully hidden. Hover: scaleY expand (no thin gold horizontal band)
const GOLD_IDLE_STATE = {
  inset: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  scaleY: 0,
  transformOrigin: "50% 50%",
  opacity: 0,
  visibility: "hidden",
};

const GOLD_COVER_STATE = {
  inset: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  scaleY: 1,
  transformOrigin: "50% 50%",
  opacity: 1,
  visibility: "visible",
};

const Works = () => {
  const listRef = useRef(null);
  const containerRefs = useRef([]);
  const contentRefs = useRef([]);
  const goldRefs = useRef([]);
  const goldTlRefs = useRef([]);
  const revealTlRefs = useRef([]);
  const openIndex = useRef(null);
  const reduceMotion = useReducedMotion();

  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  useGSAP(
    () => {
      const rows = gsap.utils.toArray(".project-expand-row");
      gsap.from(rows, {
        y: 40,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: listRef }
  );

  useLayoutEffect(() => {
    contentRefs.current.forEach((el) => {
      const shots = el?.querySelectorAll(".project-gallery-shot");
      if (!shots?.length) return;
      gsap.set(shots, { y: 48, opacity: 0, force3D: true });
    });
    goldRefs.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, GOLD_IDLE_STATE);
    });
    containerRefs.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { height: COLLAPSED_HEIGHT });
    });
  }, []);

  const isDesktop = () =>
    typeof window !== "undefined" && window.innerWidth >= 768;

  const getShots = (i) => {
    const content = contentRefs.current[i];
    if (!content) return [];
    return gsap.utils.toArray(content.querySelectorAll(".project-gallery-shot"));
  };

  const setActiveClass = (i) => {
    containerRefs.current.forEach((el, idx) => {
      if (!el) return;
      el.classList.toggle("is-active", idx === i);
    });
  };

  const clearActiveClass = () => {
    containerRefs.current.forEach((el) => {
      el?.classList.remove("is-active");
    });
  };

  const killGoldTl = (i) => {
    if (goldTlRefs.current[i]) {
      goldTlRefs.current[i].kill();
      goldTlRefs.current[i] = null;
    }
    const gold = goldRefs.current[i];
    if (gold) gsap.killTweensOf(gold);
  };

  const resetGold = (i) => {
    const gold = goldRefs.current[i];
    if (!gold) return;
    killGoldTl(i);
    gsap.set(gold, GOLD_IDLE_STATE);
  };

  // Solid gold cover via scaleY — no thin rectangular gold stripe
  const revealGold = (i, immediate = false) => {
    const gold = goldRefs.current[i];
    if (!gold) return null;

    killGoldTl(i);

    if (immediate || reduceMotion) {
      gsap.set(gold, GOLD_COVER_STATE);
      return null;
    }

    gsap.set(gold, {
      ...GOLD_IDLE_STATE,
      opacity: 1,
      visibility: "visible",
      scaleY: 0,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", force3D: true },
    });
    goldTlRefs.current[i] = tl;

    tl.to(gold, {
      scaleY: 1,
      duration: 0.34,
    });

    return tl;
  };

  const collapseCard = (i, immediate = false) => {
    const container = containerRefs.current[i];
    const shots = getShots(i);
    const gold = goldRefs.current[i];

    if (revealTlRefs.current[i]) {
      revealTlRefs.current[i].kill();
      revealTlRefs.current[i] = null;
    }

    if (immediate) {
      if (container) {
        gsap.killTweensOf(container);
        gsap.set(container, { height: COLLAPSED_HEIGHT });
      }
      if (shots.length) {
        gsap.killTweensOf(shots);
        gsap.set(shots, { y: 48, opacity: 0 });
      }
      resetGold(i);
      return;
    }

    // Keep GOLD COVERING while collapsing — do NOT slide gold away
    // (that was flashing ambient brown background)
    killGoldTl(i);
    if (gold) gsap.set(gold, GOLD_COVER_STATE);

    if (shots.length) {
      gsap.killTweensOf(shots);
      gsap.to(shots, {
        y: 48,
        opacity: 0,
        duration: reduceMotion ? 0.1 : 0.16,
        stagger: { each: 0.03, from: "end" },
        ease: "power2.in",
        overwrite: true,
      });
    }

    if (container) {
      gsap.killTweensOf(container);
      gsap.to(container, {
        height: COLLAPSED_HEIGHT,
        duration: reduceMotion ? 0.15 : 0.3,
        ease: "power3.inOut",
        overwrite: true,
        onComplete: () => {
          // Only after card is closed — reset gold (no ambient flash)
          resetGold(i);
        },
      });
    } else {
      resetGold(i);
    }
  };

  const expandCard = (i) => {
    const container = containerRefs.current[i];
    const shots = getShots(i);

    if (revealTlRefs.current[i]) {
      revealTlRefs.current[i].kill();
      revealTlRefs.current[i] = null;
    }

    const goldTl = revealGold(i);

    // Expand height with gold so dark ambient never shows in the open area
    if (container) {
      gsap.killTweensOf(container);
      gsap.to(container, {
        height: EXPANDED_HEIGHT,
        duration: reduceMotion ? 0.15 : 0.36,
        ease: "power3.out",
        overwrite: true,
      });
    }

    // Photos only after gold cover is mostly filled
    if (shots.length) {
      gsap.killTweensOf(shots);
      gsap.set(shots, { y: 48, opacity: 0, force3D: true });

      const photoDelay = reduceMotion ? 0 : 0.32;
      const tl = gsap.timeline({ delay: photoDelay });
      revealTlRefs.current[i] = tl;

      if (goldTl && !reduceMotion) {
        // If gold finishes earlier, still ok — delay keeps sync
      }

      shots.forEach((shot, idx) => {
        tl.to(
          shot,
          {
            y: 0,
            opacity: 1,
            duration: reduceMotion ? 0.15 : 0.34,
            ease: "power3.out",
            force3D: true,
          },
          reduceMotion ? 0 : idx * SHOT_STAGGER
        );
      });
    }
  };

  const handleEnter = (i) => {
    if (!isDesktop()) return;
    if (openIndex.current === i) return;

    if (openIndex.current !== null) {
      collapseCard(openIndex.current, true);
      clearActiveClass();
    }

    openIndex.current = i;
    setActiveClass(i);
    expandCard(i);
  };

  const handleLeave = (i) => {
    if (!isDesktop()) return;
    if (openIndex.current !== i) return;

    collapseCard(i);
    openIndex.current = null;
    // Clear active styles after short beat so text doesn't flash on dark
    window.setTimeout(() => {
      if (openIndex.current === null) clearActiveClass();
    }, 280);
  };

  const handleToggle = (i) => {
    if (isDesktop()) return;

    if (openIndex.current === i) {
      collapseCard(i);
      openIndex.current = null;
      window.setTimeout(() => {
        if (openIndex.current === null) clearActiveClass();
      }, 280);
      return;
    }

    if (openIndex.current !== null) {
      collapseCard(openIndex.current, true);
      clearActiveClass();
    }

    openIndex.current = i;
    setActiveClass(i);
    expandCard(i);
  };

  return (
    <section id="projects" className="works-section relative z-10 flex min-h-screen flex-col">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"theme-text-primary"}
        withScrollTrigger={true}
      />

      <div ref={listRef} className="project-expand-list relative px-3 pb-20 sm:px-5 md:px-8 lg:px-10">
        {projects.map((project, i) => {
          const tech = project.frameworks.map((f) => ({
            label: f.name,
            icon: getTechIcon(f.name),
          }));
          // 3 crops of the real project shot — no grainy bgImage flash
          const gallery = [
            { src: project.image, position: "object-top" },
            { src: project.image, position: "object-center" },
            { src: project.image, position: "object-bottom" },
          ];

          return (
            <div
              key={project.id}
              ref={(el) => {
                containerRefs.current[i] = el;
              }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              onClick={() => handleToggle(i)}
              className="project-expand-row relative cursor-pointer overflow-hidden border-b border-[var(--theme-border-soft)] px-4 md:px-6"
              style={{ height: COLLAPSED_HEIGHT }}
            >
              <div
                ref={(el) => {
                  goldRefs.current[i] = el;
                }}
                className="project-gold-reveal"
                aria-hidden
              />

              <div className="project-row-top relative z-10 flex h-[128px] items-center gap-3 md:gap-4">
                <h2 className="project-title min-w-0 flex-[1.2] text-lg font-semibold tracking-tight md:text-xl lg:text-[1.65rem]">
                  {project.name}
                </h2>

                <p className="project-desc hidden min-w-0 flex-1 text-xs leading-snug md:line-clamp-2 md:block md:text-sm">
                  {project.description}
                </p>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="project-view-link shrink-0 text-sm md:text-base"
                >
                  View →
                </a>
              </div>

              <div className="relative z-10 pb-4">
                <div className="mb-2 flex flex-wrap gap-2">
                  {tech.map((t, idx) => (
                    <TechBadge
                      key={`${project.id}-tech-${idx}`}
                      icon={t.icon}
                      label={t.label}
                    />
                  ))}
                </div>

                <div
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  className="project-gallery flex gap-6"
                >
                  {gallery.map((shot, idx) => (
                    <div
                      key={`${project.id}-shot-${idx}`}
                      className="project-gallery-shot overflow-hidden rounded-xl"
                    >
                      <img
                        src={shot.src}
                        alt={`${project.name} preview ${idx + 1}`}
                        className={`h-full w-full object-cover ${shot.position}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Works;
