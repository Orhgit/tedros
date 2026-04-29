import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/**
 * Accessible switch — pure CSS, no JS state. Wrap with <label> + visually
 * hidden checkbox so it remains keyboard- and screen-reader-friendly.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => (
    <span className="relative inline-flex">
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className={cn("peer sr-only", className)}
        {...props}
      />
      <span
        aria-hidden
        className={cn(
          "block h-6 w-11 rounded-full bg-input transition-colors duration-(--motion-fast)",
          "peer-checked:bg-primary",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          "peer-disabled:opacity-50",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute start-0.5 top-0.5 size-5 rounded-full bg-card shadow-sm",
          "transition-transform duration-(--motion-fast)",
          "peer-checked:translate-x-5 rtl:peer-checked:-translate-x-5",
        )}
      />
    </span>
  ),
);
Switch.displayName = "Switch";
