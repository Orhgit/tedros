export const SUPPORTED_LOCALES = ["he", "en", "am"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "he";

export const LOCALE_DIRECTION: Record<Locale, "rtl" | "ltr"> = {
  he: "rtl",
  en: "ltr",
  am: "ltr",
};

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  he: "he-IL",
  en: "en",
  am: "am-ET",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
