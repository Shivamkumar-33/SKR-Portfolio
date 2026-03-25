import styled from "styled-components";

export const StyledProjects = styled.section`
  background-color: ${({ theme }) => theme.backgroundColor.dark};
  color: ${({ theme }) => theme.color.light};
`;

export const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 2rem;
  }
`;

export const ProjectCard = styled.article`
  background: ${({ theme }) => theme.backgroundColor.card};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.backgroundColor.orange};
    box-shadow: 0 8px 24px rgba(252, 41, 4, 0.15);
    transform: translateY(-4px);
  }
`;

export const ProjectImageWrap = styled.div`
  overflow: hidden;
`;

export const ProjectCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  ${ProjectCard}:hover & {
    transform: scale(1.08);
  }
`;

export const ProjectCardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

export const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ProjectTag = styled.span`
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  background: rgba(252, 41, 4, 0.1);
  border: 1px solid rgba(252, 41, 4, 0.3);
  border-radius: 20px;
  color: ${({ theme }) => theme.color.light};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

export const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.light};
  line-height: 1.3;
`;

export const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.color.textSecondary};
  line-height: 1.5;
  flex: 1;
`;

export const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

export const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.light};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.backgroundColor.orange};
    color: ${({ theme }) => theme.backgroundColor.orange};
    background: rgba(252, 41, 4, 0.1);
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 44px;
    height: 44px;
  }
`;
