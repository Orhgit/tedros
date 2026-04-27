import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "~/lib/utils";

export const toastVariants = cva(
  "pointer-events-auto flex w-full max-w-sm gap-3 rounded-md border p-4 shadow-lg",
  {
    variants: {
      variant: {
        info: "border-border bg-card text-card-foreground",
        success: "border-success/30 bg-success/8 text-success-strong",
        warning: "border-warning/40 bg-warning/15 text-earth-900",
        destructive: "border-destructive/30 bg-destructive/8 text-destructive-strong",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

export interface ToastProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof toastVariants> {
  heading?: ReactNode;
  description?: ReactNode;
  onDismiss?: () => void;
}

export function Toast({
  variant,
  heading,
  description,
  onDismiss,
  className,
  ...props
}: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(toastVariants({ variant, className }))}
      {...props}
    >
      <div className="flex-1">
        {heading && <p className="leading-tight font-semibold">{heading}</p>}
        {description && <p className="mt-1 text-sm">{description}</p>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="סגור"
          className="rounded-xs text-current/70 hover:text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export function ToastViewport({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="region"
      aria-label="התראות"
      className={cn(
        "pointer-events-none fixed end-4 bottom-4 z-(--z-toast) flex max-h-screen w-full max-w-sm flex-col gap-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
