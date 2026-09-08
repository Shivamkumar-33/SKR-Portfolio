import { SITE, navItems, socials } from "../constants";
import ButtonWithIcon from "../components/ui/button-with-icon";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="theme-section site-section-shell footer-surface flex w-full flex-col justify-end overflow-hidden">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">
          <div className="flex w-full flex-col items-start text-left md:w-[45%] lg:w-[35%]">
            <a href="#home" aria-label="Home">
              <img
                src="/images/logo.svg"
                alt="SK Logo"
                className="hero-corner-logo h-10 w-auto opacity-80"
              />
            </a>
            <div className="footer-brand-rule mt-8 h-0.5 w-full max-w-52" />
            <p className="theme-text-tertiary mt-6 max-w-[350px] text-sm leading-relaxed">
              {SITE.tagline}
            </p>
          </div>

          <div className="flex w-[45%] flex-col items-start text-left md:w-[45%] lg:w-[15%]">
            <h3 className="theme-text-primary text-sm font-medium">Important Links</h3>
            <div className="mt-6 flex flex-col gap-2">
              {navItems.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="theme-text-tertiary text-sm transition-colors hover:text-[var(--theme-text-primary)]"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex w-[45%] flex-col items-start text-left md:w-[45%] lg:w-[15%]">
            <h3 className="theme-text-primary text-sm font-medium">Social Links</h3>
            <div className="mt-6 flex flex-col gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-text-tertiary text-sm transition-colors hover:text-[var(--theme-text-primary)]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-4 flex w-full flex-col items-start text-left md:mt-0 md:w-[45%] lg:w-[25%]">
            <h3 className="theme-text-primary text-sm font-medium">Get in touch</h3>
            <div className="footer-email-pill mt-4 flex h-13 w-full max-w-80 items-center gap-2 overflow-hidden rounded-full border border-[var(--theme-border-soft)]">
              <span className="theme-text-tertiary w-full truncate pl-6 text-xs sm:text-sm">
                {SITE.email}
              </span>
              <ButtonWithIcon
                href={`mailto:${SITE.email}`}
                className="footer-email-btn mr-1.5 shrink-0"
              >
                Email
              </ButtonWithIcon>
            </div>
          </div>
        </div>

        <div className="footer-mid-rule mb-4 mt-16 h-0.5 w-full" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-2 gap-y-4 sm:flex-row">
          <div className="flex flex-col gap-1">
            <p className="theme-text-tertiary text-xs">
              © {new Date().getFullYear()} SHIVAM KUMAR
            </p>
            <p className="theme-text-tertiary text-[10px] uppercase tracking-wider opacity-70">
              Designed & crafted with precision
            </p>
          </div>
          <ButtonWithIcon
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top"
          >
            Back to top
          </ButtonWithIcon>
        </div>

        <div className="mt-6 flex w-full justify-center md:mb-[-0.5%] md:mt-12">
          <h1 className="footer-watermark pointer-events-none select-none text-center font-serif text-[clamp(4.5rem,19.5vw,25rem)] font-extrabold leading-[0.70] tracking-[-0.04em]">
            Shivam
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
