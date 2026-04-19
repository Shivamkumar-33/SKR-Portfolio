import React, { useEffect, useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { cn } from "../../lib/utils";

export const Navbar = ({ children, className, theme = "dark" }) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  useEffect(() => {
    const updateVisible = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setVisible((prev) => {
        const next = y > 100;
        return prev === next ? prev : next;
      });
    };

    updateVisible();
    window.addEventListener("scroll", updateVisible, { passive: true });
    return () => window.removeEventListener("scroll", updateVisible);
  }, []);

  return (
    <motion.div
      className={cn("sticky inset-x-0 top-2 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible, theme })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible, theme = "dark" }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "blur(10px)",
        boxShadow: visible
          ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.05)"
          : "none",
        width: visible ? "92%" : "100%",
        scale: visible ? 0.95 : 1,
        y: visible ? 8 : 0,
        opacity: visible ? 0.98 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "navbar-glow relative z-[60] mx-auto hidden w-full max-w-4xl origin-top flex-row items-center justify-between self-start rounded-3xl px-3 py-2.5 lg:flex",
        theme === "dark"
          ? "border border-white/[0.08] bg-black/40 text-white"
          : "border border-black/10 bg-[#fbfaf7]/80 text-[#12100d]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, activeLink, theme = "dark" }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative z-10 hidden flex-1 flex-row items-center justify-center space-x-0.5 text-sm font-semibold transition duration-200 lg:flex lg:space-x-0.5",
        theme === "dark" ? "text-zinc-200" : "text-[#2f2a23]",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isActive = activeLink === item.link;

        return (
          /* Improvement 5: Stagger entrance animation for each nav link */
          <motion.a
            key={`link-${idx}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + idx * 0.06 }}
            onMouseEnter={() => setHovered(idx)}
            onClick={() => onItemClick?.(item.link)}
            className={`relative inline-flex min-h-9 items-center rounded-full px-4 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors ${
              isActive
                ? "font-bold"
                : theme === "dark"
                  ? "text-neutral-400 hover:text-white"
                  : "text-[#5c5448] hover:text-[#16120e]"
            }`}
            href={item.link}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Improvement 2: Animated active pill slider */}
            {isActive && (
              <motion.div
                layoutId="activeNavPill"
                className={cn(
                  "absolute inset-0 rounded-full",
                  theme === "dark"
                    ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.12)]"
                    : "bg-[#17130f] shadow-[0_0_10px_rgba(23,19,15,0.2)]"
                )}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            {/* Hover background for non-active items */}
            {!isActive && hovered === idx && (
              <motion.div
                layoutId="hovered"
                className={cn(
                  "absolute inset-0 h-full w-full rounded-full",
                  theme === "dark" ? "bg-white/10" : "bg-black/[0.08]"
                )}
              />
            )}

            <span className={`relative z-20 ${isActive ? (theme === "dark" ? "text-black" : "text-[#f7f3eb]") : ""}`}>
              {item.name}
            </span>
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible, theme = "dark" }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "blur(10px)",
        boxShadow: visible
          ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.05)"
          : "none",
        width: visible ? "94%" : "100%",
        scale: visible ? 0.97 : 1,
        y: visible ? 8 : 0,
        opacity: visible ? 0.98 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "navbar-glow relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] origin-top flex-col items-center justify-between rounded-2xl backdrop-blur-xl px-3 py-1.5 lg:hidden",
        theme === "dark"
          ? "border border-white/[0.08] bg-black/40 text-white"
          : "border border-black/10 bg-[#fbfaf7]/85 text-[#12100d]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

/* Improvement 6: Premium Mobile Menu Polish */
export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
  menuId,
  theme = "dark",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={menuId}
          initial={{ opacity: 0, y: -20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-xl backdrop-blur-2xl px-4 py-6 shadow-[0_16px_48px_rgba(0,0,0,0.5)]",
            theme === "dark"
              ? "border border-white/[0.08] bg-black/80 text-white"
              : "border border-black/10 bg-[#f8f6f1]/95 text-[#18140f]",
            className,
          )}
        >
          <button
            type="button"
            onClick={onClose}
            className="sr-only"
            aria-label="Close menu"
          >
            Close menu
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick, controlsId, theme = "dark" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        theme === "dark" ? "text-white" : "text-[#17130f]"
      )}
    >
      {isOpen ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
    </button>
  );
};

/* Improvement 5: Stagger entrance on logo */
export const NavbarLogo = ({ theme = "dark" }) => {
  return (
    <motion.a
      href="#home"
      className="relative z-20 mr-0.5 flex items-center px-0.5 py-0.5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <img
        src="/images/logo.svg"
        alt="SK logo"
        width={56}
        height={42}
        className={cn(
          "h-8 w-auto object-contain",
          theme === "light" && "[filter:brightness(0)_saturate(100%)] opacity-80"
        )}
      />
    </motion.a>
  );
};

export const NavbarButton = ({
  href,
  as: tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "inline-flex min-h-10 cursor-pointer items-center justify-center rounded-md px-4 py-1.5 text-center text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

  const variantStyles = {
    primary:
      "bg-white text-black shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "border border-white/20 bg-white/10 text-white shadow-none hover:bg-white/15",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return React.createElement(
    tag,
    {
      href: href || undefined,
      className: cn(baseStyles, variantStyles[variant], className),
      ...props,
    },
    children,
  );
};
