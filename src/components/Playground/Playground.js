import React from "react";
import {
  PlaygroundContainer,
  StyledPlayground,
} from "../styles/Playground.styled";
import { SectionHeading, SectionTitle } from "../styles/SectionHeading";
import { StyledParagraph } from "../styles/Typography.styled";
import PlaygroundProjectComponent from "./PlaygroundProject";
import { projectsData } from "./data";

const Playground = () => {
  return (
    <StyledPlayground id="playground">
      <SectionHeading>
        <SectionTitle dark="true" number="playground">Playground</SectionTitle>
      </SectionHeading>
      <StyledParagraph textAlign="center">
        A collection of projects that I've created for practice and leisure.
      </StyledParagraph>
      <PlaygroundContainer>
        {projectsData.map((project) => {
          return <PlaygroundProjectComponent key={project.id} {...project} />;
        })}
      </PlaygroundContainer>
    </StyledPlayground>
  );
};

export default Playground;
