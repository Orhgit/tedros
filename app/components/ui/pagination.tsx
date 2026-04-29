import { cn } from "~/lib/utils";

export interface PaginationProps {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => string;
  className?: string;
  ariaLabel?: string;
  /** Visible window of pages around current. */
  window?: number;
}

export function Pagination({
  page,
  pageCount,
  hrefFor,
  className,
  ariaLabel = "Pagination",
  window = 1,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages: Array<number | "ellipsis"> = [];
  const add = (n: number) => pages.push(n);

  add(1);
  const startWindow = Math.max(2, page - window);
  const endWindow = Math.min(pageCount - 1, page + window);
  if (startWindow > 2) pages.push("ellipsis");
  for (let i = startWindow; i <= endWindow; i++) add(i);
  if (endWindow < pageCount - 1) pages.push("ellipsis");
  if (pageCount > 1) add(pageCount);

  return (
    <nav aria-label={ariaLabel} className={cn("flex justify-center", className)}>
      <ul className="flex items-center gap-1">
        <li>
          <a
            href={page > 1 ? hrefFor(page - 1) : undefined}
            aria-disabled={page <= 1}
            className={cn(
              "inline-flex h-9 items-center rounded-sm border border-border bg-card px-3 text-sm",
              "hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              page <= 1 && "pointer-events-none opacity-50",
            )}
          >
            <span className="icon-flip" aria-hidden>
              ←
            </span>
            <span className="ms-1">קודם</span>
          </a>
        </li>
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <li key={`e${i}`} aria-hidden className="px-2 text-muted-foreground">
              …
            </li>
          ) : (
            <li key={p}>
              <a
                href={hrefFor(p)}
                aria-current={p === page ? "page" : undefined}
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-sm border text-sm",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  p === page
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-muted",
                )}
              >
                {p}
              </a>
            </li>
          ),
        )}
        <li>
          <a
            href={page < pageCount ? hrefFor(page + 1) : undefined}
            aria-disabled={page >= pageCount}
            className={cn(
              "inline-flex h-9 items-center rounded-sm border border-border bg-card px-3 text-sm",
              "hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              page >= pageCount && "pointer-events-none opacity-50",
            )}
          >
            <span className="me-1">הבא</span>
            <span className="icon-flip" aria-hidden>
              →
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
