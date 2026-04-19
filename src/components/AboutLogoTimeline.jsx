import { useMemo, useState } from "react";
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

const ICONS = {
  html: SiHtml5,
  css: SiCss,
  js: SiJavascript,
  ts: SiTypescript,
  react: SiReact,
  next: SiNextdotjs,
  tailwind: SiTailwindcss,
  redux: SiRedux,
  vite: SiVite,
  graphql: SiGraphql,
  node: SiNodedotjs,
  express: SiExpress,
  nest: SiNestjs,
  postgres: SiPostgresql,
  mongo: SiMongodb,
  redis: SiRedis,
  docker: SiDocker,
  aws: FaAws,
  git: SiGit,
  github: SiGithub,
};

export const fullStackLogos = [
  { label: "HTML5", icon: "html", color: "#E34F26", animationDelay: -48, animationDuration: 48, row: 1 },
  { label: "CSS3", icon: "css", color: "#1572B6", animationDelay: -36, animationDuration: 48, row: 1 },
  { label: "JavaScript", icon: "js", color: "#F7DF1E", animationDelay: -24, animationDuration: 48, row: 1 },
  { label: "TypeScript", icon: "ts", color: "#3178C6", animationDelay: -12, animationDuration: 48, row: 1 },
  { label: "React", icon: "react", color: "#61DAFB", animationDelay: 0, animationDuration: 48, row: 1 },

  { label: "Next.js", icon: "next", color: "#FFFFFF", animationDelay: -54, animationDuration: 54, row: 2 },
  { label: "Tailwind", icon: "tailwind", color: "#06B6D4", animationDelay: -43, animationDuration: 54, row: 2 },
  { label: "Redux", icon: "redux", color: "#764ABC", animationDelay: -32, animationDuration: 54, row: 2 },
  { label: "Vite", icon: "vite", color: "#646CFF", animationDelay: -21, animationDuration: 54, row: 2 },
  { label: "GraphQL", icon: "graphql", color: "#E10098", animationDelay: -10, animationDuration: 54, row: 2 },

  { label: "Node.js", icon: "node", color: "#339933", animationDelay: -58, animationDuration: 58, row: 3 },
  { label: "Express", icon: "express", color: "#FFFFFF", animationDelay: -46, animationDuration: 58, row: 3 },
  { label: "NestJS", icon: "nest", color: "#E0234E", animationDelay: -34, animationDuration: 58, row: 3 },
  { label: "PostgreSQL", icon: "postgres", color: "#4169E1", animationDelay: -22, animationDuration: 58, row: 3 },
  { label: "MongoDB", icon: "mongo", color: "#47A248", animationDelay: -10, animationDuration: 58, row: 3 },

  { label: "Redis", icon: "redis", color: "#DC382D", animationDelay: -52, animationDuration: 52, row: 4 },
  { label: "Docker", icon: "docker", color: "#2496ED", animationDelay: -41, animationDuration: 52, row: 4 },
  { label: "AWS", icon: "aws", color: "#FF9900", animationDelay: -30, animationDuration: 52, row: 4 },
  { label: "Git", icon: "git", color: "#F05032", animationDelay: -19, animationDuration: 52, row: 4 },
  { label: "GitHub", icon: "github", color: "#FFFFFF", animationDelay: -8, animationDuration: 52, row: 4 },
];

const resolveHeight = (height) => {
  if (typeof height === "number") return `${height}px`;
  if (typeof height === "string" && height.trim()) {
    return height;
  }
  return "400px";
};

const AboutLogoTimeline = ({
  items,
  title = "",
  height = "400px",
  className,
  iconSize = 18,
  showRowSeparator = true,
  animateOnHover = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const rows = useMemo(() => {
    const rowsMap = new Map([
      [1, []],
      [2, []],
      [3, []],
      [4, []],
    ]);

    items.forEach((item) => {
      if (item.row >= 1 && item.row <= 4) {
        rowsMap.get(item.row).push(item);
      }
    });

    return [1, 2, 3, 4].map((row) => rowsMap.get(row));
  }, [items]);

  const normalizedIconSize = Math.max(12, iconSize);
  const animationPlayState = animateOnHover ? (isHovered ? "running" : "paused") : "running";

  return (
    <section
      className={["about-cobe-logo-section", className].filter(Boolean).join(" ")}
      style={{ height: resolveHeight(height) }}
    >
      <div
        className="about-cobe-logo-timeline"
        onMouseEnter={() => animateOnHover && setIsHovered(true)}
        onMouseLeave={() => animateOnHover && setIsHovered(false)}
      >
        <div className="about-cobe-logo-stage">
          {title ? <h3 className="about-cobe-logo-center-title">{title}</h3> : null}

          <div className="about-cobe-logo-rows" style={{ "--logo-rows": 4 }}>
            {rows.map((rowItems, rowIndex) => (
              <div key={`row-${rowIndex + 1}`} className="about-cobe-logo-row-wrap">
                {showRowSeparator ? <span className="about-cobe-logo-separator" /> : null}

                <div className="about-cobe-logo-row" style={{ "--move-play": animationPlayState }}>
                  <div className="about-cobe-logo-track">
                    {[...rowItems, ...rowItems].map((item, index) => {
                      const IconComponent = ICONS[item.icon];
                      if (!IconComponent) return null;

                      return (
                        <div
                          key={`${item.row}-${item.label}-${index}`}
                          className="about-cobe-logo-item"
                          title={item.label}
                        >
                          <span className="about-cobe-logo-icon">
                            <IconComponent
                              style={{
                                width: normalizedIconSize,
                                height: normalizedIconSize,
                                color: item.color || "inherit",
                              }}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="about-cobe-logo-label">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLogoTimeline;
