import React from "react";
import {
  CloseIcon,
  Icon,
  MobileMenuContainer,
  MobileMenuList,
  MobileMenuLink,
  MobileButton,
  MobileSocials,
  MobileSocial,
  MobileQuote,
  CloseText,
} from "../styles/MobileMenu.styled";

const MobileMenu = ({ isOpen, toggle }) => {
  return (
    <MobileMenuContainer isOpen={isOpen} toggle={toggle}>
      <Icon onClick={toggle}>
        <CloseText>Close</CloseText>
        <CloseIcon />
      </Icon>
      <MobileMenuList>
        <MobileMenuLink to="home" onClick={toggle} aria-label="Go to Home section">
          Home
        </MobileMenuLink>
        <MobileMenuLink to="projects" onClick={toggle} aria-label="View my Projects">
          Projects
        </MobileMenuLink>
        <MobileMenuLink to="about" onClick={toggle} aria-label="Learn About me">
          About
        </MobileMenuLink>
        <MobileMenuLink to="playground" onClick={toggle} aria-label="View Playground projects">
          Playground
        </MobileMenuLink>
        <MobileButton
          href="mailto:shivamjmp2@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#fff"
              >
                <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" />
              </svg>
              get in touch
            </span>
          </span>
        </MobileButton>
      </MobileMenuList>
      <MobileSocials>
        <MobileSocial
          href="mailto:shivamjmp2@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
          title="Email"
        >
          mail
        </MobileSocial>
        <MobileSocial
          href="https://github.com/Shivamkumar-33"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          github
        </MobileSocial>

        <MobileSocial
          href="https://www.linkedin.com/in/shivam-kumar-34471224b/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          linkedin
        </MobileSocial>
      </MobileSocials>
      <MobileQuote>work for that</MobileQuote>
    </MobileMenuContainer>
  );
};

export default MobileMenu;
