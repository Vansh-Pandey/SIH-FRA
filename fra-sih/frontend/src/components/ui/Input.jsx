import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white shadow-sm",
        "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "disabled:cursor-not-allowed disabled:opacity-50 transition",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
