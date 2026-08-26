// Rights-catalog search matching (TED-126).
//
// The old filter was a plain substring test over title+summary, so typing
// "מלגה" — the exact example in the search box placeholder — returned zero
// results (the seed only ever says "מלגות"). Matching now also tries light
// Hebrew singular/plural stemming, and callers include translated tag labels
// in the haystack.

/** True when `haystack` (lowercased) matches `query`, allowing a loose
 * Hebrew singular/plural match ("מלגה" ↔ "מלגות", "ספר" ↔ "ספרים"). */
export function matchesQuery(haystack: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (haystack.includes(q)) return true;

  const stems = new Set<string>();
  // Query in plural, data in singular (or another inflection).
  if (q.endsWith("ות") || q.endsWith("ים")) stems.add(q.slice(0, -2));
  // Query in singular feminine, data in plural ("מלגה" → "מלג" ⊂ "מלגות").
  if (q.endsWith("ה") || q.endsWith("ת")) stems.add(q.slice(0, -1));

  for (const stem of stems) {
    if (stem.length >= 3 && haystack.includes(stem)) return true;
  }
  return false;
}
