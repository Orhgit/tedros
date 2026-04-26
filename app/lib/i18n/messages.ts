import he from "../../../messages/he.json";
import en from "../../../messages/en.json";
import am from "../../../messages/am.json";
import type { Locale } from "./config";

type MessageDict = Record<string, string>;

const dictionaries: Record<Locale, MessageDict> = {
  he: he as MessageDict,
  en: en as MessageDict,
  am: am as MessageDict,
};

export function t(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const dict = dictionaries[locale];
  const fallback = dictionaries.he;
  const raw = dict?.[key] ?? fallback?.[key] ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (_, name) =>
    vars[name] !== undefined ? String(vars[name]) : `{${name}}`,
  );
}
