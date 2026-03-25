import React, { useEffect, useRef, useState, useCallback } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { StyledButton } from "../styles/Button.styled";
import {
  Name,
  StyledButtonsContainer,
  StyledHome,
  Title,
  Line,
  Greeting,
  Social,
  Socials,
  Quote,
} from "../styles/Home.styled";
import "./style.css";
import projectIcon from "../../assets/icons/project-icon.svg";
import aboutIcon from "../../assets/icons/about-me.svg";
import { IconContext } from "react-icons";
import { GrLinkedinOption } from "react-icons/gr";
import { FaEnvelope, FaGithub } from "react-icons/fa";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const countryLabels = {
  USA: { code: "US", label: "USA" },
  INDIA: { code: "IN", label: "India" },
  UK: { code: "UK", label: "UK" },
};

// COBE official conversion: https://github.com/shuding/cobe
const locationToAngles = (lat, long) => {
  return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
};
const countries = {
  USA:   { angles: locationToAngles(38.9072, -77.0369) },   // Washington DC
  INDIA: { angles: locationToAngles(28.6139, 77.209) },     // New Delhi
  UK:    { angles: locationToAngles(51.5074, -0.1278) },    // London
};

const Home = () => {
  const canvasRef = useRef(null);
  const globeRef = useRef(null);
  const [activeCountry, setActiveCountry] = useState("INDIA");
  const focusRef = useRef(countries.INDIA.angles);
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const dragPhi = useRef(0);
  const dragTheta = useRef(0);
  const momentumPhi = useRef(0);
  const momentumTheta = useRef(0);
  let today = new Date(),
    hour = today.getHours();

  useEffect(() => {
    focusRef.current = countries[activeCountry].angles;
    // Reset drag when switching country
    dragPhi.current = 0;
    dragTheta.current = 0;
    momentumPhi.current = 0;
    momentumTheta.current = 0;
  }, [activeCountry]);

  const onPointerDown = useCallback((e) => {
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    momentumPhi.current = 0;
    momentumTheta.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    dragPhi.current += dx * 0.015;
    dragTheta.current -= dy * 0.01;
    // Track momentum
    momentumPhi.current = dx * 0.015;
    momentumTheta.current = -dy * 0.01;
  }, []);

  const onPointerUp = useCallback((e) => {
    isDragging.current = false;
    e.currentTarget.style.cursor = "grab";
  }, []);

  useEffect(() => {
    const [initPhi, initTheta] = countries.INDIA.angles;
    let currentPhi = initPhi;
    let currentTheta = initTheta;
    const doublePi = Math.PI * 2;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const viewportWidth = window.innerWidth;
    const isTabletOrMobile = viewportWidth <= 1024;
    const isMobile = viewportWidth <= 480;
    // Keep desktop exactly at the original sizing.
    const globeResolution = isTabletOrMobile ? (isMobile ? 680 : 740) : 800;
    const globeScale = isTabletOrMobile ? (isMobile ? 0.64 : 0.76) : 1;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: globeResolution,
      height: globeResolution,
      scale: globeScale,
      phi: currentPhi,
      theta: currentTheta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.06, 0.06, 0.06],
      markerColor: [1, 1, 1],
      glowColor: [0.15, 0.15, 0.15],
      markers: [
        { location: [28.6139, 77.209], size: 0.15 },
        { location: [51.5074, -0.1278], size: 0.04 },
        { location: [38.9072, -77.0369], size: 0.04 },
      ],
      onRender: (state) => {
        const [focusPhi, focusTheta] = focusRef.current;
        const goalPhi = focusPhi + dragPhi.current;
        const goalTheta = focusTheta + dragTheta.current;

        // Shortest-path phi rotation (from COBE reference)
        const distPositive = (goalPhi - currentPhi + doublePi) % doublePi;
        const distNegative = (currentPhi - goalPhi + doublePi) % doublePi;
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08;
        } else {
          currentPhi -= distNegative * 0.08;
        }
        // Smooth theta interpolation
        currentTheta = currentTheta * 0.92 + goalTheta * 0.08;

        state.phi = currentPhi;
        state.theta = currentTheta;
        state.width = globeResolution;
        state.height = globeResolution;

        // When not dragging, apply momentum then decay drag back to 0
        if (!isDragging.current) {
          dragPhi.current += momentumPhi.current;
          dragTheta.current += momentumTheta.current;
          momentumPhi.current *= 0.95;
          momentumTheta.current *= 0.95;
          // Spring drag offset back to zero (return to country)
          dragPhi.current *= 0.96;
          dragTheta.current *= 0.96;
          // Snap to zero when residuals are tiny
          if (Math.abs(momentumPhi.current) < 0.0001) momentumPhi.current = 0;
          if (Math.abs(momentumTheta.current) < 0.0001) momentumTheta.current = 0;
          if (Math.abs(dragPhi.current) < 0.0001) dragPhi.current = 0;
          if (Math.abs(dragTheta.current) < 0.0001) dragTheta.current = 0;
        }
      },
    });
    globeRef.current = globe;

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <IconContext.Provider value={{ size: "1rem" }}>
      <StyledHome 
        id="home"
        as={motion.section}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Name as={motion.h1} variants={itemVariants}>Shivam Kumar</Name>
        <Title as={motion.h2} variants={itemVariants}>Full-Stack Developer</Title>
        <motion.p className="hero-intro" variants={itemVariants} aria-label="I design and create responsive websites">
          I <span className="change-text" aria-hidden="true"></span>{" "}
          <span className="responsive">r</span>
          <span className="responsive">e</span>
          <span className="responsive">s</span>
          <span className="responsive">p</span>
          <span className="responsive">o</span>
          <span className="responsive">n</span>
          <span className="responsive">s</span>
          <span className="responsive">i</span>
          <span className="responsive">v</span>
          <span className="responsive">e</span> websites.
        </motion.p>
        <StyledButtonsContainer as={motion.div} variants={itemVariants}>
          <StyledButton
            as={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            icon={projectIcon}
            to="projects"
            smooth={true}
            duration={0}
            delay={0}
            spy={true}
            spyThrottle={0}
            exact="true"
            offset={-50}
          >
            <span>Projects</span>
          </StyledButton>
          <StyledButton
            as={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            icon={aboutIcon}
            secondary="true"
            content="B"
            to="about"
            smooth={true}
            duration={0}
            delay={0}
            spy={true}
            spyThrottle={0}
            exact="true"
            offset={-50}
          >
            <span>About me</span>
          </StyledButton>
        </StyledButtonsContainer>
        <Line as={motion.div} variants={lineVariants} style={{ originX: 0 }} />
        <Greeting as={motion.p} variants={itemVariants}>
          Have a great
          <span>
            {hour < 12 ? " morning" : hour < 18 ? " afternoon" : " evening"}
          </span>
          .
        </Greeting>
        <Socials as={motion.div} variants={containerVariants}>
          <Social
            as={motion.a}
            variants={socialVariants}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="mailto:shivamjmp2@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            title="Email"
          >
            <FaEnvelope />
          </Social>
          <Social
            as={motion.a}
            variants={socialVariants}
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/Shivamkumar-33"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <FaGithub />
          </Social>
          <Social
            as={motion.a}
            variants={socialVariants}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.linkedin.com/in/shivam-kumar-34471224b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <GrLinkedinOption />
          </Social>
        </Socials>
        <Quote as={motion.p} variants={itemVariants}>Don't wish for it! Work for it!</Quote>
        <motion.div
          className="globe-panel"
          variants={itemVariants}
        >
          <div className="globe-card">
            <div className="globe-card-header">
              <span className="globe-card-subtitle">AVAILABLE GLOBALLY</span>
  
            </div>
            <div className="globe-canvas-wrap">
              <canvas
                ref={canvasRef}
                width="800"
                height="800"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                style={{
                  width: "100%",
                  height: "100%",
                  cursor: "grab",
                  touchAction: "none",
                }}
              />
            </div>
            <div className="globe-card-right">
              <div className="globe-country-tabs">
                {Object.entries(countries).map(([name]) => (
                  <motion.button
                    key={name}
                    className="globe-tab"
                    onClick={() => setActiveCountry(name)}
                    animate={{
                      borderColor: activeCountry === name ? "#fa2904" : "#2a2a2a",
                      color: activeCountry === name ? "#fa2904" : "#999",
                      backgroundColor: activeCountry === name ? "rgba(250, 41, 4, 0.08)" : "rgba(20, 20, 20, 0.9)",
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: "#fa2904",
                      color: "#fa2904",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <span className={`globe-tab-code${activeCountry === name ? " active-code" : ""}`}>{countryLabels[name].code}</span>
                    <span>{countryLabels[name].label}</span>
                  </motion.button>
                ))}
              </div>
              <div className="globe-remote">
                <span className="globe-remote-icon">&#9737;</span>
                <span className="globe-remote-label">REMOTE</span>
                <span className="globe-remote-location">{countryLabels[activeCountry].label}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </StyledHome>
    </IconContext.Provider>
  );
};

export default Home;
