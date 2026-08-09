import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import TechBadge from "../components/TechBadge";
import { projects } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RiReactjsLine } from "react-icons/ri";
import {
  SiExpress,
  SiMongodb,
  SiNodedotjs,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FaLayerGroup, FaKey } from "react-icons/fa6";

const COLLAPSED_HEIGHT = 200;
const EXPANDED_HEIGHT = 520;

const CLIP_HIDDEN = "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
const CLIP_VISIBLE = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

const TECH_ICON_MAP = {
  React: RiReactjsLine,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Supabase: SiSupabase,
  "MERN Stack": FaLayerGroup,
  "Tailwind CSS": SiTailwindcss,
  "Gemini API": TbApi,
  MongoDB: SiMongodb,
  "Socket.io": SiSocketdotio,
  JWT: FaKey,
};

const Works = () => {
  const listRef = useRef(null);
  const containerRefs = useRef([]);
  const contentRefs = useRef([]);
  const glowRefs = useRef([]);
  const overlayRefs = useRef([]);
  const techRefs = useRef([]);
  const imageRefs = useRef([]);
  const openIndex = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const reduceMotion = useReducedMotion();

  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  useGSAP(
    () => {
      const rows = gsap.utils.toArray(".project-expand-row");
      gsap.from(rows, {
        y: 100,
        opacity: 0,
        delay: 0.2,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 82%",
        },
      });
    },
    { scope: listRef }
  );

  const isDesktop = () => window.innerWidth >= 768;

  const revealGold = (i) => {
    const overlay = overlayRefs.current[i];
    if (!overlay) return;

    gsap.killTweensOf(overlay);
    gsap.fromTo(
      overlay,
      { clipPath: CLIP_HIDDEN },
      {
        clipPath: CLIP_VISIBLE,
        duration: reduceMotion ? 0.15 : 0.45,
        ease: "power2.out",
      }
    );
  };

  const hideGold = (i) => {
    const overlay = overlayRefs.current[i];
    if (!overlay) return;

    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      clipPath: CLIP_HIDDEN,
      duration: reduceMotion ? 0.12 : 0.35,
      ease: "power2.in",
    });
  };

  const expandRow = (i, { duration = 0.65, contentY = 110 } = {}) => {
    openIndex.current = i;
    setActiveIndex(i);
    revealGold(i);

    gsap.to(containerRefs.current[i], {
      height: EXPANDED_HEIGHT,
      duration: reduceMotion ? 0.2 : duration,
      ease: "expo.out",
    });

    const content = contentRefs.current[i];
    if (content?.children?.length) {
      gsap.fromTo(
        content.children,
        { y: contentY, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: reduceMotion ? 0 : 0.1,
          duration: reduceMotion ? 0.2 : 0.6,
          ease: "expo.out",
        }
      );
    }

    gsap.to(techRefs.current[i], {
      opacity: 1,
      y: 0,
      duration: reduceMotion ? 0.15 : 0.45,
      ease: "power2.out",
    });

    const images = imageRefs.current[i] || [];
    if (images.length) {
      gsap.fromTo(
        images,
        { y: 40, scale: 0.94, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          duration: reduceMotion ? 0.2 : 0.55,
          ease: "power3.out",
          delay: 0.05,
        }
      );
    }

    gsap.to(glowRefs.current[i], {
      opacity: 1,
      scale: 1.25,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const collapseRow = (i, { duration = 0.5, contentY = 110 } = {}) => {
    if (openIndex.current === i) {
      openIndex.current = null;
      setActiveIndex(null);
    }

    hideGold(i);

    gsap.to(containerRefs.current[i], {
      height: COLLAPSED_HEIGHT,
      duration: reduceMotion ? 0.15 : duration,
      ease: "power2.inOut",
    });

    const content = contentRefs.current[i];
    if (content?.children?.length) {
      gsap.to(content.children, {
        y: contentY,
        opacity: 0,
        duration: reduceMotion ? 0.1 : 0.28,
        ease: "power2.in",
      });
    }

    gsap.to(techRefs.current[i], {
      opacity: 0,
      y: 12,
      duration: reduceMotion ? 0.1 : 0.28,
    });

    gsap.to(glowRefs.current[i], {
      opacity: 0,
      scale: 0.85,
      duration: 0.35,
    });
  };

  const handleEnter = (i) => {
    if (!isDesktop()) return;
    expandRow(i, { duration: reduceMotion ? 0.2 : 0.65 });
  };

  const handleLeave = (i) => {
    if (!isDesktop()) return;
    collapseRow(i);
  };

  const handleMove = (e, i) => {
    if (!isDesktop() || reduceMotion) return;
    const el = containerRefs.current[i];
    const glow = glowRefs.current[i];
    if (!el || !glow) return;

    const rect = el.getBoundingClientRect();
    gsap.to(glow, {
      x: e.clientX - rect.left - 240,
      y: e.clientY - rect.top - 240,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleToggle = (i) => {
    if (isDesktop()) return;

    if (openIndex.current === i) {
      collapseRow(i, { duration: 0.4, contentY: 80 });
      return;
    }

    if (openIndex.current !== null) {
      collapseRow(openIndex.current, { duration: 0.35, contentY: 80 });
    }

    expandRow(i, { duration: 0.55, contentY: 80 });
  };

  return (
    <section id="projects" className="theme-section relative flex min-h-screen flex-col">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"theme-text-primary"}
        withScrollTrigger={true}
      />

      <div ref={listRef} className="project-expand-list relative px-6 pb-24 md:px-12 lg:px-16">
        {projects.map((project, i) => {
          const tech = project.frameworks.map((f) => ({
            label: f.name,
            icon: TECH_ICON_MAP[f.name] || FaLayerGroup,
          }));
          const gallery = [project.image, project.bgImage].filter(Boolean);
          const isActive = activeIndex === i;

          return (
            <motion.div
              key={project.id}
              ref={(el) => {
                containerRefs.current[i] = el;
              }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              onMouseMove={(e) => handleMove(e, i)}
              onClick={() => handleToggle(i)}
              className={`project-expand-row relative cursor-pointer overflow-hidden border-b border-[var(--theme-border-soft)] ${
                isActive ? "is-active" : ""
              }`}
              style={{ height: COLLAPSED_HEIGHT }}
              initial={false}
            >
              {/* Theme gold wipe reveal */}
              <div
                ref={(el) => {
                  overlayRefs.current[i] = el;
                }}
                className="project-gold-reveal"
                aria-hidden
              />

              <div
                ref={(el) => {
                  glowRefs.current[i] = el;
                }}
                className="pointer-events-none absolute z-[1] h-[480px] w-[480px] rounded-full opacity-0 blur-[130px] bg-gradient-to-r from-[#BFA181]/40 via-[#D4C5B0]/25 to-[#BFA181]/15"
              />

              <div className="relative z-10 grid h-[200px] grid-cols-1 items-center gap-4 px-3 md:grid-cols-3 md:gap-8 md:px-8">
                <motion.h2
                  className="project-title line-clamp-2 text-2xl font-semibold tracking-tight transition-colors duration-300 md:text-4xl lg:text-[2.65rem]"
                  animate={
                    reduceMotion
                      ? undefined
                      : { x: isActive ? 10 : 0, letterSpacing: isActive ? "0.02em" : "-0.025em" }
                  }
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {project.name}
                </motion.h2>

                <motion.p
                  className="project-desc hidden text-base transition-colors duration-300 md:line-clamp-3 md:block md:text-lg"
                  animate={reduceMotion ? undefined : { opacity: isActive ? 1 : 0.72 }}
                  transition={{ duration: 0.35 }}
                >
                  {project.description}
                </motion.p>

                <div className="md:text-right">
                  <motion.a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="project-view-link inline-flex items-center gap-2 text-lg transition-colors duration-300 md:text-xl"
                    whileHover={reduceMotion ? undefined : { x: 6 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    View
                    <motion.span
                      aria-hidden
                      animate={reduceMotion ? undefined : { x: isActive ? 4 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </div>
              </div>

              <div
                ref={(el) => {
                  contentRefs.current[i] = el;
                }}
                className="relative z-10 px-3 pb-10 md:px-8"
              >
                <div
                  ref={(el) => {
                    techRefs.current[i] = el;
                  }}
                  className="mb-7 flex translate-y-2 flex-wrap gap-3.5 opacity-0"
                >
                  {tech.map((t, idx) => (
                    <motion.div
                      key={`${project.id}-tech-${idx}`}
                      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.04 }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    >
                      <TechBadge icon={t.icon} label={t.label} />
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-5 overflow-x-auto pb-1 md:gap-7">
                  {gallery.map((src, idx) => (
                    <div
                      key={`${project.id}-${idx}`}
                      ref={(el) => {
                        if (!imageRefs.current[i]) imageRefs.current[i] = [];
                        imageRefs.current[i][idx] = el;
                      }}
                      className="h-[170px] w-[320px] shrink-0 overflow-hidden rounded-2xl border border-black/10 md:h-[200px] md:w-[420px] lg:w-[460px]"
                    >
                      <motion.img
                        src={src}
                        alt={`${project.name} preview ${idx + 1}`}
                        className="h-full w-full object-cover"
                        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Works;
