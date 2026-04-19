import { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const THEME_KEY = "portfolio-theme";

const App = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = stored === "light" || stored === "dark" ? stored : systemPrefersDark ? "dark" : "light";
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ReactLenis root className="app-root relative w-screen min-h-screen overflow-x-hidden selection:bg-gold/30">
      <div className="relative z-10 w-full overflow-hidden">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <Hero />
        <About theme={theme} />
        <Works />
        <ContactSummary />
        <Contact />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default App;
