import { LOCALE_HTML_LANG, type Locale } from "./config";

/**
 * Localized long date for a raw ISO string (TED-128). The site rendered
 * ISO dates ("2026-03-17") straight into Hebrew UI — this returns
 * "17 במרץ 2026" / "March 17, 2026" / the Amharic equivalent.
 * Falls back to the input when it isn't a parseable date.
 */
export function formatDate(locale: Locale, iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(LOCALE_HTML_LANG[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
