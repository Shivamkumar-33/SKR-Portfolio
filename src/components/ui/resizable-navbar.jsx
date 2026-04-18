import React, { useRef, useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { cn } from "../../lib/utils";

export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-2 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: "none",
        y: visible ? 8 : 0,
        opacity: visible ? 0.98 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-4xl flex-row items-center justify-between self-start rounded-3xl border border-white/10 bg-transparent px-3 py-2.5 lg:flex",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, activeLink }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative z-10 hidden flex-1 flex-row items-center justify-center space-x-0.5 text-sm font-semibold text-zinc-200 transition duration-200 lg:flex lg:space-x-0.5",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isActive = activeLink === item.link;

        return (
          <a
            onMouseEnter={() => setHovered(idx)}
            onClick={() => onItemClick?.(item.link)}
            className={`relative inline-flex min-h-9 items-center rounded-full px-4 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors ${
              isActive
                ? "bg-white text-black font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
            key={`link-${idx}`}
            href={item.link}
            aria-current={isActive ? "page" : undefined}
          >
            {!isActive && hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-white/10"
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </a>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: "none",
        y: visible ? 8 : 0,
        opacity: visible ? 0.98 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-2xl border border-white/10 bg-transparent px-3 py-1.5 lg:hidden",
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

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
  menuId,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={menuId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-xl border border-white/10 bg-neutral-950 px-4 py-6 text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.2)]",
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

export const MobileNavToggle = ({ isOpen, onClick, controlsId }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      {isOpen ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#home"
      className="relative z-20 mr-0.5 flex items-center px-0.5 py-0.5"
    >
      <img
        src="/images/logo.svg"
        alt="SK logo"
        width={56}
        height={42}
        className="h-8 w-auto object-contain"
      />
    </a>
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
