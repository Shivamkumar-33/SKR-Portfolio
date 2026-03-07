import styled, { keyframes } from "styled-components";
import { Link as NavLink } from "react-scroll";

export const StyledNavbar = styled.nav`
  position: absolute;
  left: 0;
  right: 0;
  top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7.5625rem;
  padding: 0 5rem;
  transition: 0.5s ease-in-out;
  z-index: 999;
  color: #fff;

  &.sticky {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: ${({ theme }) => theme.backgroundColor.dark};
    height: 5.32875rem;
    z-index: 999;
    backdrop-filter: blur(12px);
    background-color: rgba(13, 14, 14, 0.85);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 2.5rem;
  }
`;

const revealSlash = keyframes`
  from { transform: scaleY(0); opacity: 0; }
  to   { transform: scaleY(1); opacity: 1; }
`;

const revealS = keyframes`
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const revealK = keyframes`
  from { opacity: 0; transform: translateX(12px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const slashGlow = keyframes`
  0%, 100% { text-shadow: 0 0 6px rgba(252,41,4,0.4); }
  50%       { text-shadow: 0 0 18px rgba(252,41,4,0.9), 0 0 30px rgba(252,41,4,0.3); }
`;

export const NavLogoWrapper = styled.div`
  cursor: pointer;
  user-select: none;
  transition: transform 0.15s ease;
  will-change: transform;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1.5px;
    background: ${({ theme }) => theme.backgroundColor.orange};
    transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover::after {
    width: 100%;
  }

  &:active {
    transform: scale(0.94) !important;
  }
`;

export const NavLogoInner = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: ${({ $expanded }) => $expanded ? '1.1rem' : '1.45rem'};
  font-weight: 700;
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: ${({ $expanded }) => $expanded ? '0.06rem' : '0.02rem'};
  line-height: 1;
  white-space: nowrap;
  transition: font-size 0.25s ease, letter-spacing 0.25s ease;

  .char {
    display: inline-block;
    color: #fff;
    transition: color 0.2s ease, text-shadow 0.2s ease;
  }

  .s {
    animation: ${revealS} 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
  }

  .k {
    animation: ${revealK} 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both;
  }

  .slash {
    color: ${({ theme }) => theme.backgroundColor.orange};
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 1;
    display: inline-block;
    transform-origin: center;
    animation:
      ${revealSlash} 0.3s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both,
      ${slashGlow} 2.8s ease-in-out 0.8s infinite;
  }

  ${NavLogoWrapper}:hover .char {
    color: rgba(255, 255, 255, 0.85);
    text-shadow: 0 0 12px rgba(255,255,255,0.25);
  }

  ${NavLogoWrapper}:hover .slash {
    text-shadow: 0 0 22px rgba(252,41,4,1), 0 0 40px rgba(252,41,4,0.45);
  }
`;

export const NavMenuList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
  flex: 1;
  margin-left: 8rem;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const NavList = styled.li``;

export const StyledNavLinks = styled(NavLink)`
  font-size: 0.75rem;
  letter-spacing: 0.09375rem;
  color: ${({ theme }) => theme.color.lightGray};
  transition: 0.3s ease;
  text-transform: uppercase;
  position: relative;
  font-weight: 500;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.3rem;
    right: 0;
    left: 0;
    width: 0;
    transform: scaleX(1);
    height: 0.0625rem;
    background: ${({ theme }) => theme.backgroundColor.orange};
    transition: 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: ${({ theme }) => theme.color.light};
  }

  &.active::after {
    content: "";
    position: absolute;
    bottom: -0.3rem;
    right: 0;
    left: 0;
    width: 100%;
    transform: scaleX(1);
    height: 0.0625rem;
    background: ${({ theme }) => theme.backgroundColor.orange};
    transition: 0.3s ease-in-out;
  }
`;

export const StyledCTA = styled.a`
  font-size: 0.625rem;
  letter-spacing: 0.1875rem;
  font-weight: 500;
  transition: 0.3s ease;
  text-transform: uppercase;
  padding: 0.8rem 1.5rem;
  background: ${({ theme }) => theme.backgroundColor.darkGray};
  transition: 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  & span {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
  }

  & > span {
    overflow: hidden;
  }

  & > span > span {
    overflow: hidden;
  }

  &:hover > span > span {
    animation: MoveUpInitial 0.2s forwards, MoveUpEnd 0.2s forwards 0.2s;
  }

  @keyframes MoveUpInitial {
    to {
      transform: translate3d(0, -105%, 0);
    }
  }

  @keyframes MoveUpEnd {
    from {
      transform: translate3d(0, 100%, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  &::before {
    content: "";
    background: ${({ theme }) => theme.backgroundColor.orange};
    transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1);
    transform-origin: 100% 50%;
  }

  &:hover::before {
    transform: scale3d(0, 1, 1);
    transform-origin: 0% 50%;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const Menu = styled.div`
  cursor: pointer;
  display: none;

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const Line = styled.div`
  height: 0.1125rem;
  width: ${(props) => props.width || "2rem"};
  background: ${({ theme }) => theme.color.light};
  margin: 0.28125rem 0;
  transition: 0.3s ease;
  margin-left: ${(props) => props.ml || "0"};
`;
