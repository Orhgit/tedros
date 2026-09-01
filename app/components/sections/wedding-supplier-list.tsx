// Shared presentation for a list of verified wedding suppliers (TED-143).
//
// Used by both the category page and the category × city page, so the
// verification affordances — source link, check date, dated badge, per-entry
// caveat — are rendered identically everywhere and cannot drift apart.
// Everything arrives pre-localized from the loader; this component holds no
// content of its own.

export interface PresentedSupplier {
  name: string;
  area: string;
  offers: string;
  sourceUrl: string;
  sourceLabel: string;
  sourceYear: number | null;
  checkedAt: string;
  confidence: "current" | "dated";
  note: string | null;
}

export interface SupplierListLabels {
  /** e.g. "מקור ותאריך בדיקה" */
  source: string;
  /** Badge text for a `dated` entry. */
  datedBadge: string;
  /** e.g. "נבדק ב-" */
  checkedPrefix: string;
}

export function WeddingSupplierList({
  suppliers,
  labels,
}: {
  suppliers: PresentedSupplier[];
  labels: SupplierListLabels;
}) {
  return (
    <ul className="space-y-4">
      {suppliers.map((s) => (
        <li key={s.sourceUrl} className="rounded-2xl border border-earth-200 bg-card p-5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold text-earth-900">
              {s.name}
            </h3>
            {s.confidence === "dated" && (
              <span className="rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                {labels.datedBadge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink-700">{s.area}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">{s.offers}</p>
          {s.note && (
            <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
              {s.note}
            </p>
          )}
          <p className="mt-3 text-xs text-ink-500">
            {labels.source}:{" "}
            <a
              href={s.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ink-700"
            >
              {s.sourceLabel}
              {s.sourceYear ? ` (${s.sourceYear})` : ""}
            </a>
            {" · "}
            {labels.checkedPrefix}
            {s.checkedAt}
          </p>
        </li>
      ))}
    </ul>
  );
}
