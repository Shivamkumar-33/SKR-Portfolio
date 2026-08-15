import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import StackIcon from "tech-stack-icons";
import ProjectSplitCard from "../components/ProjectSplitCard";
import { projects } from "../constants";
import { gsap, ScrollTrigger } from "../lib/gsap";

const stackItems = [
  { name: "react", label: "React" },
  { name: "nextjs", label: "Next.js", variant: "dark" },
  { name: "typescript", label: "TypeScript" },
  { name: "js", label: "JavaScript" },
  { name: "tailwindcss", label: "Tailwind CSS" },
  { name: "nodejs", label: "Node.js" },
  { name: "expressjs", label: "Express", variant: "dark" },
  { name: "mongodb", label: "MongoDB" },
  { name: "postgresql", label: "PostgreSQL" },
  { name: "redis", label: "Redis" },
  { name: "graphql", label: "GraphQL" },
  { name: "docker", label: "Docker" },
  { name: "aws", label: "AWS", variant: "dark" },
  { name: "github", label: "GitHub", variant: "dark" },
];

const Works = () => {
  const sectionRef = useRef(null);
  const stackTrackRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".split-project-card", {
        y: 56,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
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
        { xPercent: -50, duration: 42, ease: "none", repeat: -1 }
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
                    <StackIcon
                      name={item.name}
                      variant={item.variant}
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
