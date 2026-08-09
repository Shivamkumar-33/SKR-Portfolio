import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { SITE, navItems, sectionIds, socials } from "../constants";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar as ResizableNavbar,
  NavbarButton,
  NavbarLogo,
  NavItems,
} from "../components/ui/resizable-navbar";

const Navbar = ({ theme = "dark", onToggleTheme, isRevealed = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const mobileMenuId = "primary-mobile-nav";

  useEffect(() => {
    const handleScroll = () => {
      const checkpoint = window.scrollY + window.innerHeight * 0.35;
      let current = sectionIds[0];

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= checkpoint) {
          current = id;
        }
      });

      setActiveSection((prev) => (prev === current ? prev : current));

    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavItemClick = (link) => {
    setActiveSection(link.replace("#", ""));
  };

  return (
    <motion.div
      className="navbar-fixed-shell pointer-events-none fixed top-0 z-50 py-1.5"
      initial={false}
      animate={{
        opacity: isRevealed ? 1 : 0,
        y: isRevealed ? 0 : -16,
      }}
      transition={{ duration: 0.85, delay: isRevealed ? 0.35 : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={isRevealed ? "pointer-events-auto" : "pointer-events-none"}>
        <ResizableNavbar className="mx-auto max-w-4xl" theme={theme}>
          <NavBody className="px-2 md:px-3">
            <NavbarLogo theme={theme} />
            <NavItems
              items={navItems}
              activeLink={`#${activeSection}`}
              onItemClick={handleNavItemClick}
              theme={theme}
              className="tracking-normal"
            />

            {/* CTA with stagger entrance */}
            <motion.div
              className="relative z-20 flex items-center gap-1.5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className="theme-toggle-btn"
              >
                <Icon
                  icon={theme === "dark" ? "ph:sun-dim-bold" : "ph:moon-stars-bold"}
                  className="h-4 w-4"
                />
              </button>

              <NavbarButton
                variant={theme === "dark" ? "secondary" : "dark"}
                href={`mailto:${SITE.email}`}
                className="min-w-[72px] px-3"
              >
                Email
              </NavbarButton>
            </motion.div>
          </NavBody>

          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo theme={theme} />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onToggleTheme}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                  className="theme-toggle-btn"
                >
                  <Icon
                    icon={theme === "dark" ? "ph:sun-dim-bold" : "ph:moon-stars-bold"}
                    className="h-4 w-4"
                  />
                </button>
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  controlsId={mobileMenuId}
                  theme={theme}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              menuId={mobileMenuId}
              theme={theme}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, i) => {
                const isActive = activeSection === item.link.replace("#", "");
                return (
                  <motion.a
                    key={item.name}
                    href={item.link}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.05 + i * 0.07,
                      ease: "easeOut",
                    }}
                    onClick={() => {
                      handleNavItemClick(item.link);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`relative flex w-full items-center rounded-xl p-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? theme === "dark"
                          ? "bg-white text-black"
                          : "bg-[#17130f] text-[#f7f2e9]"
                        : theme === "dark"
                          ? "text-neutral-400 hover:bg-white/10"
                          : "text-[#4f473b] hover:bg-black/[0.08]"
                    }`}
                  >
                    <span>{item.name}</span>
                  </motion.a>
                );
              })}

              <motion.div
                className={`w-full border-t pt-4 ${theme === "dark" ? "border-zinc-800/60" : "border-black/12"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <p className={`mb-2 text-xs uppercase tracking-widest ${theme === "dark" ? "text-zinc-500" : "text-[#7a7062]"}`}>
                  E-mail
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className={`text-sm transition-colors hover:text-gold ${theme === "dark" ? "text-neutral-100" : "text-[#15120f]"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {SITE.email}
                </a>
              </motion.div>

              <motion.div
                className={`flex w-full flex-col gap-2 border-t pt-4 ${theme === "dark" ? "border-zinc-800/60" : "border-black/12"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <p className={`text-xs uppercase tracking-widest ${theme === "dark" ? "text-zinc-500" : "text-[#7a7062]"}`}>
                  Social Media
                </p>
                {socials.map((social, i) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                  >
                    <NavbarButton
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      variant={theme === "dark" ? "secondary" : "dark"}
                      className="w-full text-left"
                    >
                      <Icon icon={social.icon} className="mr-2 h-4 w-4" />
                      {social.name}
                    </NavbarButton>
                  </motion.div>
                ))}
              </motion.div>
            </MobileNavMenu>
          </MobileNav>
        </ResizableNavbar>
      </div>
    </motion.div>
  );
};

export default Navbar;
