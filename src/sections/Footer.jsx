import React from "react";
import { Icon } from "@iconify/react";
import { socials } from "../constants";

const Footer = () => {
  return (
    <footer className="mt-6 w-full border-t border-white/20 bg-black px-4 py-5 text-white/65 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs tracking-widest uppercase">
          © 2026 SHIVAM KUMAR. ALL RIGHTS RESERVED.
        </div>
        
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="transition-colors duration-300 hover:text-gold"
            >
              <Icon
                icon={social.icon}
                className={social.name === "Twitter" ? "w-4 h-4" : "w-5 h-5"}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;