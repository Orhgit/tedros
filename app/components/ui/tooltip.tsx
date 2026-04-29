import {
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "~/lib/utils";

/**
 * CSS-only tooltip — uses :hover/:focus-within to reveal. No JS state.
 * Wraps a single focusable child.
 */
export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: "top" | "bottom" | "start" | "end";
  className?: string;
}

const sideMap = {
  top: "bottom-full mb-2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2",
  bottom: "top-full mt-2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2",
  start: "end-full me-2 top-1/2 -translate-y-1/2",
  end: "start-full ms-2 top-1/2 -translate-y-1/2",
} as const;

export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const id = useId();
  if (!isValidElement(children)) return children;
  const child = cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, {
    "aria-describedby": id,
  });

  return (
    <span className="group/tooltip relative inline-flex">
      {child}
      <span
        role="tooltip"
        id={id}
        className={cn(
          "pointer-events-none absolute z-(--z-tooltip) rounded-sm bg-foreground px-2 py-1 text-xs whitespace-nowrap text-background shadow-md",
          "opacity-0 transition-opacity duration-(--motion-fast)",
          "group-focus-within/tooltip:opacity-100 group-hover/tooltip:opacity-100",
          sideMap[side],
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}
