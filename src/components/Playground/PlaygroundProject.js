import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { IconContext } from "react-icons";
import {
  PlaygroundCard,
  PlaygroundImageWrap,
  PlaygroundCardImage,
  PlaygroundCardContent,
  PlaygroundTags,
  PlaygroundTag,
  PlaygroundTitle,
  PlaygroundDescription,
  PlaygroundLinks,
  PlaygroundLink,
} from "../styles/Playground.styled";

const PlaygroundProjectComponent = ({
  img,
  projectName,
  description,
  tags = [],
  liveLink,
}) => {
  return (
    <IconContext.Provider value={{ size: "1.25rem" }}>
      <PlaygroundCard>
        <PlaygroundImageWrap>
          <PlaygroundCardImage 
            src={img} 
            alt={projectName} 
            width="320" 
            height="200" 
            loading="lazy" 
          />
        </PlaygroundImageWrap>
        <PlaygroundCardContent>
          {tags && tags.length > 0 && (
            <PlaygroundTags>
              {tags.map((tag) => (
                <PlaygroundTag key={tag}>{tag}</PlaygroundTag>
              ))}
            </PlaygroundTags>
          )}
          <PlaygroundTitle>{projectName}</PlaygroundTitle>
          {description && (
            <PlaygroundDescription>{description}</PlaygroundDescription>
          )}
          <PlaygroundLinks>
            {liveLink && (
              <PlaygroundLink
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                title="View Live Demo"
                aria-label={`View live demo of ${projectName}`}
              >
                <BiLinkExternal />
              </PlaygroundLink>
            )}
          </PlaygroundLinks>
        </PlaygroundCardContent>
      </PlaygroundCard>
    </IconContext.Provider>
  );
};

export default PlaygroundProjectComponent;
