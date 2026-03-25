import React from "react";
import { motion } from "framer-motion";
import {
  TechnologiesContainer,
} from "../styles/Technologies.styled";
import { SectionHeading, SectionTitle } from "../styles/SectionHeading";
import { LogoLoop } from "./LogoLoop";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiNpm,
  SiLaravel,
  SiGit,
  SiGithub,
  SiFigma,
  SiAdobexd,
  SiVisualstudiocode,
} from "react-icons/si";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Technologies = () => {
  const techLogos = [
    { node: <SiHtml5 />, title: "HTML5" },
    { node: <SiCss3 />, title: "CSS3" },
    { node: <SiJavascript />, title: "JavaScript ES6+" },
    { node: <SiReact />, title: "React JS" },
    { node: <SiTailwindcss />, title: "Tailwind CSS" },
    { node: <SiBootstrap />, title: "Bootstrap" },
    { node: <SiSass />, title: "SASS" },
    { node: <SiNpm />, title: "NPM" },
    { node: <SiLaravel />, title: "PHP Laravel" },
    { node: <SiGit />, title: "Git" },
    { node: <SiGithub />, title: "GitHub" },
    { node: <SiFigma />, title: "Figma" },
    { node: <SiAdobexd />, title: "Adobe XD" },
    { node: <SiVisualstudiocode />, title: "Visual Studio Code" },
  ];

  return (
    <TechnologiesContainer
      as={motion.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <SectionHeading as={motion.div} variants={itemVariants}>
        <SectionTitle dark="true" number="tech">
          Technologies
        </SectionTitle>
      </SectionHeading>

      <motion.div variants={itemVariants}>
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={60}
          gap={40}
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#0d0e0e"
          ariaLabel="Technologies"
        />
      </motion.div>
    </TechnologiesContainer>
  );
};

export default Technologies;
