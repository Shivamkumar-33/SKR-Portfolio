import { useCallback, useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import PageRevealLoader from "./components/PageRevealLoader";
import SideBorders from "./components/SideBorders";
import { SITE } from "./constants";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [showLoader, setShowLoader] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);

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
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {showLoader && (
        <PageRevealLoader onReveal={handleReveal} onComplete={handleLoaderDone} />
      )}

      <ReactLenis root className="app-root relative w-full min-h-screen overflow-x-hidden selection:bg-gold/30">
        <SideBorders />
        <div className="page-main relative z-10 w-full">
          <Navbar theme={theme} onToggleTheme={toggleTheme} isRevealed={isRevealed} />
          <Hero isRevealed={isRevealed} />
          <About theme={theme} />
          <Works />
          <ContactSummary />
          <Contact />
          <Footer />
        </div>
      </ReactLenis>
    </>
  );
};

export default App;
