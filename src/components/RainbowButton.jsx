import { forwardRef } from "react";

const baseClasses = [
  "relative isolate inline-flex items-center justify-center gap-2 shrink-0",
  "group transition-all duration-300 motion-reduce:animate-none [animation:var(--animate-rainbow),var(--animate-rainbow-float)]",
  "rounded-full outline-none",
  "text-sm font-semibold text-center uppercase",
  "disabled:pointer-events-none disabled:opacity-50",
].join(" ");

const variantClasses = {
  default: [
    "border-0 text-white/90 hover:text-white",
    "bg-[linear-gradient(#0f1115,#0f1115),linear-gradient(#0f1115_52%,rgba(15,17,21,0.55)_82%,rgba(15,17,21,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
    "bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:2px_solid_transparent]",
    "before:absolute before:bottom-[-25%] before:left-1/2 before:-z-10 before:h-1/3 before:w-2/3 before:-translate-x-1/2",
    "before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:[filter:blur(0.8rem)] before:[animation:var(--animate-rainbow),var(--animate-rainbow-orbit)]",
    "after:absolute after:inset-[-3px] after:-z-20 after:rounded-full after:border after:border-cyan-200/20 after:opacity-0 after:transition-opacity after:duration-300 group-hover:after:opacity-70",
    "hover:shadow-[0_0_22px_rgba(52,217,255,0.24)]",
  ].join(" "),
};

const sizeClasses = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-4 text-[10px] sm:text-xs tracking-[0.24em]",
  lg: "h-11 px-8",
  icon: "size-9",
};

const RainbowButton = forwardRef(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const classes = [
      baseClasses,
      variantClasses[variant] || variantClasses.default,
      sizeClasses[size] || sizeClasses.default,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <button ref={ref} className={classes} {...props} />;
  }
);

RainbowButton.displayName = "RainbowButton";

export default RainbowButton;
