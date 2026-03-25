import styled from "styled-components";
import { Link as Button } from "react-scroll";

export const StyledButton = styled(Button)`
  box-shadow: none !important;
  border-radius: 0.1875rem;
  font-weight: 500;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 0.9375em;
  text-transform: uppercase;
  color: #fff;
  padding: 0 2.5rem;
  outline: none !important;
  overflow: hidden;
  display: inline-block;
  position: relative;
  letter-spacing: 0.03125rem;
  border: 0;
  cursor: pointer;

  background: ${(props) => (props.secondary ? "#4353ff" : "#fa2904")};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${(props) => (props.secondary ? "0 4px 20px rgba(67, 83, 255, 0.35)" : "0 4px 20px rgba(252, 41, 4, 0.35)")};
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.85em;
    padding: 0 2.1875rem;
  }

  &::before {
    content: ${(props) => `url(${props.icon})`};
    font: 0.9375rem/1.2em font;
    color: #fff;
    position: absolute;
    height: 100%;
    right: 1.5625rem;
    top: 50%;
    margin-top: -0.5625rem;
    transition: all 0.3s;
    opacity: 0;
    filter: alpha(opacity=0);
    transform: translateX(-1.25rem);
  }

  &:hover:before {
    opacity: 1;
    filter: alpha(opacity=100);
    transform: translateX(0);
  }

  & span {
    position: relative;
    display: block;
    transition: all 0.3s;
  }

  &:hover span {
    transform: translateX(-0.625rem);
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 44px;
    line-height: 44px;
  }

  @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    max-width: 280px;
    text-align: center;
  }
`;
