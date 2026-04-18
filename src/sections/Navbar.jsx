import { useEffect, useState } from "react";
import { socials } from "../constants";
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

const navItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

const sectionIds = ["home", "about", "projects", "contact"];

const Navbar = () => {
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
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 py-1.5 md:px-8">
      <div className="pointer-events-auto">
        <ResizableNavbar className="mx-auto max-w-4xl">
          <NavBody className="px-2 md:px-3">
            <NavbarLogo />
            <NavItems
              items={navItems}
              activeLink={`#${activeSection}`}
              onItemClick={handleNavItemClick}
              className="tracking-normal"
            />
            <div className="relative z-20 flex items-center gap-1">
              <NavbarButton
                variant="secondary"
                href="mailto:shivamjmp2@gmail.com"
                className="min-w-[72px] px-3"
              >
                Email
              </NavbarButton>
              <NavbarButton
                variant="primary"
                href={socials[0]?.href || "#"}
                target="_blank"
                rel="noreferrer"
                className="min-w-[86px] px-3"
              >
                LinkedIn
              </NavbarButton>
            </div>
          </NavBody>

          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                controlsId={mobileMenuId}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              menuId={mobileMenuId}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.link.replace("#", "");
                return (
                  <a
                    key={item.name}
                    href={item.link}
                    onClick={() => {
                      handleNavItemClick(item.link);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`relative flex w-full items-center rounded-xl p-3 text-sm font-semibold transition-colors ${
                      isActive ? "bg-white text-black" : "text-neutral-400 hover:bg-white/10"
                    }`}
                  >
                    <span>{item.name}</span>
                  </a>
                );
              })}

              <div className="w-full border-t border-zinc-800 pt-4">
                <p className="mb-2 text-xs uppercase tracking-widest text-zinc-400">
                  E-mail
                </p>
                <a
                  href="mailto:shivamjmp2@gmail.com"
                  className="text-sm text-neutral-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  shivamjmp2@gmail.com
                </a>
              </div>

              <div className="flex w-full flex-col gap-2 border-t border-zinc-800 pt-4">
                <p className="text-xs uppercase tracking-widest text-zinc-400">
                  Social Media
                </p>
                {socials.map((social) => (
                  <NavbarButton
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="secondary"
                    className="w-full text-left"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </NavbarButton>
                ))}
              </div>
            </MobileNavMenu>
          </MobileNav>
        </ResizableNavbar>
      </div>
    </div>
  );
};

export default Navbar;
