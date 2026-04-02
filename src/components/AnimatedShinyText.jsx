const AnimatedShinyText = ({
  children,
  className = "",
  shimmerWidth = 140,
  ...props
}) => {
  return (
    <span
      style={{
        "--shiny-width": `${shimmerWidth}px`,
      }}
      className={[
        "animate-shiny-text bg-[length:var(--shiny-width)_100%] bg-clip-text bg-no-repeat text-transparent",
        "bg-gradient-to-r from-white/35 via-white/95 via-50% to-white/35",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
};

export default AnimatedShinyText;
