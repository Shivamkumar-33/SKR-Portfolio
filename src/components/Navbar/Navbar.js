import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Line,
  Menu,
  NavList,
  NavLogoWrapper,
  NavLogoInner,
  NavMenuList,
  StyledCTA,
  StyledNavbar,
  StyledNavLinks,
} from "../styles/Navbar.styled";
import { animateScroll as scroll } from "react-scroll";
import MobileMenu from "./MobileMenu";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*!?";
const FULL_LEFT  = "Shivam";
const FULL_RIGHT = "Kumar";

const SKLogo = ({ onClick }) => {
  const [left, setLeft]       = useState("S");
  const [right, setRight]     = useState("K");
  const [expanded, setExpanded] = useState(false);
  const wrapRef  = useRef(null);
  const timerRef = useRef(null);

  const animateTo = useCallback((lTarget, rTarget, onDone) => {
    let frame = 0;
    const totalFrames = Math.max(lTarget.length, rTarget.length) * 3 + 5;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      frame++;
      const resolve = (target, idx) => {
        if (!target[idx]) return "";
        if (target[idx] === " ") return " ";
        return frame >= idx * 3 + 3
          ? target[idx]
          : CHARS[Math.floor(Math.random() * CHARS.length)];
      };
      setLeft(lTarget.split("").map((_, i) => resolve(lTarget, i)).join(""));
      setRight(rTarget.split("").map((_, i) => resolve(rTarget, i)).join(""));
      if (frame > totalFrames) {
        clearInterval(timerRef.current);
        setLeft(lTarget);
        setRight(rTarget);
        onDone?.();
      }
    }, 35);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setExpanded(true);
    animateTo(FULL_LEFT, FULL_RIGHT);
  }, [animateTo]);

  const handleMouseMove = useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const { left: l, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - l - width / 2) / 9;
    const y = (e.clientY - top - height / 2) / 9;
    el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.1)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (wrapRef.current) wrapRef.current.style.transform = "";
    animateTo("S", "K", () => setExpanded(false));
  }, [animateTo]);

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <NavLogoWrapper
      ref={wrapRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <NavLogoInner $expanded={expanded}>
        <span className="char s">{left}</span>
        {!expanded && <span className="slash">/</span>}
        <span className="char k">{right}</span>
      </NavLogoInner>
    </NavLogoWrapper>
  );
};

const Navbar = () => {
  const [stickyNav, setStickyNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // Use a lower sticky threshold on tablet/mobile so the menu stays available early.
  const stickyNavFunction = useCallback(() => {
    const isTabletOrMobile = window.innerWidth <= 1024;
    const stickyThreshold = isTabletOrMobile ? 24 : 510;

    if (window.scrollY >= stickyThreshold) {
      setStickyNav(true);
    } else {
      setStickyNav(false);
    }
  }, []);

  useEffect(() => {
    stickyNavFunction();
    window.addEventListener("scroll", stickyNavFunction);
    window.addEventListener("resize", stickyNavFunction);
    return () => {
      window.removeEventListener("scroll", stickyNavFunction);
      window.removeEventListener("resize", stickyNavFunction);
    };
  }, [stickyNavFunction]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toTop = () => {
    scroll.scrollToTop({ delay: 0, duration: 0 });
  };

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const closeOnScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener("scroll", closeOnScroll, { passive: true });
      window.addEventListener("resize", closeOnScroll);
    }

    return () => {
      window.removeEventListener("scroll", closeOnScroll);
      window.removeEventListener("resize", closeOnScroll);
    };
  }, [isOpen]);

  return (
    <StyledNavbar className={stickyNav ? "sticky" : ""}>
      <div>
        <SKLogo onClick={toTop} />
      </div>
      <NavMenuList>
        <NavList>
          <StyledNavLinks
            to="home"
            smooth={true}
            duration={0}
            delay={0}
            spy={true}
            spyThrottle={0}
            exact="true"
            offset={-85.26}
            aria-label="Go to Home section"
          >
            Home
          </StyledNavLinks>
        </NavList>
        <NavList>
          <StyledNavLinks
            to="projects"
            smooth={true}
            duration={0}
            delay={0}
            spy={true}
            spyThrottle={0}
            exact="true"
            offset={-85.26}
            aria-label="View my Projects"
          >
            Projects
          </StyledNavLinks>
        </NavList>
        <NavList>
          <StyledNavLinks
            to="about"
            smooth={true}
            duration={0}
            delay={0}
            spy={true}
            spyThrottle={0}
            exact="true"
            offset={-85.26}
            aria-label="Learn About me"
          >
            About
          </StyledNavLinks>
        </NavList>
        <NavList>
          <StyledNavLinks
            to="playground"
            smooth={true}
            duration={0}
            delay={0}
            spy={true}
            spyThrottle={0}
            exact="true"
            offset={-85.26}
            aria-label="View Playground projects"
          >
            Playground
          </StyledNavLinks>
        </NavList>
        <NavList>
          <StyledNavLinks
            to="contact"
            smooth={true}
            duration={0}
            delay={0}
            spy={true}
            spyThrottle={0}
            exact="true"
            offset={-85.26}
            aria-label="Contact Me"
          >
            Contact
          </StyledNavLinks>
        </NavList>
      </NavMenuList>
      <StyledCTA
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
      </StyledCTA>

      <Menu onClick={toggle} aria-label="Toggle navigation menu" role="button" tabIndex={0}>
        <Line width="1.5rem" />
        <Line />
        <Line width="1.5rem" ml="0.5rem" />
      </Menu>

      <MobileMenu isOpen={isOpen} toggle={toggle} closeMenu={closeMenu}></MobileMenu>
    </StyledNavbar>
  );
};

export default Navbar;
