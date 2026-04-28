// URL-safe slugifier (TED-21).
//
// Strips diacritics, lowercases, collapses non-alphanumerics to `-`, trims
// stray dashes and caps at 80 chars to match the validation regex used for
// agency slugs (`/^[a-z0-9-]+$/`).

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip combining marks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
