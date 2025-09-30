import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default:
        "bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow",
      destructive:
        "bg-red-600 hover:bg-red-700 text-white font-semibold shadow",
      success:
        "bg-green-600 hover:bg-green-700 text-white font-semibold shadow",
      outline:
        "border border-slate-600 bg-transparent hover:bg-slate-800 text-white",
    };

    const sizes = {
      default: "px-4 py-2 text-sm rounded-lg",
      sm: "px-3 py-1.5 text-xs rounded-md",
      lg: "px-5 py-3 text-base rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "transition-all disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
