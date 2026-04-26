import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const fallbackIconByName = {
  LinkedIn: "mdi:linkedin",
  GitHub: "mdi:github",
  Twitter: "ri:twitter-x-fill",
  X: "ri:twitter-x-fill",
  Instagram: "mdi:instagram",
  Mail: "mdi:email-outline",
  Website: "mdi:web",
  Telegram: "mdi:telegram",
  Dribbble: "mdi:dribbble",
};

const resolveIcon = (icon, name) => {
  if (typeof icon === "string" && icon.includes(":")) {
    return icon;
  }

  if (typeof icon === "string" && fallbackIconByName[icon]) {
    return fallbackIconByName[icon];
  }

  return fallbackIconByName[name] || "mdi:link-variant";
};

const FramerSocialIcon = ({
  containerSize = 36,
  borderRadius = 999,
  hef = "https://x.com/",
  icon = "X",
  name = "Social",
  openInNew = true,
  hoverLift = true,
  className = "",
}) => {
  const iconPx = Math.max(14, Math.round(containerSize * 0.5));
  const iconName = resolveIcon(icon, name);

  return (
    <motion.a
      href={hef}
      aria-label={name}
      className={`framer-social-icon ${className}`.trim()}
      style={{
        width: containerSize,
        height: containerSize,
        borderRadius,
      }}
      whileHover={{
        scale: hoverLift ? 1.08 : 1,
        y: hoverLift ? -3 : 0,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      target={openInNew ? "_blank" : undefined}
      rel={openInNew ? "noopener noreferrer" : undefined}
    >
      <Icon icon={iconName} style={{ fontSize: iconPx }} />
    </motion.a>
  );
};

export default FramerSocialIcon;
