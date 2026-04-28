import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium whitespace-nowrap transition-colors duration-(--motion-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-earth-600 active:bg-earth-700",
        secondary: "bg-secondary text-secondary-foreground hover:bg-earth-300",
        outline: "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        link: "bg-transparent text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        success: "bg-success text-success-foreground hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
