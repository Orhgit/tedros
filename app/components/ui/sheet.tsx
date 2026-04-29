import { forwardRef, type DialogHTMLAttributes, type ReactNode } from "react";
import { cn } from "~/lib/utils";

/**
 * Side sheet, built on <dialog> with side-anchored animation.
 * Use the `side` prop ("start" | "end") which auto-flips for RTL.
 */
export interface SheetProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "title"
> {
  side?: "start" | "end";
  heading?: ReactNode;
}

export const Sheet = forwardRef<HTMLDialogElement, SheetProps>(
  ({ className, side = "end", heading, children, ...props }, ref) => {
    const sidePos =
      side === "end"
        ? "ms-auto end-0 inset-inline-end-0 inset-inline-start-auto rounded-s-xl"
        : "me-auto start-0 inset-inline-start-0 inset-inline-end-auto rounded-e-xl";

    return (
      <dialog
        ref={ref}
        className={cn(
          "fixed inset-0 h-full max-h-none w-[min(28rem,90vw)] bg-card text-card-foreground shadow-lg",
          "p-0 backdrop:bg-foreground/40",
          sidePos,
          className,
        )}
        {...props}
      >
        {heading && (
          <header className="border-b border-border p-6">
            <h2 className="text-lg font-semibold">{heading}</h2>
          </header>
        )}
        <div className="p-6">{children}</div>
      </dialog>
    );
  },
);
Sheet.displayName = "Sheet";
