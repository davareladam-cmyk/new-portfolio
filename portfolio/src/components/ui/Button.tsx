import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  href?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & { as?: "button" | "a" }>(
  ({ variant = "primary", as = "button", children, className = "", ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-none";
    const variants = {
      primary: "bg-accent text-bg hover:bg-accent-dim",
      ghost: "border border-accent text-accent hover:bg-accent hover:text-bg",
    };

    const classes = `${base} ${variants[variant]} ${className}`;

    if (as === "a") {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={(props as any).href || "#"}
          className={classes}
          data-hoverable
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...props} data-hoverable>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
