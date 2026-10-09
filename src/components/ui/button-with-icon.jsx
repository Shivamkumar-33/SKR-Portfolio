import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

const ButtonWithIcon = forwardRef(
  (
    {
      children = "Let’s Collaborate",
      href,
      className = "",
      iconClassName = "",
      ...props
    },
    ref,
  ) => {
    const content = (
      <>
        <span className="button-with-icon__label">{children}</span>
        <span
          className={cn("button-with-icon__icon", iconClassName)}
          aria-hidden="true"
        >
          <ArrowUpRight size={17} strokeWidth={1.75} />
        </span>
      </>
    );

    if (href) {
      return (
        <Button asChild className={cn("button-with-icon", className)}>
          <a ref={ref} href={href} {...props}>
            {content}
          </a>
        </Button>
      );
    }

    return (
      <Button ref={ref} className={cn("button-with-icon", className)} {...props}>
        {content}
      </Button>
    );
  },
);

ButtonWithIcon.displayName = "ButtonWithIcon";

export default ButtonWithIcon;
