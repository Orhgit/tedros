// Shared search box for catalog pages (TED-131).
//
// The old pattern called setSearchParams on EVERY keystroke — each key press
// triggered a router navigation + loader revalidation (a server round-trip),
// which made typing stutter and drop characters on mobile. Here the text
// lives in local state (the page filters instantly from it) and the URL is
// synced in the background, debounced, so links stay shareable. The visible
// submit button gives mobile users the affordance they expect and closes the
// on-screen keyboard (results are already filtered live).

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { cn } from "~/lib/utils";

const URL_SYNC_MS = 400;

/** Local search text synced (debounced) to the `q` search param. */
export function useSearchQuery(paramName = "q"): [string, (v: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get(paramName) ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => clearTimeout(timer.current ?? undefined), []);

  const update = (v: string) => {
    setValue(v);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // Read the live query string (not the hook's snapshot) so a tag chip
      // clicked during the debounce window isn't clobbered.
      const params = new URLSearchParams(window.location.search);
      if (v) params.set(paramName, v);
      else params.delete(paramName);
      setSearchParams(params, { replace: true, preventScrollReset: true });
    }, URL_SYNC_MS);
  };

  return [value, update];
}

export interface SearchFieldProps {
  locale: Locale;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}

export function SearchField({
  locale,
  value,
  onChange,
  placeholder,
  className,
}: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      role="search"
      className={cn("flex w-full max-w-md gap-2", className)}
      onSubmit={(e) => {
        // Results already filter live — submitting just dismisses the
        // mobile keyboard so the user sees them.
        e.preventDefault();
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-md border border-input bg-card px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-earth-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-earth-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {t(locale, "search_button")}
      </button>
    </form>
  );
}
