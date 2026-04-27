import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
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
  registerTab: (value: string, el: HTMLButtonElement | null) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>, value: string) => void;
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
  const setValue = useCallback(
    (v: string) => {
      if (valueProp === undefined) setInternal(v);
      onValueChange?.(v);
    },
    [valueProp, onValueChange],
  );

  // Maintain insertion-order list of registered triggers for arrow nav.
  const triggers = useRef<Array<{ value: string; el: HTMLButtonElement }>>([]);
  const registerTab = useCallback((v: string, el: HTMLButtonElement | null) => {
    const list = triggers.current;
    const existing = list.findIndex((t) => t.value === v);
    if (el) {
      if (existing >= 0) list[existing] = { value: v, el };
      else list.push({ value: v, el });
    } else if (existing >= 0) {
      list.splice(existing, 1);
    }
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, current: string) => {
      const list = triggers.current;
      if (list.length === 0) return;
      const idx = list.findIndex((t) => t.value === current);
      if (idx < 0) return;

      let nextIdx: number | null = null;
      if (e.key === "ArrowRight") nextIdx = (idx + 1) % list.length;
      else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + list.length) % list.length;
      else if (e.key === "Home") nextIdx = 0;
      else if (e.key === "End") nextIdx = list.length - 1;

      if (nextIdx === null) return;
      const next = list[nextIdx];
      if (!next) return;
      e.preventDefault();
      setValue(next.value);
      next.el.focus();
    },
    [setValue],
  );

  return (
    <Ctx.Provider value={{ value, setValue, baseId, registerTab, onKeyDown }}>
      <div className={cn("w-full", className)}>{children}</div>
    </Ctx.Provider>
  );
}

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
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
      onKeyDown={(e) => ctx.onKeyDown(e, value)}
      ref={(el) => ctx.registerTab(value, el)}
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
