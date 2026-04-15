import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-hidden bg-black text-white selection:bg-gold/30">
      <div className="relative z-10 w-full overflow-hidden">
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
