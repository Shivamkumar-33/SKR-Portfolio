import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X, ArrowUpRight, Mail } from "lucide-react";

import { SITE, navItems, sectionIds, socials } from "../constants";
import { SocialIcon } from "../constants/socialIcons";

/* ─── Theme helper ──────────────────────────────────────────── */
const pick = (theme, dark, light) => (theme === "dark" ? dark : light);

/* ─── Animated underline that follows the active link ──────── */
const NavUnderline = ({ theme }) => (
  <motion.div
    layoutId="nav-underline"
    className="absolute -bottom-[1px] left-1 right-1 h-[2px] rounded-full"
    style={{
      background: pick(
        theme,
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
        "linear-gradient(90deg, transparent, rgba(0,0,0,0.6), transparent)"
      ),
    }}
    transition={{ type: "spring", stiffness: 400, damping: 32 }}
  />
);

/* ─── Desktop Nav Links ─────────────────────────────────────── */
const NavMenu = ({ activeSection, onItemClick, theme }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <nav
      className="hidden md:flex items-center gap-0"
      aria-label="Primary navigation"
      onMouseLeave={() => setHovered(null)}
    >
      {navItems.map((item, idx) => {
        const isActive = activeSection === item.id;
        return (
          <motion.a
            key={item.id}
            href={item.link}
            onClick={() => onItemClick(item.link)}
            onMouseEnter={() => setHovered(idx)}
            aria-current={isActive ? "page" : undefined}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 + idx * 0.07 }}
            className={`relative px-3.5 py-2 text-[13px] font-medium tracking-[-0.01em]
              transition-colors duration-200 focus-visible:outline-none
              ${
                isActive
                  ? pick(theme, "text-white", "text-neutral-900")
                  : pick(
                      theme,
                      "text-neutral-500 hover:text-neutral-200",
                      "text-neutral-400 hover:text-neutral-700"
                    )
              }`}
          >
            {/* Hover glow behind item */}
            <AnimatePresence>
              {hovered === idx && !isActive && (
                <motion.span
                  layoutId="nav-hover-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute inset-0 rounded-lg ${pick(
                    theme,
                    "bg-white/[0.06]",
                    "bg-black/[0.04]"
                  )}`}
                />
              )}
            </AnimatePresence>

            {/* Active underline */}
            {isActive && <NavUnderline theme={theme} />}

            <span className="relative z-10">{item.name}</span>

            {/* Active dot indicator */}
            {isActive && (
              <motion.span
                layoutId="nav-active-dot"
                className={`absolute -top-0.5 right-1.5 h-1 w-1 rounded-full ${pick(
                  theme,
                  "bg-white shadow-[0_0_6px_rgba(255,255,255,0.5)]",
                  "bg-neutral-900"
                )}`}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
              />
            )}
          </motion.a>
        );
      })}
    </nav>
  );
};

/* ─── Icon button style ─────────────────────────────────────── */
const iconBtnClass = (theme) =>
  `inline-flex h-9 w-9 items-center justify-center rounded-xl border
   transition-all duration-200 hover:scale-105 active:scale-95
   focus-visible:outline-none focus-visible:ring-2 ${pick(
     theme,
     "border-white/[0.08] bg-white/[0.04] text-neutral-400 hover:bg-white/[0.08] hover:text-white focus-visible:ring-white/30",
     "border-black/[0.06] bg-black/[0.03] text-neutral-500 hover:bg-black/[0.06] hover:text-neutral-900 focus-visible:ring-black/20"
   )}`;

/* ─── Separator dot ─────────────────────────────────────────── */
const Dot = ({ theme }) => (
  <span
    className={`hidden sm:block h-1 w-1 rounded-full ${pick(
      theme,
      "bg-white/20",
      "bg-black/15"
    )}`}
  />
);

/* ─── Mobile Drawer ─────────────────────────────────────────── */
const MobileDrawer = ({ isOpen, onClose, activeSection, onItemClick, theme }) => {
  const divider = pick(theme, "border-white/[0.06]", "border-black/[0.06]");
  const label = `mb-1.5 text-[10px] font-medium uppercase tracking-[0.18em] ${pick(
    theme,
    "text-neutral-500",
    "text-neutral-400"
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-x-0 bottom-0 top-14 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className={`fixed top-[60px] left-3 right-3 z-50 rounded-2xl p-4
              shadow-[0_24px_64px_rgba(0,0,0,0.3)] backdrop-blur-2xl md:hidden ${pick(
                theme,
                "border border-white/[0.06] bg-[#0a0a0a]/[0.97] text-white",
                "border border-black/[0.06] bg-white/[0.97] text-neutral-900"
              )}`}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col gap-0.5">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={item.link}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: 0.04 + i * 0.05, ease: "easeOut" }}
                    onClick={() => {
                      onItemClick(item.link);
                      onClose();
                    }}
                    className={`group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium
                      transition-all duration-200 ${
                        isActive
                          ? pick(theme, "bg-white text-black", "bg-neutral-900 text-white")
                          : pick(
                              theme,
                              "text-neutral-400 hover:bg-white/[0.06] hover:text-white",
                              "text-neutral-600 hover:bg-black/[0.04] hover:text-neutral-950"
                            )
                      }`}
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight
                      className={`h-3.5 w-3.5 opacity-0 -translate-x-1 translate-y-0.5
                        transition-all duration-200 group-hover:opacity-60 group-hover:translate-x-0
                        group-hover:translate-y-0 ${isActive ? "!opacity-0" : ""}`}
                    />
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              className={`mt-3 border-t pt-4 ${divider}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
            >
              <p className={label}>E-mail</p>
              <a
                href={`mailto:${SITE.email}`}
                onClick={onClose}
                className={`inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-60 ${pick(
                  theme,
                  "text-neutral-100",
                  "text-neutral-900"
                )}`}
              >
                <Mail className="h-3.5 w-3.5 opacity-50" />
                {SITE.email}
              </a>
            </motion.div>

            <motion.div
              className={`mt-4 border-t pt-4 ${divider}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.36 }}
            >
              <p className={label}>Social Media</p>
              <div className="flex flex-col gap-0.5">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className={`group flex items-center justify-between rounded-xl px-3 py-2.5
                      text-sm font-medium transition-colors ${pick(
                        theme,
                        "text-neutral-300 hover:bg-white/[0.06] hover:text-white",
                        "text-neutral-700 hover:bg-black/[0.04] hover:text-neutral-950"
                      )}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <SocialIcon name={social.name} className="h-4 w-4" />
                      {social.name}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-50" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ─── Main Navbar ───────────────────────────────────────────── */
const Navbar = ({ theme = "dark", onToggleTheme, isRevealed = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const clickLock = useRef(false);
  const lockTimer = useRef();

  /* Active section tracker */
  useEffect(() => {
    const handleScroll = () => {
      if (!clickLock.current) {
        let current = sectionIds[0];

        sectionIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
            current = id;
          }
        });

        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4
        ) {
          current = sectionIds[sectionIds.length - 1];
        }

        setActiveSection((prev) => (prev === current ? prev : current));
      }
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(lockTimer.current);
    };
  }, []);

  const handleNavItemClick = (link) => {
    setActiveSection(link.replace("#", ""));
    clickLock.current = true;
    clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => (clickLock.current = false), 900);
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsMobileMenuOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMobileMenuOpen]);

  const githubUrl =
    socials.find((s) => s.name === "GitHub")?.href ||
    "https://github.com/Shivamkumar-33";

  return (
    <motion.header
      className="navbar-fixed-shell pointer-events-none fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : -16 }}
      transition={{
        duration: 0.85,
        delay: isRevealed ? 0.35 : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className={isRevealed ? "pointer-events-auto" : "pointer-events-none"}>
        <motion.div
          animate={{
            backdropFilter: scrolled ? "blur(24px)" : "blur(10px)",
            boxShadow: scrolled
              ? pick(
                  theme,
                  "0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.35)",
                  "0 1px 0 rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.06)"
                )
              : "none",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 50 }}
          className={`relative z-50 h-14 border-b transition-colors duration-500 ${pick(
            theme,
            "border-white/[0.07] bg-black/60",
            "border-black/[0.06] bg-white/75"
          )}`}
        >
          <div className="mx-auto flex h-full max-w-4xl items-center justify-between px-4 sm:px-5">
            {/* ── Left: logo + separator + nav ── */}
            <div className="flex items-center gap-5">
              <motion.a
                href="#home"
                className="group relative flex shrink-0 items-center"
                initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNavItemClick("#home")}
              >
                <img
                  src="/images/logo.svg"
                  alt="SK logo"
                  width={56}
                  height={42}
                  className={`h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-110 ${
                    theme === "light"
                      ? "[filter:brightness(0)_saturate(100%)] opacity-80"
                      : ""
                  }`}
                />
                <span
                  className={`absolute inset-0 -z-10 scale-150 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 ${pick(
                    theme,
                    "bg-white/[0.06]",
                    "bg-black/[0.03]"
                  )}`}
                />
              </motion.a>

              {/* Separator line */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className={`hidden md:block h-4 w-px origin-top ${pick(
                  theme,
                  "bg-white/[0.1]",
                  "bg-black/[0.08]"
                )}`}
              />

              <NavMenu
                activeSection={activeSection}
                onItemClick={handleNavItemClick}
                theme={theme}
              />
            </div>

            {/* ── Right: theme · github · email · hamburger ── */}
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              {/* Theme toggle */}
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className={iconBtnClass(theme)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="inline-flex"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-[15px] w-[15px]" />
                    ) : (
                      <Moon className="h-[15px] w-[15px]" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>

              <Dot theme={theme} />

              {/* GitHub */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
                className={`hidden sm:inline-flex ${iconBtnClass(theme)}`}
              >
                <SocialIcon name="GitHub" className="h-[15px] w-[15px]" />
              </a>

              {/* Email CTA */}
              <a
                href={`mailto:${SITE.email}`}
                className={`group relative hidden sm:inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-xl
                  px-4 text-[13px] font-medium transition-all duration-300 hover:-translate-y-px
                  focus-visible:outline-none focus-visible:ring-2 ${pick(
                    theme,
                    "bg-white text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus-visible:ring-white/40",
                    "bg-neutral-900 text-white hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] focus-visible:ring-black/30"
                  )}`}
              >
                <Mail className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:scale-110" />
                <span>Email</span>
                {/* Shine sweep */}
                <span
                  className={`absolute inset-0 -translate-x-full skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full ${pick(
                    theme,
                    "bg-gradient-to-r from-transparent via-white/20 to-transparent",
                    "bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  )}`}
                />
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-expanded={isMobileMenuOpen}
                aria-label={
                  isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                className={`md:hidden ${iconBtnClass(theme)}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMobileMenuOpen ? "close" : "open"}
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-[18px] w-[18px]" />
                    ) : (
                      <Menu className="h-[18px] w-[18px]" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
        </motion.div>

        <MobileDrawer
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeSection={activeSection}
          onItemClick={handleNavItemClick}
          theme={theme}
        />
      </div>
    </motion.header>
  );
};

export default Navbar;