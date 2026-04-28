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
