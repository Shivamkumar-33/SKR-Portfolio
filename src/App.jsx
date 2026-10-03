import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ReactLenis from "lenis/react";
import PageRevealLoader from "./components/PageRevealLoader";
import SideBorders from "./components/SideBorders";
import { SITE } from "./constants";

// Lazy-load below-fold sections to reduce initial JS parse/execute time
const About = lazy(() => import("./sections/About"));
const Works = lazy(() => import("./sections/Works"));
const ContactSummary = lazy(() => import("./sections/ContactSummary"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return !window.sessionStorage.getItem("portfolio_loader_seen");
      } catch {
        return true;
      }
    }
    return true;
  });
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return Boolean(window.sessionStorage.getItem("portfolio_loader_seen"));
      } catch {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    const stored = window.localStorage.getItem(SITE.themeKey);
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme =
      stored === "light" || stored === "dark"
        ? stored
        : systemPrefersDark
          ? "dark"
          : "light";
    setTheme(nextTheme);
  }, []);

  // Hard refresh / reload → always start at homepage
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash && window.location.hash !== "#home") {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(SITE.themeKey, theme);
  }, [theme]);

  const handleReveal = useCallback(() => {
    window.scrollTo(0, 0);
    setIsRevealed(true);
  }, []);

  const handleLoaderDone = useCallback(() => {
    window.scrollTo(0, 0);
    setShowLoader(false);
    try {
      window.sessionStorage.setItem("portfolio_loader_seen", "true");
    } catch {
      // Ignore storage errors (private mode, quota)
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {showLoader && (
        <PageRevealLoader onReveal={handleReveal} onComplete={handleLoaderDone} />
      )}

      <ReactLenis root className="app-root relative w-full min-h-screen overflow-x-hidden selection:bg-white/30">
        <SideBorders />
        <div className="page-main relative z-10 w-full">
          <Navbar theme={theme} onToggleTheme={toggleTheme} isRevealed={isRevealed} />
          <Hero isRevealed={isRevealed} />
          <Suspense fallback={
            <div className="flex items-center justify-center py-24 opacity-40">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </div>
          }>
            <About />
            <Works />
            <ContactSummary />
            <Contact />
            <Footer />
          </Suspense>
        </div>
      </ReactLenis>
    </>
  );
};

export default App;
