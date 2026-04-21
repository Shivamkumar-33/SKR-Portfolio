import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import createGlobe from "cobe";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import AboutLogoTimeline, { fullStackLogos } from "../components/AboutLogoTimeline";
import GitHubHeatmap from "../components/GitHubHeatmap";
import VinylIntroCard from "../components/VinylIntroCard";

const pulseMarkers = [
  { id: "pulse-india", location: [28.61, 77.21], delay: 0 },
  { id: "pulse-london", location: [51.51, -0.13], delay: 0 },
  { id: "pulse-newyork", location: [40.71, -74.01], delay: 0.5 },
  { id: "pulse-tokyo", location: [35.68, 139.65], delay: 1 },
  { id: "pulse-sydney", location: [-33.87, 151.21], delay: 1.5 },
];

const globeMarkers = [
  { id: "india", label: "India", location: [28.61, 77.21], size: 0.03 },
  { id: "london", label: "London", location: [51.51, -0.13], size: 0.03 },
  { id: "newyork", label: "New York", location: [40.71, -74.01], size: 0.03 },
  { id: "tokyo", label: "Tokyo", location: [35.68, 139.65], size: 0.03 },
  { id: "sydney", label: "Sydney", location: [-33.87, 151.21], size: 0.03 },
  { id: "sf", label: "San Francisco", location: [37.77, -122.42], size: 0.03 },
  { id: "saopaulo", label: "Sao Paulo", location: [-23.55, -46.63], size: 0.03 },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const About = ({ theme = "dark" }) => {
  const canvasRef = useRef(null);
  const pointerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.2);
  const thetaTargetRef = useRef(0.2);
  const spinVelocityRef = useRef(0.003);
  const isDarkTheme = theme === "dark";

  const text = `Passionate about clean architecture and scalable system design
Building high-performance applications that grow from prototype to production`;

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const width = canvas.offsetWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width,
      height: width,
      phi: 0,
      theta: 0.2,
      dark: isDarkTheme ? 1 : 0,
      diffuse: 1.35,
      mapSamples: 16000,
      mapBrightness: 7,
      baseColor: isDarkTheme ? [0.48, 0.48, 0.48] : [0.74, 0.71, 0.65],
      markerColor: [0.81, 0.64, 0.33],
      glowColor: isDarkTheme ? [0.94, 0.93, 0.91] : [0.98, 0.96, 0.9],
      markerElevation: 0,
      markers: globeMarkers.map((marker) => ({
        id: marker.id,
        location: marker.location,
        size: marker.size,
      })),
      opacity: isDarkTheme ? 0.82 : 0.9,
    });

    let animationId = 0;
    const animate = () => {
      if (!isDraggingRef.current) {
        const autoSpin = 0.0022;
        const momentum = spinVelocityRef.current * 0.93;
        spinVelocityRef.current = Math.abs(momentum) < 0.0002 ? 0 : momentum;
        phiRef.current += autoSpin + spinVelocityRef.current;
      }

      thetaRef.current += (thetaTargetRef.current - thetaRef.current) * 0.1;
      globe.update({ phi: phiRef.current, theta: thetaRef.current });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      const nextSize = canvas.offsetWidth;
      globe.update({ width: nextSize, height: nextSize });
    });

    resizeObserver.observe(canvas);
    canvas.style.opacity = "1";

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      globe.destroy();
    };
  }, [isDarkTheme]);

  const onPointerDown = (event) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };
    isDraggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    const pointer = pointerRef.current;
    if (!pointer) return;

    const deltaX = event.clientX - pointer.x;
    const deltaY = event.clientY - pointer.y;
    pointerRef.current = { x: event.clientX, y: event.clientY };

    const dragRotation = deltaX / 220;
    phiRef.current += dragRotation;
    spinVelocityRef.current = dragRotation;
    thetaTargetRef.current = clamp(thetaTargetRef.current + deltaY / 900, -0.45, 0.45);
  };

  const onPointerUp = (event) => {
    pointerRef.current = null;
    isDraggingRef.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section id="about" className="theme-section min-h-screen rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, built to scale"}
        title={"About"}
        text={text}
        textColor={"theme-text-primary"}
        withScrollTrigger={true}
      />

      <div className="about-cobe-grid">
        <article className="about-cobe-card about-cobe-card-intro">
          <VinylIntroCard />
        </article>

        <article className="about-cobe-card about-cobe-card-globe">
          <div className="about-cobe-globe-header">
            <p className="about-cobe-mono technical-label">Flexible with timezones</p>
            <h3 className="about-cobe-globe-title">Based in India, collaborating globally</h3>
          </div>

          <div className="about-cobe-globe-shell">
            <canvas
              ref={canvasRef}
              className="about-cobe-globe-canvas"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              onPointerCancel={onPointerUp}
            />

            {globeMarkers.map((marker) => (
              <div
                key={marker.id}
                className="about-cobe-map-label"
                style={{
                  positionAnchor: `--cobe-${marker.id}`,
                  opacity: `var(--cobe-visible-${marker.id}, 0)`,
                }}
              >
                {marker.label}
              </div>
            ))}

            {pulseMarkers.map((marker) => (
              <div
                key={marker.id}
                className="about-cobe-pulse"
                style={{
                  positionAnchor: `--cobe-${marker.id.replace("pulse-", "")}`,
                  opacity: `var(--cobe-visible-${marker.id.replace("pulse-", "")}, 0)`,
                  filter: `blur(calc((1 - var(--cobe-visible-${marker.id.replace("pulse-", "")}, 0)) * 8px))`,
                }}
              >
                <span
                  className="about-cobe-pulse-ring"
                  style={{ animationDelay: `${marker.delay}s` }}
                />
                <span
                  className="about-cobe-pulse-ring"
                  style={{ animationDelay: `${marker.delay + 0.5}s` }}
                />
                <span className="about-cobe-pulse-dot" />
              </div>
            ))}
          </div>
        </article>

        <article className="about-cobe-card about-cobe-card-map">
          <GitHubHeatmap />
        </article>

        <article className="about-cobe-card about-cobe-card-stack">
          <AboutLogoTimeline
            items={fullStackLogos}
            height="100%"
            iconSize={24}
            showRowSeparator={true}
          />
        </article>
      </div>
    </section>
  );
};

export default About;