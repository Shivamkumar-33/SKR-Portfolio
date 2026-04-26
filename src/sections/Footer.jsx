import React from "react";
import { socials } from "../constants";
import FramerSocialIcon from "../components/FramerSocialIcon";

const Footer = () => {
  return (
    <footer className="theme-section footer-surface w-full border-t px-4 py-5 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs tracking-widest uppercase">
          © 2026 SHIVAM KUMAR. ALL RIGHTS RESERVED.
        </div>
        
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <FramerSocialIcon
              key={social.name}
              hef={social.href}
              icon={social.icon}
              name={social.name}
              containerSize={36}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;