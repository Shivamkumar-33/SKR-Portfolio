import styled from "styled-components";

export const StyledHome = styled.section`
  background-color: ${({ theme }) => theme.backgroundColor.dark};
  color: ${({ theme }) => theme.color.lightGray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8rem;
  height: 100vh;
  position: relative;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: center;
    padding: 0;
  }
`;

export const Name = styled.h1`
  font-size: 2.1875rem;
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.color.light};
  letter-spacing: 0.02em;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.1875rem;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 1.875rem;
  }
`;

export const Title = styled.h2`
  font-size: 3.375rem;
  font-weight: 700;
  margin: 0.5rem 0 1rem 0;
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.color.secondaryLight};
  line-height: 1.15;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
    font-size: 3.25rem;
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
`;

export const Greeting = styled.p`
  position: absolute;
  bottom: 3rem;
  z-index: 1;
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
  right: 45%;
  bottom: 3rem;
  color: #94929d;
  font-size: 0.625rem;
  letter-spacing: 0.125rem;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
