import { useRef, useCallback } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Inline SVG social icons ---------- */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] sm:w-5 sm:h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Shivamkumar-33",
    icon: GitHubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shivam-kumar-34471224b",
    icon: LinkedInIcon,
  },
  {
    name: "Twitter",
    href: "https://x.com/",
    icon: TwitterIcon,
  },
];

const About = () => {
  const text = `Passionate about clean architecture and scalable system design.
Building high-performance applications that grow from prototype to production.`;

  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const imgWrapperRef = useRef(null);
  const actionBarRef = useRef(null);
  const socialRefs = useRef([]);
  const resumeBtnRef = useRef(null);
  const dividerRef = useRef(null);
  
  // Container for split text animation
  const textBlocksContainerRef = useRef(null);

  // Magnetic tilt handler for photo
  const handleMouseMove = useCallback((e) => {
    if (!imgWrapperRef.current || window.innerWidth < 768) return;
    const rect = imgWrapperRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    gsap.to(imgWrapperRef.current, {
      rotateY: x,
      rotateX: y,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.to(imgRef.current, {
      rotateY: x * 0.5,
      rotateX: y * 0.5,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!imgWrapperRef.current) return;
    gsap.to([imgWrapperRef.current, imgRef.current], {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  useGSAP(() => {
    // 1. Section scale-down on scroll past
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

    // 2. Photo clip-path reveal
    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });

    // 3. Photo parallax
    gsap.to(imgRef.current, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // 4. SplitType + GSAP line reveal animation for headline text
    const splitInstances = [];
    const animateTargets = gsap.utils.toArray(
      "[data-animate]",
      textBlocksContainerRef.current
    );

    animateTargets.forEach((target) => {
      const split = new SplitType(target, {
        types: "lines, words, chars",
        tagName: "span",
      });
      splitInstances.push(split);

      const lines = target.querySelectorAll(".line");
      gsap.set(lines, { overflow: "hidden", display: "block" });

      gsap.from(lines, {
        y: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "sine.inOut",
        stagger: 0.15,
        scrollTrigger: {
          trigger: target,
          start: "top center",
        },
      });
    });

    // 5. Vertical and Horizontal divider line draw animations
    const dividers = document.querySelectorAll(".about-divider");
    dividers.forEach((divider) => {
      const isVertical = divider.classList.contains('h-full');
      gsap.fromTo(divider, 
        { 
          scaleY: isVertical ? 0 : 1, 
          scaleX: isVertical ? 1 : 0, 
          transformOrigin: isVertical ? "top center" : "left center" 
        },
        {
          scaleY: 1,
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: divider,
            start: "top 90%",
          }
        }
      );
    });

    // 6. Social link items stagger in
    const validSocials = socialRefs.current.filter(Boolean);
    if (validSocials.length > 0) {
      gsap.fromTo(
        validSocials,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: actionBarRef.current,
            start: "top 95%",
          },
        }
      );
    }

    // 7. Resume button slide in
    if (resumeBtnRef.current) {
      gsap.fromTo(
        resumeBtnRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: actionBarRef.current,
            start: "top 95%",
          },
        }
      );
    }

    return () => {
      splitInstances.forEach((instance) => instance.revert());
    };
  });

  return (
    <section id="about" ref={sectionRef} className="min-h-screen bg-black flex flex-col">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="flex-1 flex flex-col items-center justify-start pt-6 pb-6 px-6 sm:px-10">
        {/* Main layout container */}
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-0 lg:py-4 relative">
          
          {/* Top Divider (Visible mainly on desktop as frame boundary, or hide on mobile) */}
          <div className="about-divider hidden lg:block absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          
          {/* Left: Photo */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end lg:pr-12">
            <div
              className="relative w-full max-w-sm group"
              style={{ perspective: "800px" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Optional: Add a subtle cyan border to match the design reference without heavy glow */}
              <div
                ref={imgWrapperRef}
                className="relative rounded-[20px] overflow-hidden border border-cyan-500/20"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  ref={imgRef}
                  src="images/man.jpg"
                  alt="Shivam Kumar"
                  className="relative w-full h-auto object-cover"
                  style={{ transformStyle: "preserve-3d" }}
                />
              </div>
            </div>
          </div>

          {/* Center Vertical Divider - hidden on mobile */}
          <div className="hidden lg:flex items-center justify-center w-[10%]">
             <div className="about-divider h-full w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
          </div>

          {/* Right: Typography Text Blocks */}
          <div 
            ref={textBlocksContainerRef}
            className="w-full lg:w-[45%] flex flex-col justify-center gap-8 sm:gap-12 lg:pl-12"
          >
            {/* Block 1 */}
            <div data-animate className="flex flex-col uppercase font-bold tracking-tight">
              <span className="text-white text-3xl sm:text-4xl lg:text-[40px] leading-tight">
                DEBUGGING ACROSS THE STACK
              </span>
              <span className="text-white/40 text-xl sm:text-2xl lg:text-[28px] leading-tight mt-1">
                FRONTEND TO BACKEND
              </span>
            </div>

            {/* Block 2 */}
            <div data-animate className="flex flex-col uppercase font-bold tracking-tight">
              <span className="text-white text-3xl sm:text-4xl lg:text-[40px] leading-tight">
                TURNING COFFEE INTO
              </span>
              <span className="text-white/40 text-xl sm:text-2xl lg:text-[28px] leading-tight mt-1">
                PRODUCTION-READY CODE
              </span>
            </div>

            {/* Block 3 */}
            <div data-animate className="flex flex-col uppercase font-bold tracking-tight">
              <span className="text-white text-3xl sm:text-4xl lg:text-[40px] leading-tight">
                LATE-NIGHT CODING FUELED
              </span>
              <span className="text-white/40 text-xl sm:text-2xl lg:text-[28px] leading-tight mt-1">
                BY CURIOSITY AND CREATIVITY
              </span>
            </div>
          </div>
          
          {/* Bottom Divider */}
          <div className="about-divider hidden lg:block absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        </div>
      </div>

      {/* Divider between content and Action bar on mobile, serves as overall divider */}
      <div className="px-6 sm:px-10 lg:pt-4 pb-2 w-full">
        <div className="about-divider h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent lg:hidden" />
      </div>

      {/* Action Bar: Social Links + Resume Download */}
      <div
        ref={actionBarRef}
        className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-7 px-6 sm:px-10 py-5 sm:py-6 pb-8 w-full max-w-7xl mx-auto"
      >
        {/* Social Media Links */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                ref={(el) => (socialRefs.current[index] = el)}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="group relative flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.2] hover:bg-white/[0.06]"
              >
                {/* Top accent line on hover */}
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-white/50 group-hover:text-white transition-colors duration-300">
                  <IconComponent />
                </span>
                <span className="relative z-10 text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-white/50 group-hover:text-white/90 transition-colors duration-300">
                  {social.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* Resume Download Button */}
        <a
          ref={resumeBtnRef}
          href="/resume.pdf"
          download
          className="group relative inline-flex items-center overflow-hidden rounded-full border border-white/10 bg-white/5 p-[1px] shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] backdrop-blur-xl transition-all duration-500 hover:border-white/20"
          style={{ isolation: "isolate" }}
        >
          <div className="relative z-10 flex w-full items-center justify-between rounded-full bg-black/90 px-1.5 py-1.5 sm:py-2 transition-colors duration-500 group-hover:bg-black/70">
            <span className="relative z-20 pl-5 pr-5 text-sm sm:text-base font-semibold tracking-wide text-white/90 group-hover:text-white whitespace-nowrap">
              Download Resume
            </span>
            <span className="relative z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-white text-black overflow-hidden transition-all duration-500 group-hover:bg-white group-hover:text-black">
              {/* Default download icon */}
              <svg
                className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-[150%] group-hover:opacity-0"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3v13m0 0l-4-4m4 4l4-4M5 20h14"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              {/* Hover download icon */}
              <svg
                className="absolute h-4 w-4 -translate-y-[150%] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3v13m0 0l-4-4m4 4l4-4M5 20h14"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default About;
