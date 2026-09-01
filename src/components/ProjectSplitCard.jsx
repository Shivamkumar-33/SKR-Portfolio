import { motion } from "motion/react";
import { TbSparkles } from "react-icons/tb";
import { getTechIcon } from "../constants/techIcons";

const imageVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: -5, scale: 1.4 },
};

const ProjectSplitCard = ({ project, index }) => {
  const isLive = Boolean(project.href) && project.href !== "#";
  const Card = isLive ? motion.a : motion.article;

  const cardProps = isLive
    ? {
        href: project.href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Open ${project.name} in a new tab`,
      }
    : {};

  return (
    <Card
      {...cardProps}
      className="split-project-card"
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap="hover"
      transition={{ type: "spring", duration: 0.6, bounce: 0 }}
    >
      <div className="split-project-preview">
        <div className="split-project-image-fallback" aria-hidden="true">
          <span>{project.shortName}</span>
        </div>

        <motion.img
          src={project.image}
          alt={`${project.name} interface preview`}
          className="split-project-image"
          variants={imageVariants}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="split-project-overlay" />

        <span className="split-project-index">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="split-project-industry">{project.industry}</span>
      </div>

      <div className="split-project-details">
        <div className="split-project-meta">
          <span>Project {String(index + 1).padStart(2, "0")}</span>
          <span className={isLive ? "is-live" : ""}>
            <i aria-hidden="true" />
            {isLive ? "Live" : "In development"}
          </span>
        </div>

        <h3 className="split-project-name">{project.shortName}</h3>
        <p className="split-project-summary">{project.description}</p>

        <p className="split-project-feature-label">What it does</p>
        <ul className="split-project-highlights">
          {project.highlights?.map((highlight) => (
            <li key={highlight}>
              <TbSparkles aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="split-project-chips">
          {project.frameworks.map((framework) => {
            const Icon = getTechIcon(framework.name);

            return (
              <span
                key={`${project.id}-${framework.id}`}
                className="split-project-chip"
              >
                {Icon ? <Icon aria-hidden="true" /> : null}
                {framework.name}
              </span>
            );
          })}
        </div>

        <div className="split-project-action">
          <span>{isLive ? "Open live project" : "Case study coming soon"}</span>
          {isLive ? <span className="split-project-action-arrow" aria-hidden="true">↗</span> : null}
        </div>
      </div>
    </Card>
  );
};

export default ProjectSplitCard;
