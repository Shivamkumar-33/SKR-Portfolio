import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Spotlight from "./components/Spotlight"; // We will create this

const App = () => {
  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-hidden bg-black text-white selection:bg-cyan-500/30 aceternity-grid">
      <Spotlight />
      <div className="relative z-10 w-full mb-10 overflow-hidden mix-blend-screen">
        <Navbar />
        <Hero />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default App;
