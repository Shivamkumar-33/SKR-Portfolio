import styled from "styled-components";

export const TechnologiesContainer = styled.section`
  background-color: ${({ theme }) => theme.backgroundColor.dark};
  color: ${({ theme }) => theme.color.light};
  padding: 3rem 0;
`;

export const TechnologiesHeader = styled.h2`
  text-align: center;
  font-weight: 700;
  margin-bottom: 3rem;
`;

// LogoLoop Styled Components
export const LogoLoopContainer = styled.div`
  position: relative;
  --logoloop-gap: 32px;
  --logoloop-logoHeight: 60px;
  --logoloop-fadeColorAuto: #0d0e0e;

  height: ${({ isVertical }) => (isVertical ? "100%" : "auto")};
  display: ${({ isVertical }) => (isVertical ? "inline-block" : "block")};
  width: 100%;
  overflow: hidden;

  ${({ scaleOnHover }) =>
    scaleOnHover &&
    `
    padding-top: calc(var(--logoloop-logoHeight) * 0.1);
    padding-bottom: calc(var(--logoloop-logoHeight) * 0.1);
  `}

  ${({ fadeOut }) =>
    fadeOut &&
    `
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: clamp(24px, 8%, 120px);
      pointer-events: none;
      z-index: 10;
    }

    &::before {
      left: 0;
      background: linear-gradient(
        to right,
        var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    }

    &::after {
      right: 0;
      background: linear-gradient(
        to left,
        var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  `}

  @media (prefers-color-scheme: dark) {
    --logoloop-fadeColorAuto: #0b0b0b;
  }

  @media (prefers-reduced-motion: reduce) {
    .logoloop__track {
      transform: translate3d(0, 0, 0) !important;
    }

    img,
    span {
      transition: none !important;
    }
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    --logoloop-gap: 24px;
    --logoloop-logoHeight: 48px;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    --logoloop-gap: 18px;
    --logoloop-logoHeight: 38px;
  }
`;

export const LogoLoopTrack = styled.div`
  display: flex;
  width: max-content;
  will-change: transform;
  user-select: none;
  position: relative;
  z-index: 0;
`;

export const LogoLoopList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const LogoLoopItem = styled.li`
  flex: 0 0 auto;
  margin-right: var(--logoloop-gap);
  font-size: var(--logoloop-logoHeight);
  line-height: 1;

  &:last-child {
    margin-right: var(--logoloop-gap);
  }

  img {
    height: var(--logoloop-logoHeight);
    width: auto;
    display: block;
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
    -webkit-user-drag: none;
    pointer-events: none;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover img,
  &:hover span {
    transform: scale(1.2);
    transform-origin: center center;
  }
`;

export const LogoLoopNode = styled.span`
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const LogoLoopLink = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  border-radius: 4px;
  transition: opacity 0.2s ease;
  color: inherit;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;
