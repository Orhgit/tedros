import { DEFAULT_LOCALE, isLocale } from "./config";

// First segments like "fr" or "pt-br" are unsupported language tags the user
// meant as a locale; anything else ("rights", "careers"…) is a real section
// path shared without a locale prefix.
const LOCALE_LIKE = /^[a-z]{2}(?:-[a-z0-9]{2,8})?$/i;

/**
 * Target for a URL whose first segment is not a supported locale:
 * - `/rights/x` → `/he/rights/x` (prefix the default locale)
 * - `/fr/rights` → `/he/rights` (swap the unsupported language tag)
 * Returns null when the path already starts with a supported locale (or is
 * empty), so callers can 404 instead of redirect-looping.
 */
export function localePrefixTarget(pathname: string, search = ""): string | null {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (!first || isLocale(first)) return null;
  const rest = LOCALE_LIKE.test(first) ? segments.slice(1) : segments;
  return `/${[DEFAULT_LOCALE, ...rest].join("/")}${search}`;
}
