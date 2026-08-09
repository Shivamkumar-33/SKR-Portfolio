import { Icon } from "@iconify/react";

const MarqueeItem = ({ text, icon, iconClassName }) => (
  <span className="marquee__item">
    <span className="marquee__label">{text}</span>
    <Icon icon={icon} className={`marquee__icon ${iconClassName}`} />
  </span>
);

const Marquee = ({
  items,
  className = "marquee-surface",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
  speed = 35,
}) => {
  return (
    <div
      className={`marquee overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase ${className}`}
    >
      <div
        className={`marquee__track ${reverse ? "marquee__track--reverse" : ""}`}
        style={{ "--marquee-duration": `${speed}s` }}
      >
        <div className="marquee__group">
          {items.map((text, index) => (
            <MarqueeItem
              key={`a-${text}-${index}`}
              text={text}
              icon={icon}
              iconClassName={iconClassName}
            />
          ))}
        </div>
        <div className="marquee__group" aria-hidden="true">
          {items.map((text, index) => (
            <MarqueeItem
              key={`b-${text}-${index}`}
              text={text}
              icon={icon}
              iconClassName={iconClassName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
