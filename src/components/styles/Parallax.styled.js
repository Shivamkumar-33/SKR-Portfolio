import styled from "styled-components";

export const ParallaxContainer = styled.div`
  height: 70vh;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 45vh;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    height: 38vh;
  }
`;

export const ParallaxText = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  color: white;
  width: 100%;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 0, 0, 0.3);
  padding: 0 2rem;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 2.5rem;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.25rem;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 1.75rem;
  }
`;
