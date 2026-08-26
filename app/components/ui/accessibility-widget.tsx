import { useEffect, useRef, useState } from "react";
import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { cn } from "~/lib/utils";

type FontSize = "normal" | "large" | "xl";

interface A11yState {
  fontSize: FontSize;
  highContrast: boolean;
  reducedMotion: boolean;
}

const DEFAULTS: A11yState = {
  fontSize: "normal",
  highContrast: false,
  reducedMotion: false,
};
const STORAGE_KEY = "tedros-a11y";

function loadState(): A11yState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function applyState(state: A11yState) {
  const html = document.documentElement;
  html.classList.remove("a11y-text-large", "a11y-text-xl");
  if (state.fontSize === "large") html.classList.add("a11y-text-large");
  if (state.fontSize === "xl") html.classList.add("a11y-text-xl");
  html.classList.toggle("a11y-high-contrast", state.highContrast);
  html.classList.toggle("a11y-reduced-motion", state.reducedMotion);
}

interface Props {
  locale: Locale;
}

export function AccessibilityWidget({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Load from localStorage on mount (client-only)
  useEffect(() => {
    const saved = loadState();
    setState(saved);
    applyState(saved);
  }, []);

  // Persist + apply on every state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    applyState(state);
  }, [state]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);

  const update = <K extends keyof A11yState>(key: K, value: A11yState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const reset = () => setState(DEFAULTS);

  const fontSizes: { value: FontSize; label: string }[] = [
    { value: "normal", label: t(locale, "a11y_font_normal") },
    { value: "large", label: t(locale, "a11y_font_large") },
    { value: "xl", label: t(locale, "a11y_font_xl") },
  ];

  return (
    <div className="fixed start-4 bottom-4 z-50 flex flex-col items-start gap-2">
      {/* Panel */}
      {open && (
        <div
          // Non-modal panel: focus is not trapped, so aria-modal would lie to
          // screen readers (TED-122). id matches the trigger's aria-controls.
          id="a11y-panel"
          ref={panelRef}
          role="dialog"
          aria-label={t(locale, "a11y_panel_label")}
          className="w-72 rounded-lg border border-border bg-card shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold text-foreground">
              {t(locale, "a11y_panel_label")}
            </h2>
            <button
              onClick={reset}
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              {t(locale, "a11y_reset")}
            </button>
          </div>

          <div className="space-y-4 p-4">
            {/* Font size */}
            <fieldset>
              <legend className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {t(locale, "a11y_font_size")}
              </legend>
              <div className="flex gap-2">
                {fontSizes.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => update("fontSize", value)}
                    aria-pressed={state.fontSize === value}
                    className={cn(
                      "flex-1 rounded-sm border px-2 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                      state.fontSize === value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-transparent text-foreground hover:bg-muted",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* High contrast */}
            <ToggleRow
              label={t(locale, "a11y_high_contrast")}
              checked={state.highContrast}
              onChange={(v) => update("highContrast", v)}
              id="a11y-contrast"
            />

            {/* Reduced motion */}
            <ToggleRow
              label={t(locale, "a11y_reduced_motion")}
              checked={state.reducedMotion}
              onChange={(v) => update("reducedMotion", v)}
              id="a11y-motion"
            />
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={t(locale, "a11y_open_button")}
        title={t(locale, "a11y_open_button")}
        className="flex size-11 items-center justify-center rounded-full border border-border bg-card shadow-md transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <AccessibilityIcon />
      </button>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
  id,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={id} className="cursor-pointer text-sm text-foreground">
        {label}
      </label>
      <button
        role="switch"
        id={id}
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          checked ? "bg-primary" : "bg-muted",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none inline-block size-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
}

function AccessibilityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      {/* Person with arms out — universal accessibility symbol */}
      <circle cx="12" cy="4" r="1.5" />
      <path d="M7 10h10" />
      <path d="M12 10v10" />
      <path d="M8 20l4-5 4 5" />
    </svg>
  );
}
