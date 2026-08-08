import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import LiveLocation from "../components/LiveLocation";
import ConnectButton from "../components/ConnectButton";
import LocalTime from "../components/LocalTime";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.92, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const titleContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.05,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: "0.55em", rotateX: 55, scale: 0.88 },
  show: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Hero = ({ isRevealed = true }) => {
  const copyResetRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const emailAddress = "shivamjmp2@gmail.com";
  const title = "SHIVAM";

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
    return () => {
      if (copyResetRef.current) {
        clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  const motionProps = reduceMotion
    ? { initial: false, animate: "show" }
    : {
        initial: "hidden",
        animate: isRevealed ? "show" : "hidden",
      };

  return (
    <section
      id="home"
      className="theme-section relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-24 md:pt-28"
    >
      <motion.div
        className="z-10 mb-9 flex w-full flex-1 flex-col items-center justify-center text-center sm:mb-12 md:mb-14"
        variants={containerVariants}
        {...motionProps}
      >
        <motion.h1
          variants={titleContainerVariants}
          className="hero-title theme-text-primary mb-6 py-2 text-[14vw] leading-[0.85] font-black uppercase italic sm:mb-8 sm:text-[12vw] md:mb-10 md:text-[11vw] tracking-[-0.04em] premium-header"
          style={{
            fontFamily: "'Rockwell Extra Bold', 'Rockwell', 'Georgia', serif",
            textShadow: "0 0 28px rgba(191, 161, 129, 0.24)",
            perspective: 800,
          }}
          aria-label="SHIVAM"
        >
          {title.split("").map((letter, i) => (
            <motion.span
              key={`${letter}-${i}`}
              variants={letterVariants}
              className="hero-title-letter"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="hero-subtitle technical-label theme-text-secondary mb-3 sm:mb-4 md:text-lg"
        >
          I BUILD COOL THINGS FOR THE INTERNET
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="hero-highlight accent-line theme-text-primary text-4xl italic md:text-7xl md:tracking-wider sm:text-5xl"
        >
          mostly with React and caffeine.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="hero-ctas mt-6 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row sm:gap-6"
        >
          <ConnectButton magnetic />

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center text-sm sm:text-base transition-all duration-300"
            aria-live="polite"
            aria-label="Copy email address"
          >
            {isCopied ? (
              <span className="font-medium tracking-tight text-gold font-mono">
                Copied to clipboard
              </span>
            ) : (
              <span className="theme-text-secondary hover:theme-text-primary inline-flex items-center gap-2 transition-colors">
                <Icon icon="lucide:copy" className="h-5 w-5" />
                <span className="font-medium tracking-tight font-mono">{emailAddress}</span>
              </span>
            )}
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll-cue theme-text-tertiary absolute bottom-16 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.3em] sm:bottom-20 md:flex"
        initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.92 }}
        animate={
          isRevealed
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 14, scale: 0.92 }
        }
        transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>Scroll</span>
        <span className="theme-divider block h-7 w-px" />
      </motion.div>

      <motion.div
        className="hero-footer-wrapper theme-text-secondary z-10 mt-auto flex w-full items-end justify-between gap-4 px-2 pb-4 text-[10px] font-semibold tracking-[0.12em] sm:px-12 sm:pb-8 sm:text-xs sm:tracking-wider md:text-sm"
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
        animate={
          isRevealed
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 24, scale: 0.96 }
        }
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
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
      </motion.div>
    </section>
  );
};

export default Hero;
