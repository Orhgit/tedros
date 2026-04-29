import { Fragment, type ReactNode } from "react";
import { cn } from "~/lib/utils";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  ariaLabel?: string;
}

export function Breadcrumb({
  items,
  className,
  ariaLabel = "Breadcrumb",
}: BreadcrumbProps) {
  return (
    <nav aria-label={ariaLabel} className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li>
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="rounded-xs hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={isLast ? "font-medium text-foreground" : undefined}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden className="text-muted-foreground">
                  <span className="icon-flip" aria-hidden>
                    /
                  </span>
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
