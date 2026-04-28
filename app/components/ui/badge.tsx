import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs leading-tight font-medium",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        primary: "bg-primary/10 text-primary",
        success: "bg-success/10 text-success",
        warning: "bg-warning/15 text-earth-900",
        destructive: "bg-destructive/10 text-destructive",
        outline: "border border-border text-foreground",
        sigd: "bg-accent-sigd/10 text-accent-sigd",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
