import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Copy } from "lucide-react";
import LiveLocation from "../components/LiveLocation";
import HeroRole from "../components/HeroRole";
import ConnectButton from "../components/ConnectButton";
import { SITE } from "../constants";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const titleContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: "0.3em" },
  show: {
    opacity: 1,
    y: "0em",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Hero = ({ isRevealed = true }) => {
  const copyResetRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const emailAddress = SITE.email;
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
      }, 2500);
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
// this is only test comment of AI assistant 2
  return (
    <section
      id="home"
      className="theme-section site-section-shell hero-section-shell relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        className="z-10 mb-9 flex w-full flex-1 flex-col items-center justify-center text-center sm:mb-12 md:mb-14"
        variants={containerVariants}
        {...motionProps}
      >
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2 theme-text-secondary border border-[var(--theme-border-soft)] bg-[var(--theme-chip-bg)] rounded-full px-4 py-1.5 mb-6"
        >
          <div className="relative flex size-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping duration-300"></span>
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-xs font-medium uppercase tracking-wider font-mono">Blog section in progress</span>
        </motion.div>

        <motion.h1
          variants={titleContainerVariants}
          className="hero-title theme-text-primary mb-6 py-2 text-[clamp(2.75rem,11vw,8.5rem)] leading-[0.85] font-black uppercase italic sm:mb-8 md:mb-10 tracking-[-0.04em] premium-header"
          style={{
            fontFamily: "'Rockwell Extra Bold', 'Rockwell', 'Georgia', serif",
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
            className="hero-email-action inline-flex items-center text-sm sm:text-base transition-all duration-300"
            aria-live="polite"
            aria-label="Copy email address"
          >
            {isCopied ? (
              <span className="font-medium tracking-tight theme-text-primary font-mono">
                Copied to clipboard
              </span>
            ) : (
              <span className="theme-text-secondary hover:theme-text-primary inline-flex items-center gap-2 transition-colors">
                <Copy className="h-5 w-5" />
                <span className="font-medium tracking-tight font-mono">{emailAddress}</span>
              </span>
            )}
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll-cue theme-text-tertiary absolute bottom-20 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] sm:bottom-24 md:flex"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={
          isRevealed
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 14 }
        }
        transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>Scroll</span>
        <span className="hero-scroll-line theme-divider block h-8 w-px origin-top" aria-hidden="true" />
      </motion.div>

      <motion.div
        className="hero-footer-wrapper z-10 mt-auto flex w-full items-end justify-between gap-4 px-1 pb-5 sm:gap-6 sm:px-6 sm:pb-8 md:px-8"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={
          isRevealed
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 24 }
        }
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-footer hero-footer-left">
          <LiveLocation />
        </div>

        <div className="hero-footer hero-footer-right">
          <HeroRole />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
