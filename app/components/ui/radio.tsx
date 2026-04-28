import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="radio"
      className={cn(
        "size-4 border border-input text-primary",
        "accent-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Radio.displayName = "Radio";
