import React, { lazy, Suspense } from "react";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import GlobalStyles from "./components/styles/Global";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./components/styles/Theme";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { AnimatePresence } from "framer-motion";

const Projects = lazy(() => import("./components/Projects/Projects"));
const About = lazy(() => import("./components/About/About"));
const ParallaxComponent = lazy(() => import("./components/Parallax/Parallax"));
const Technologies = lazy(() => import("./components/Technologies/Technologies"));
const Playground = lazy(() => import("./components/Playground/Playground"));
const Footer = lazy(() => import("./components/Footer/Footer"));

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '40vh',
    background: '#0d0e0e',
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '2px solid #333',
      borderTop: '2px solid #fa2904',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      "%cThank you for checking up of my portfolio. Wishing you the best for every step in your journey!🎉",
      "color: white; font-weight: 500; font-size:16px"
    );
    console.log(
      "%cYou can check the code here https://github.com/Shivamkumar-33/portfolio",
      "color: white; font-weight: 500; font-size:16px"
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <AnimatePresence mode="wait">
            <GlobalStyles />
            <Navbar />
            <Home />
            <Suspense fallback={<LoadingFallback />}>
              <Projects />
              <About />
              <ParallaxComponent />
              <Technologies />
              <Playground />
              <Footer />
            </Suspense>
          </AnimatePresence>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
