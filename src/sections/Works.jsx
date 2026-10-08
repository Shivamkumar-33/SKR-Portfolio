import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import ProjectSplitCard from "../components/ProjectSplitCard";
import { projects } from "../constants";
import { gsap, ScrollTrigger } from "../lib/gsap";

const stackItems = [
  { name: "react", label: "React", slug: "react" },
  { name: "nextjs", label: "Next.js", slug: "nextjs", dark: true },
  { name: "typescript", label: "TypeScript", slug: "typescript" },
  { name: "js", label: "JavaScript", slug: "javascript" },
  { name: "tailwindcss", label: "Tailwind CSS", slug: "tailwindcss" },
  { name: "nodejs", label: "Node.js", slug: "nodejs" },
  { name: "expressjs", label: "Express", slug: "express", dark: true },
  { name: "mongodb", label: "MongoDB", slug: "mongodb" },
  { name: "postgresql", label: "PostgreSQL", slug: "postgresql" },
  { name: "redis", label: "Redis", slug: "redis" },
  { name: "graphql", label: "GraphQL", slug: "graphql" },
  { name: "docker", label: "Docker", slug: "docker" },
  { name: "aws", label: "AWS", slug: "amazonwebservices", dark: true },
  { name: "github", label: "GitHub", slug: "github", dark: true },
];

// Use devicon CDN for lightweight SVG icons — no JS bundle cost
const getIconUrl = (slug, dark) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original${dark ? "-wordmark" : ""}.svg`;

const Works = () => {
  const sectionRef = useRef(null);
  const stackTrackRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".split-project-card", {
        y: 56,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".split-project-list",
          start: "top 84%",
          once: true,
        },
      });

      gsap.from(".stack-showcase-head, .stack-marquee", {
        y: 32,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stack-showcase",
          start: "top 80%",
          once: true,
        },
      });

      const track = stackTrackRef.current;
      if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      const stackLoop = gsap.fromTo(
        track,
        { xPercent: 0 },
        { xPercent: -50, duration: 45, ease: "none", repeat: -1 }
      );

      const stackTrigger = ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(
            1,
            5,
            1 + Math.abs(self.getVelocity()) / 700
          );

          gsap.to(stackLoop, {
            timeScale: boost * self.direction,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });

      return () => {
        stackTrigger.kill();
        stackLoop.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="works-section relative z-10 flex min-h-screen flex-col"
    >
      <header className="works-showcase-header">
        <p className="works-showcase-eyebrow">Ideas brought to life</p>
        <h2 className="works-showcase-title" aria-label="Vision in motion">
          <span>Vision in</span>{" "}
          <span className="animated-gradient-text">motion</span>
        </h2>
      </header>

      <div className="split-project-shell">
        <div className="split-project-header">
          <span className="technical-label">Selected work</span>
          <span>
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>

        <div className="split-project-list">
          {projects.map((project, index) => (
            <ProjectSplitCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>

      <section className="stack-showcase" aria-labelledby="stack-title">
        <header className="stack-showcase-head">
          <p className="stack-showcase-eyebrow">The stack behind the work</p>
          <h2 id="stack-title" className="stack-showcase-title">
            Built <span className="animated-gradient-text">with</span>
          </h2>
          <p className="stack-showcase-copy">
            The tools I use to turn ideas into reliable, scalable digital
            products.
          </p>
        </header>

        <div className="stack-marquee">
          <div ref={stackTrackRef} className="stack-marquee-track">
            {[0, 1].map((group) => (
              <div
                key={group}
                className="stack-marquee-group"
                aria-hidden={group === 1 ? "true" : undefined}
              >
                {stackItems.map((item) => (
                  <figure
                    key={`${group}-${item.name}`}
                    className="stack-card"
                    aria-label={item.label}
                  >
                    <img
                      src={getIconUrl(item.slug, item.dark)}
                      alt={item.label}
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                      className="stack-card-icon"
                    />
                    <figcaption>{item.label}</figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Works;
