import { SITE, navItems, socials } from "../constants";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="theme-section footer-surface flex w-full flex-col justify-end overflow-hidden px-4 pt-20 sm:px-6 lg:px-8">
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
                  rel="noreferrer"
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
              <a
                href={`mailto:${SITE.email}`}
                className="footer-email-btn mr-1.5 flex h-10 w-28 shrink-0 items-center justify-center rounded-full text-sm transition hover:opacity-90 active:scale-95 focus:outline-none"
              >
                Email
              </a>
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
          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em]"
            aria-label="Back to top"
          >
            <svg
              className="h-3.5 w-3.5 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            Back to top
          </button>
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
