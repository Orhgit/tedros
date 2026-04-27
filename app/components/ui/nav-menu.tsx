import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

export interface NavMenuItem {
  label: ReactNode;
  href: string;
  current?: boolean;
}

export interface NavMenuProps {
  items: NavMenuItem[];
  ariaLabel: string;
  className?: string;
}

export function NavMenu({ items, ariaLabel, className }: NavMenuProps) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className={cn("flex items-center gap-1", className)}>
        {items.map((item, i) => (
          <li key={i}>
            <a
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={cn(
                "inline-flex h-9 items-center rounded-sm px-3 text-sm font-medium transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                item.current
                  ? "bg-secondary text-secondary-foreground"
                  : "text-foreground hover:bg-muted",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
