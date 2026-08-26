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

const warnedKeys = new Set<string>();

// Last-resort text for a key missing from every dictionary: drop the
// namespace segment (plus an optional "tag_") and space out the rest, so
// users see "army" rather than "rights_tag_army" (TED-117).
function humanizeKey(key: string): string {
  const stripped = key.replace(/^[a-z0-9]+_(?:tag_)?/, "");
  return (stripped || key).replace(/_/g, " ");
}

export function t(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const dict = dictionaries[locale];
  const fallback = dictionaries.he;
  let raw = dict?.[key] ?? fallback?.[key];
  if (raw === undefined) {
    if (process.env.NODE_ENV !== "production" && !warnedKeys.has(key)) {
      warnedKeys.add(key);
      console.warn(`[i18n] missing message key "${key}" (locale: ${locale})`);
    }
    raw = humanizeKey(key);
  }
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (_, name) =>
    vars[name] !== undefined ? String(vars[name]) : `{${name}}`,
  );
}
