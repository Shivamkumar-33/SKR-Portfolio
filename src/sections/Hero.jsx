import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LiveLocation from "../components/LiveLocation";
import ConnectButton from "../components/ConnectButton";
import LocalTime from "../components/LocalTime";
import RainbowButton from "../components/RainbowButton";

const Hero = () => {
  const container = useRef(null);
  const copyResetRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const [copyIconMissing, setCopyIconMissing] = useState(false);
  const emailAddress = "shivamjmp2@gmail.com";
  const copyIconSrc = "/images/copy-icon.png";

  const handleCopyEmail = async () => {
    try {
      let copySucceeded = false;

      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailAddress);
        copySucceeded = true;
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = emailAddress;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";

        try {
          document.body.appendChild(textArea);
          textArea.select();
          copySucceeded = Boolean(document.execCommand("copy"));
        } finally {
          document.body.removeChild(textArea);
        }
      }

      if (!copySucceeded) {
        throw new Error("Unable to copy email to clipboard");
      }

      setIsCopied(true);

      if (copyResetRef.current) {
        clearTimeout(copyResetRef.current);
      }

      copyResetRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      setIsCopied(false);
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: reduceMotion ? 0.45 : 0.9,
        },
      });

      tl.from(".hero-atmosphere", {
        opacity: 0,
        scale: reduceMotion ? 1 : 1.08,
        duration: reduceMotion ? 0.4 : 1,
      })
      .from(".hero-title-char", {
        yPercent: reduceMotion ? 0 : 120,
        opacity: reduceMotion ? 0 : 1,
        rotationZ: reduceMotion ? 0 : 8,
        stagger: 0.08,
        duration: 0.8,
        ease: "power4.out",
      })
      .from(".hero-subtitle", {
        y: reduceMotion ? 0 : 16,
        opacity: 0,
      }, "-=0.6")
      .from(".hero-highlight", {
        y: reduceMotion ? 0 : 18,
        skewY: reduceMotion ? 0 : 4,
        opacity: 0,
      }, "-=0.6")
      .from(".hero-ctas", {
        y: reduceMotion ? 0 : 14,
        opacity: 0,
      }, "-=0.45")
      .from(".hero-scroll-cue", {
        y: reduceMotion ? 0 : 10,
        opacity: 0,
      }, "-=0.35")
      .from(".hero-footer", {
        y: reduceMotion ? 0 : 16,
        opacity: 0,
        stagger: 0.12,
      }, "-=0.4");

      if (!reduceMotion) {
        tl.from(".hero-footer-left", {
          x: -22,
          opacity: 0,
          duration: 0.7,
        }, "<")
        .from(".hero-footer-right", {
          x: 22,
          opacity: 0,
          duration: 0.7,
        }, "<");
      }
    }, container);

    return () => {
      ctx.revert();
      if (copyResetRef.current) {
        clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={container}
      className="relative flex flex-col items-center justify-center min-h-screen bg-transparent text-white w-full overflow-hidden px-5 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14"
    >
      <div className="hero-atmosphere pointer-events-none absolute inset-0 z-0">
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
        <div className="absolute left-1/2 top-[16%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/[0.015] blur-[120px]" />
      </div>

      <div className="absolute left-5 top-5 z-20 sm:left-7 sm:top-6 md:left-10 md:top-8">
        <img
          src="/images/logo.svg?v=3"
          alt="Shivam logo"
          className="h-10 w-auto sm:h-12 md:h-14"
        />
      </div>

      <div className="flex flex-col items-center text-center flex-1 justify-center z-10 w-full mb-12 sm:mb-16 md:mb-20">
        <div className="hero-subtitle mb-4 sm:mb-5 md:mb-6">
          <RainbowButton
            type="button"
            size="sm"
            className="cursor-default h-auto max-w-[min(92vw,34rem)] px-5 py-2 normal-case leading-snug tracking-[0.06em] sm:tracking-[0.1em]"
            aria-label="Portfolio in Progress - building... please don't judge yet."
          >
            Portfolio in Progress...! please don't judge yet.
          </RainbowButton>
        </div>

        <h1
          className="hero-title flex gap-[0.02em] text-[18vw] sm:text-[16vw] md:text-[15vw] leading-[0.85] font-black uppercase text-white mb-8 sm:mb-10 md:mb-12 overflow-hidden py-2 perspective-[1000px] italic [text-shadow:0_0_28px_rgba(61,177,255,0.22)]"
          style={{ fontFamily: "var(--font-amiamie-round)" }}
        >
          {"SHIVAM".split("").map((char, i) => (
            <span key={i} className="hero-title-char inline-block origin-bottom-left">
              {char}
            </span>
          ))}
        </h1>
        
        <p className="hero-subtitle text-[11px] sm:text-sm md:text-lg tracking-[0.18em] sm:tracking-[0.24em] md:tracking-[0.3em] text-gray-400 mb-3 sm:mb-4 uppercase font-medium">
          I BUILD COOL THINGS FOR THE INTERNET
        </p>
        
        <p className="hero-highlight text-4xl sm:text-5xl md:text-7xl font-serif italic text-white md:tracking-wider">
          mostly with React and caffeine.
        </p>

        <div className="hero-ctas mt-8 sm:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <ConnectButton />

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center text-sm sm:text-base transition-all duration-300"
            aria-live="polite"
            aria-label="Copy email address"
          >
            {isCopied ? (
              <span className="font-medium tracking-tight text-emerald-400">
                Copied to clipboard
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-white/65 hover:text-white">
                {!copyIconMissing ? (
                  <img
                    src={copyIconSrc}
                    alt="copy"
                    className="h-5 w-5 object-contain opacity-90 [filter:brightness(0)_invert(1)]"
                    onError={() => setCopyIconMissing(true)}
                  />
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="10"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <rect
                      x="5"
                      y="5"
                      width="10"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      opacity="0.72"
                    />
                  </svg>
                )}
<span className="font-medium tracking-tight">{emailAddress}</span>
                </span>
              )}
            </button>
        </div>
      </div>

      <div className="hero-scroll-cue absolute left-1/2 -translate-x-1/2 bottom-24 sm:bottom-28 hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/45">
        <span>Scroll</span>
        <span className="block h-7 w-px bg-white/30" />
      </div>

      <div className="w-full flex justify-between items-end gap-4 pb-4 sm:pb-8 px-2 sm:px-12 mt-auto text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.12em] sm:tracking-wider text-gray-400 z-10 hero-footer-wrapper">
        <div className="hero-footer hero-footer-left">
          <LiveLocation />
          <LocalTime />
        </div>
        
        <div className="hero-footer hero-footer-right flex flex-col sm:items-end items-center">
          <div className="group relative flex flex-col items-center sm:items-end gap-2 cursor-default">
            {/* Minimalist Data Readout Card */}
            <div className="relative flex items-center gap-4 py-2.5 px-5 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.05] rounded-full backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-cyan-500/10">
              {/* Top accent line on hover */}
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-white tracking-[0.25em] uppercase">
                  Full Stack
                </span>
              </div>
              
              <div className="w-[1px] h-3.5 bg-white/[0.15]"></div>
              
              <span className="text-[10px] sm:text-xs font-light text-gray-300 tracking-[0.2em] uppercase">
                Engineer
              </span>
            </div>
            
            {/* Sub details mimicking technical specs */}
            <div className="flex items-center space-x-3 text-[8px] sm:text-[9px] text-gray-500 tracking-[0.25em] uppercase sm:pr-4">
              <span className="hover:text-cyan-400 transition-colors duration-300">UX / UI</span>
              <span className="w-1 h-1 rounded-full bg-gray-700"></span>
              <span className="hover:text-cyan-400 transition-colors duration-300">System Arch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
