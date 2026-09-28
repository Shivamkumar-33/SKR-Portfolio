import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { SITE, navItems, sectionIds, socials } from "../constants";
import { SocialIcon } from "../constants/socialIcons";

/* ─── Desktop Nav Links ─────────────────────────────────────── */
const NavMenu = ({ activeSection, onItemClick, theme }) => (
  <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
    {navItems.map((item) => {
      const isActive = activeSection === item.id;
      return (
        <a
          key={item.id}
          href={item.link}
          onClick={() => onItemClick(item.link)}
          aria-current={isActive ? "page" : undefined}
          className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 ${
            isActive
              ? theme === "dark"
                ? "text-black"
                : "text-white"
              : theme === "dark"
              ? "text-neutral-400 hover:text-white"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="nav-active-pill"
              className={`absolute inset-0 rounded-full ${
                theme === "dark" ? "bg-white" : "bg-neutral-900"
              }`}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </a>
      );
    })}
  </nav>
);

/* ─── Mobile Drawer ─────────────────────────────────────────── */
const MobileDrawer = ({ isOpen, onClose, activeSection, onItemClick, theme }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <motion.div
          key="drawer"
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className={`fixed top-[65px] left-4 right-4 z-50 rounded-2xl shadow-2xl p-5 flex flex-col gap-2 md:hidden ${
            theme === "dark"
              ? "bg-[#0d0d0d] border border-white/10 text-white"
              : "bg-white border border-black/10 text-neutral-900"
          }`}
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          {/* Nav links */}
          {navItems.map((item, i) => {
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.id}
                href={item.link}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28, delay: 0.04 + i * 0.06, ease: "easeOut" }}
                onClick={() => {
                  onItemClick(item.link);
                  onClose();
                }}
                className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? theme === "dark"
                      ? "bg-white text-black"
                      : "bg-neutral-900 text-white"
                    : theme === "dark"
                    ? "text-neutral-400 hover:bg-white/10"
                    : "text-neutral-600 hover:bg-black/[0.06]"
                }`}
              >
                {item.name}
              </motion.a>
            );
          })}

          {/* Divider – Email */}
          <motion.div
            className={`border-t pt-4 mt-2 ${theme === "dark" ? "border-zinc-800/60" : "border-black/12"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
          >
            <p className={`mb-1 text-xs uppercase tracking-widest ${theme === "dark" ? "text-zinc-500" : "text-neutral-500"}`}>
              E-mail
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className={`text-sm transition-colors hover:opacity-70 ${theme === "dark" ? "text-neutral-100" : "text-neutral-900"}`}
              onClick={onClose}
            >
              {SITE.email}
            </a>
          </motion.div>

          {/* Divider – Socials */}
          <motion.div
            className={`flex flex-col gap-2 border-t pt-4 ${theme === "dark" ? "border-zinc-800/60" : "border-black/12"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42 }}
          >
            <p className={`text-xs uppercase tracking-widest ${theme === "dark" ? "text-zinc-500" : "text-neutral-500"}`}>
              Social Media
            </p>
            {socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.48 + i * 0.06 }}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  theme === "dark"
                    ? "text-neutral-300 hover:bg-white/10"
                    : "text-neutral-700 hover:bg-black/[0.06]"
                }`}
              >
                <SocialIcon name={social.name} className="h-4 w-4" />
                {social.name}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ─── Main Navbar ───────────────────────────────────────────── */
const Navbar = ({ theme = "dark", onToggleTheme, isRevealed = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  /* Active section tracker */
  useEffect(() => {
    const handleScroll = () => {
      const checkpoint = window.scrollY + window.innerHeight * 0.35;
      let current = sectionIds[0];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= checkpoint) current = id;
      });
      setActiveSection((prev) => (prev === current ? prev : current));
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavItemClick = (link) => setActiveSection(link.replace("#", ""));

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      className="navbar-fixed-shell pointer-events-none fixed top-0 left-0 right-0 z-50"
      initial={false}
      animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : -16 }}
      transition={{ duration: 0.85, delay: isRevealed ? 0.35 : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={isRevealed ? "pointer-events-auto" : "pointer-events-none"}>
        {/* ── Bar ── */}
        <motion.div
          animate={{
            backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
            boxShadow: scrolled
              ? theme === "dark"
                ? "0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)"
                : "0 1px 0 rgba(0,0,0,0.08), 0 4px 18px rgba(0,0,0,0.08)"
              : "none",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 50 }}
          className={`h-16 border-b transition-colors duration-300 ${
            theme === "dark"
              ? "border-white/[0.07] bg-black/50"
              : "border-black/[0.08] bg-white/80"
          }`}
        >
          <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left: Logo + Desktop Nav */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <motion.a
                href="#home"
                className="flex items-center shrink-0"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                onClick={() => handleNavItemClick("#home")}
              >
                <img
                  src="/images/logo.svg"
                  alt="SK logo"
                  width={56}
                  height={42}
                  className={`h-8 w-auto object-contain ${
                    theme === "light" ? "[filter:brightness(0)_saturate(100%)] opacity-80" : ""
                  }`}
                />
              </motion.a>

              {/* Desktop nav links */}
              <NavMenu
                activeSection={activeSection}
                onItemClick={handleNavItemClick}
                theme={theme}
              />
            </div>

            {/* Right: Theme toggle + Email CTA + Mobile hamburger */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              {/* Theme toggle */}
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                  theme === "dark"
                    ? "border-white/12 bg-white/6 text-neutral-300 hover:bg-white/12 hover:text-white focus-visible:ring-white/50"
                    : "border-black/10 bg-black/5 text-neutral-600 hover:bg-black/10 hover:text-neutral-900 focus-visible:ring-black/30"
                }`}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {/* Email CTA — hidden on mobile */}
              <a
                href={`mailto:${SITE.email}`}
                className={`hidden sm:inline-flex h-9 items-center rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                  theme === "dark"
                    ? "border-white/14 bg-white/8 text-neutral-200 hover:bg-white/16 hover:text-white focus-visible:ring-white/50"
                    : "border-black/12 bg-black/5 text-neutral-800 hover:bg-black/10 hover:text-neutral-900 focus-visible:ring-black/30"
                }`}
              >
                Email
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                className={`md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                  theme === "dark"
                    ? "border-white/12 bg-white/6 text-neutral-300 hover:bg-white/12 hover:text-white focus-visible:ring-white/50"
                    : "border-black/10 bg-black/5 text-neutral-600 hover:bg-black/10 hover:text-neutral-900 focus-visible:ring-black/30"
                }`}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Drawer */}
        <MobileDrawer
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeSection={activeSection}
          onItemClick={handleNavItemClick}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
      </div>
    </motion.header>
  );
};

export default Navbar;
