import styled from "styled-components";

export const StyledHome = styled.section`
  background-color: ${({ theme }) => theme.backgroundColor.dark};
  color: ${({ theme }) => theme.color.lightGray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 9.5rem;
  height: 100vh;
  position: relative;

  /* Desktop-only: give the left hero content more visual weight */
  .hero-intro {
    font-size: 1.125rem;
    max-width: 40rem;
    line-height: 1.7;
    position: relative;
    z-index: 1;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: center;
    padding: 0;
  }

  /* Tablet follows mobile layout to prevent overlap with floating hero elements */
  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: auto;
    min-height: 100vh;
    align-items: center;
    justify-content: flex-start;
    padding: 8rem 1rem 4rem 1rem;
    text-align: center;
    overflow-x: clip;
    overflow-y: visible;
  }
`;

export const Name = styled.h1`
  font-size: 2.75rem;
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.color.light};

  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.1875rem;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.95rem;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 1.875rem;
  }
`;

export const Title = styled.h2`
  font-size: 4.25rem;
  font-weight: 700;
  margin: 0.5rem 0 1rem 0;
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.color.secondaryLight};

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
    font-size: 3.25rem;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.25rem;
    margin-bottom: 0.75rem;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.6875rem;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 2.1875rem;
  }
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  position: relative;
  z-index: 1;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const Line = styled.hr`
  width: 5rem;
  position: absolute;
  bottom: 6rem;
  z-index: 1;
  background: ${({ theme }) => theme.backgroundColor.orange};
  border: none;
  height: 0.125rem;
  border-radius: 2.8125rem;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: static;
    margin: 1.5rem auto 0;
  }
`;

export const Greeting = styled.p`
  position: absolute;
  bottom: 3rem;
  left: 9.5rem;
  z-index: 1;
  font-size: 0.95rem;
  color: #b2b2b2;
  letter-spacing: 0.02em;

  span {
    color: ${({ theme }) => theme.color.secondaryLight};
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: static;
    margin-top: 1rem;
  }
`;

export const Socials = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  position: absolute;
  right: 5rem;
  bottom: 3rem;
  z-index: 1;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const Social = styled.a`
  cursor: pointer;
  transition: 0.3s ease;
  position: relative;
  color: ${({ theme }) => theme.color.light};

  &:hover {
    transform: translateY(-0.3125rem);
    color: ${({ theme }) => theme.backgroundColor.orange};
  }

  &::after {
    content: "";
    position: absolute;
    transform: translate(-50%, -50%);
    left: -1rem;
    top: 50%;
    height: 0.5rem;
    width: 0.5rem;
    background: ${({ theme }) => theme.backgroundColor.orange};
    border-radius: 2.8125rem;
    opacity: 0;
    transition: all 0.3s;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const Quote = styled.span`
  position: absolute;
  left: 9.5rem;
  right: auto;
  bottom: 1.45rem;
  color: #94929d;
  font-size: 0.72rem;
  letter-spacing: 0.11rem;
  text-transform: uppercase;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;
