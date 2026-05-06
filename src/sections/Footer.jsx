import { socials } from "../constants";
import FramerSocialIcon from "../components/FramerSocialIcon";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="theme-section footer-surface w-full border-t px-6 py-10 md:px-12 md:py-14">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top row — branding + back to top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              src="/images/logo.svg"
              alt="SK Logo"
              className="hero-corner-logo h-10 w-auto opacity-70"
            />
            <p className="theme-text-tertiary text-xs tracking-widest uppercase">
              Full Stack Engineer
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em]"
            aria-label="Back to top"
          >
            <svg className="h-3.5 w-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Back to top
          </button>
        </div>

        {/* Divider */}
        <div className="theme-divider h-px w-full" />

        {/* Bottom row — copyright + social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="text-xs tracking-widest uppercase">
              © {new Date().getFullYear()} SHIVAM KUMAR
            </span>
            <span className="theme-text-tertiary text-[10px] tracking-wider uppercase opacity-70">
              Designed & crafted with precision
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <FramerSocialIcon
                key={social.name}
                href={social.href}
                icon={social.icon}
                name={social.name}
                containerSize={36}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;