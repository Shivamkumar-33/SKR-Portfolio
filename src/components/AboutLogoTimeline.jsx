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
