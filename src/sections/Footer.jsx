import React from "react";
import { Icon } from "@iconify/react";
import { socials } from "../constants";

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-zinc-800 text-zinc-400 py-6 px-4 md:px-8 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs tracking-widest font-mono uppercase">
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
              className="hover:text-white transition-colors duration-300"
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