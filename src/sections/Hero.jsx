import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LiveLocation from "../components/LiveLocation";
import ConnectButton from "../components/ConnectButton";
import LocalTime from "../components/LocalTime";

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
        .from(
          ".hero-title-char",
          {
            yPercent: reduceMotion ? 0 : 120,
            opacity: reduceMotion ? 0 : 1,
            rotationZ: reduceMotion ? 0 : 8,
            stagger: 0.08,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-subtitle",
          {
            y: reduceMotion ? 0 : 16,
            opacity: 0,
          },
          "-=0.6"
        )
        .from(
          ".hero-highlight",
          {
            y: reduceMotion ? 0 : 18,
            skewY: reduceMotion ? 0 : 4,
            opacity: 0,
          },
          "-=0.6"
        )
        .from(
          ".hero-ctas",
          {
            y: reduceMotion ? 0 : 14,
            opacity: 0,
          },
          "-=0.45"
        )
        .from(
          ".hero-scroll-cue",
          {
            y: reduceMotion ? 0 : 10,
            opacity: 0,
          },
          "-=0.35"
        )
        .from(
          ".hero-footer",
          {
            y: reduceMotion ? 0 : 16,
            opacity: 0,
            stagger: 0.12,
          },
          "-=0.4"
        );

      if (!reduceMotion) {
        tl.from(
          ".hero-footer-left",
          {
            x: -22,
            opacity: 0,
            duration: 0.7,
          },
          "<"
        ).from(
          ".hero-footer-right",
          {
            x: 22,
            opacity: 0,
            duration: 0.7,
          },
          "<"
        );
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
      className="theme-section relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-24 md:pt-28"
    >
      <div className="hero-atmosphere pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(207,163,85,0.14),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(207,163,85,0.06),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
          }}
        />
        <div className="absolute left-1/2 top-[16%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="absolute left-5 top-5 z-20 hidden lg:block sm:left-7 sm:top-6 md:left-10 md:top-8">
        <img
          src="/images/logo.svg"
          alt="System Core Logo"
          className="hero-corner-logo h-10 w-auto opacity-85 hover:opacity-100 sm:h-12 md:h-14"
        />
      </div>

      <div className="z-10 mb-9 flex w-full flex-1 flex-col items-center justify-center text-center sm:mb-12 md:mb-14">
        <div className="hero-subtitle mb-4 sm:mb-5 md:mb-6">
          <div className="theme-chip inline-flex px-5 py-2 text-xs uppercase tracking-[0.12em] sm:text-sm">
            Portfolio in Progress...! please don't judge yet.
          </div>
        </div>

        <h1
          className="hero-title theme-text-primary mb-6 flex gap-[0.02em] overflow-hidden py-2 text-[18vw] leading-[0.85] font-black uppercase italic sm:mb-8 sm:text-[16vw] md:mb-10 md:text-[15vw]"
          style={{
            fontFamily: "var(--font-amiamie-round)",
            textShadow: "0 0 28px rgba(207, 163, 85, 0.24)",
          }}
        >
          {"SHIVAM".split("").map((char, i) => (
            <span key={i} className="hero-title-char inline-block origin-bottom-left">
              {char}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle theme-text-secondary mb-3 text-[11px] font-medium uppercase tracking-[0.18em] sm:mb-4 sm:text-sm sm:tracking-[0.24em] md:text-lg md:tracking-[0.3em]">
          I BUILD COOL THINGS FOR THE INTERNET
        </p>

        <p className="hero-highlight theme-text-primary text-4xl font-serif italic md:text-7xl md:tracking-wider sm:text-5xl">
          mostly with React and caffeine.
        </p>

        <div className="hero-ctas mt-6 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row sm:gap-6">
          <ConnectButton />

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center text-sm sm:text-base transition-all duration-300"
            aria-live="polite"
            aria-label="Copy email address"
          >
            {isCopied ? (
              <span className="font-medium tracking-tight text-gold">
                Copied to clipboard
              </span>
            ) : (
              <span className="theme-text-secondary hover:theme-text-primary inline-flex items-center gap-2 transition-colors">
                {!copyIconMissing ? (
                  <img
                    src={copyIconSrc}
                    alt="copy"
                    className="copy-email-icon h-5 w-5 object-contain opacity-90"
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

      <div className="hero-scroll-cue theme-text-tertiary absolute bottom-16 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.3em] sm:bottom-20 md:flex">
        <span>Scroll</span>
        <span className="theme-divider block h-7 w-px" />
      </div>

      <div className="hero-footer-wrapper theme-text-secondary z-10 mt-auto flex w-full items-end justify-between gap-4 px-2 pb-4 text-[10px] font-semibold tracking-[0.12em] sm:px-12 sm:pb-8 sm:text-xs sm:tracking-wider md:text-sm">
        <div className="hero-footer hero-footer-left">
          <LiveLocation />
          <LocalTime />
        </div>

        <div className="hero-footer hero-footer-right flex flex-col items-center sm:items-end">
          <div className="group relative flex cursor-default flex-col items-center gap-2 sm:items-end">
            <div className="hero-status-chip relative flex items-center gap-4 overflow-hidden rounded-full border px-5 py-2.5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-gold/40">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-50"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
                </span>
                <span className="hero-status-title text-[10px] font-bold uppercase tracking-[0.25em] sm:text-xs">
                  Full Stack
                </span>
              </div>

              <div className="hero-status-separator h-3.5 w-[1px]"></div>

              <span className="hero-status-subtitle text-[10px] font-light uppercase tracking-[0.2em] sm:text-xs">
                Engineer
              </span>
            </div>

            <div className="hero-status-meta flex items-center space-x-3 text-[8px] uppercase tracking-[0.25em] sm:pr-4 sm:text-[9px]">
              <span className="transition-colors duration-300 hover:text-gold">UX / UI</span>
              <span className="theme-divider h-1 w-1 rounded-full"></span>
              <span className="transition-colors duration-300 hover:text-gold">System Arch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
