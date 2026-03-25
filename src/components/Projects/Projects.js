import React from "react";
import { motion } from "framer-motion";
import { StyledParagraph, StyledLink } from "../styles/Typography.styled";
import { ProjectsContainer, StyledProjects } from "../styles/Projects.styled";
import { SectionHeading, SectionTitle } from "../styles/SectionHeading";
import { projectData } from "./projectsData";
import ProjectCardComponent from "./ProjectCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Projects = () => {
  return (
    <StyledProjects 
      id="projects"
      as={motion.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <SectionHeading as={motion.div} variants={itemVariants}>
        <SectionTitle dark="true" number="project">Projects</SectionTitle>
      </SectionHeading>
      <StyledParagraph as={motion.p} variants={itemVariants} textAlign="center">
        Selected projects I've worked on recently.{" "}
        <StyledLink
          href="https://github.com/Shivamkumar-33"
          target="_blank"
          rel="noopener noreferrer"
        >
          Want to see more?
        </StyledLink>
      </StyledParagraph>
      <ProjectsContainer as={motion.div} variants={containerVariants}>
        {projectData.map((project, index) => {
          return (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCardComponent {...project} />
            </motion.div>
          );
        })}
      </ProjectsContainer>
    </StyledProjects>
  );
};

export default Projects;
