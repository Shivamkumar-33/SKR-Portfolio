import { useRef } from "react";
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


  // Container for split text animation
  const textBlocksContainerRef = useRef(null);

  useGSAP(() => {
    // SplitType + GSAP line reveal animation for headline text
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

      gsap.fromTo(lines, {
        y: "100%",
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "sine.inOut",
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: {
          trigger: target,
          start: "top 96%",
          once: true,
        },
      });
    });

    return () => {
      splitInstances.forEach((instance) => instance.revert());
    };
  }, []);

  return (
    <section id="about" className="bg-transparent py-16 sm:py-20 relative z-10">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, built to scale"}
        title={"About"}
        text={text}
        textColor={"text-primary"}
        withScrollTrigger={true}
      />

      <div className="flex flex-col items-center justify-start pt-2 pb-6 px-6 sm:px-10">
        {/* Main layout container */}
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-0 lg:py-4 relative">

          {/* Left: Photo */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end lg:pr-12">
            <div
              className="relative w-full max-w-sm group"
            >
              <div
                className="bento-card bento-glow relative p-2 overflow-hidden"
              >
                <img
                  src="images/man.jpg"
                  alt="Shivam Kumar"
                  className="relative w-full h-auto object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>

          {/* Right: Typography Text Blocks */}
          <div
            ref={textBlocksContainerRef}
            className="w-full lg:w-[45%] flex flex-col justify-center gap-8 sm:gap-12 lg:pl-12"
          >
            {/* Block 1 */}
            <div data-animate className="flex flex-col uppercase font-bold tracking-tight">
              <span className="text-white text-3xl sm:text-4xl lg:text-[40px] leading-tight text-glow-cyan">
                DEBUGGING ACROSS THE STACK
              </span>
              <span className="text-white/40 text-xl sm:text-2xl lg:text-[28px] leading-tight mt-1">
                FRONTEND TO BACKEND
              </span>
            </div>

            {/* Block 2 */}
            <div data-animate className="flex flex-col uppercase font-bold tracking-tight">
              <span className="text-white text-3xl sm:text-4xl lg:text-[40px] leading-tight text-glow-cyan">
                TURNING COFFEE INTO
              </span>
              <span className="text-white/40 text-xl sm:text-2xl lg:text-[28px] leading-tight mt-1">
                PRODUCTION-READY CODE
              </span>
            </div>

            {/* Block 3 */}
            <div data-animate className="flex flex-col uppercase font-bold tracking-tight">
              <span className="text-white text-3xl sm:text-4xl lg:text-[40px] leading-tight text-glow-cyan">
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
        className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-7 px-6 sm:px-10 py-5 sm:py-6 pb-8 w-full max-w-7xl mx-auto"
      >
        {/* Social Media Links */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="group relative flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bento-card bento-glow overflow-hidden transition-all duration-500 hover:border-white/[0.2] hover:bg-white/[0.06]"
              >
                {/* Top accent line on hover */}
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
