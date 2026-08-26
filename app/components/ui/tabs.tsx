import {
  createContext,
  useContext,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "~/lib/utils";

/**
 * Lightweight tabs, controlled or uncontrolled. Keyboard nav (Arrow keys,
 * Home, End) handled manually since Radix isn't installed.
 */

interface TabsCtx {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
}
const Ctx = createContext<TabsCtx | null>(null);

export function Tabs({
  defaultValue,
  value: valueProp,
  onValueChange,
  className,
  children,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  className?: string;
  children: ReactNode;
}) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue ?? "");
  const value = valueProp ?? internal;
  const setValue = (v: string) => {
    if (valueProp === undefined) setInternal(v);
    onValueChange?.(v);
  };
  return (
    <Ctx.Provider value={{ value, setValue, baseId }}>
      <div className={cn("w-full", className)}>{children}</div>
    </Ctx.Provider>
  );
}

export function TabsList({
  className,
  onKeyDown,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  // Roving tabindex needs actual key handling — the header comment promised
  // Arrow/Home/End but nothing implemented it, so keyboard users could never
  // switch tabs (WCAG 2.1.1, TED-127). Arrows follow the writing direction:
  // "next" is ArrowLeft in RTL and ArrowRight in LTR.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;

    const list = e.currentTarget;
    const tabs = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    if (tabs.length === 0) return;
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    const isRtl = getComputedStyle(list).direction === "rtl";
    const forward = isRtl ? "ArrowLeft" : "ArrowRight";

    let next: number;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else if (e.key === forward) next = (current + 1 + tabs.length) % tabs.length;
    else next = (current - 1 + tabs.length) % tabs.length;

    e.preventDefault();
    tabs[next]?.focus();
    tabs[next]?.click();
  };

  return (
    <div
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex h-10 items-center gap-1 rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("TabsTrigger must be inside <Tabs>");
  const active = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={`${ctx.baseId}-panel-${value}`}
      id={`${ctx.baseId}-tab-${value}`}
      tabIndex={active ? 0 : -1}
      onClick={() => ctx.setValue(value)}
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-sm px-3 text-sm font-medium",
        "transition-all duration-(--motion-fast)",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active
          ? "bg-card text-foreground shadow-xs"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("TabsContent must be inside <Tabs>");
  if (ctx.value !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-tab-${value}`}
      className={cn("mt-4 focus-visible:outline-none", className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
