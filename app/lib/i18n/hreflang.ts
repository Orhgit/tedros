import { SUPPORTED_LOCALES, type Locale } from "~/lib/i18n/config";

export function hreflangMeta(publicUrl: string, locale: Locale, path: string) {
  return [
    ...SUPPORTED_LOCALES.map((loc) => ({
      tagName: "link" as const,
      rel: "alternate",
      hrefLang: loc,
      href: `${publicUrl}/${loc}${path}`,
    })),
    {
      tagName: "link" as const,
      rel: "alternate",
      hrefLang: "x-default",
      href: `${publicUrl}/he${path}`,
    },
    {
      tagName: "link" as const,
      rel: "canonical",
      href: `${publicUrl}/${locale}${path}`,
    },
  ];
}
