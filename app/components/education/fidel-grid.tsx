// The interactive Ge'ez fidel chart (TED-147) — the share magnet of
// /education/amharic.
//
// ── Bundle discipline ─────────────────────────────────────────────────────
// The client-bundle budget is 400 kB with very little headroom, so this
// component is written to cost as little as possible while still being
// genuinely interactive:
//
//   * All 238 glyphs are *generated* from 34 code points (see ~/lib/education/fidel).
//   * Every label arrives as a prop from the loader — this file carries no copy,
//     so nothing here is paid for three times over.
//   * One click handler on the grid wrapper, not 238. React events bubble, so
//     delegation costs one closure instead of 238 and keeps hydration cheap.
//   * No portal, no animation library, no icon set.
//
// ── Progressive enhancement ───────────────────────────────────────────────
// The full chart renders server-side and is complete and readable with no
// JavaScript at all — every cell shows its glyph and its romanisation. The
// detail panel is an enhancement that appears once a cell is chosen.
//
// ── Direction and typography ──────────────────────────────────────────────
// Ge'ez is an LTR script (ADR-008) embedded in a page that is RTL under `he`.
// The grid is therefore forced `dir="ltr"` so the vowel orders read left to
// right in the traditional sequence, in every locale. `lang="am"` on the same
// wrapper picks up the Noto Sans Ethiopic face via the `[lang="am"]` rule in
// app.css.

import { useState } from "react";

import {
  FIDEL_ORDERS,
  FIDEL_ROWS,
  fidelChar,
  fidelLatin,
  type FidelRow,
} from "~/lib/education/fidel";

export interface FidelGridLabels {
  /** Heading above the chart. */
  heading: string;
  /** One-line explanation + interaction hint. */
  intro: string;
  /** Placeholder in the detail panel before anything is chosen. */
  hint: string;
  /** Label for the consonant of the selected cell. */
  consonantLabel: string;
  /** Label for the vowel order of the selected cell. */
  orderLabel: string;
  /** Accessible name for the row-header column. */
  rowHeaderLabel: string;
}

interface Selection {
  row: FidelRow;
  order: number;
}

export function FidelGrid({ labels }: { labels: FidelGridLabels }) {
  const [selected, setSelected] = useState<Selection | null>(null);

  // One delegated handler for all 238 cells. Cell coordinates ride on the
  // button's `data-cell` attribute as "rowIndex:orderIndex".
  function handleGridClick(event: React.MouseEvent<HTMLDivElement>) {
    const target = (event.target as HTMLElement).closest("[data-cell]");
    if (!target) return;
    const [rowIndex, order] = (target.getAttribute("data-cell") ?? "")
      .split(":")
      .map(Number);
    const row = FIDEL_ROWS[rowIndex!];
    if (!row || order === undefined || Number.isNaN(order)) return;
    setSelected({ row, order });
  }

  return (
    <section className="mb-10" aria-labelledby="fidel-heading">
      <h2
        id="fidel-heading"
        className="mb-2 font-display text-xl font-semibold text-earth-900"
      >
        {labels.heading}
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-ink-700">{labels.intro}</p>

      {/* Detail panel — the enhancement. Reserves its height so choosing a
          character does not shift the chart underneath it. */}
      <div
        className="mb-4 flex min-h-24 items-center gap-5 rounded-2xl border border-earth-300 bg-earth-50 px-5 py-4"
        aria-live="polite"
      >
        {selected ? (
          <>
            <span
              lang="am"
              dir="ltr"
              className="font-display text-6xl leading-none text-earth-900 tabular-nums"
            >
              {fidelChar(selected.row, selected.order)}
            </span>
            <div className="min-w-0">
              <p dir="ltr" className="text-start font-display text-2xl text-earth-800">
                {fidelLatin(selected.row, selected.order)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                {labels.consonantLabel}:{" "}
                <span dir="ltr" className="font-medium">
                  {selected.row.latin}
                </span>
                {" · "}
                {labels.orderLabel}:{" "}
                <span lang="am" dir="ltr" className="font-medium">
                  {FIDEL_ORDERS[selected.order]!.geez}
                </span>{" "}
                <span dir="ltr" className="text-ink-500">
                  ({FIDEL_ORDERS[selected.order]!.latin})
                </span>
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-ink-500">{labels.hint}</p>
        )}
      </div>

      {/* The chart. Scrolls inside its own container on narrow screens so the
          page body never scrolls sideways. */}
      <div className="overflow-x-auto rounded-2xl border border-earth-200 bg-card">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions --
            every interactive descendant is a real <button>, which carries its
            own keyboard semantics; this wrapper only delegates their clicks. */}
        <div onClick={handleGridClick}>
          <table dir="ltr" className="w-full border-collapse text-center">
            <caption className="sr-only">{labels.heading}</caption>
            <thead>
              <tr>
                <th scope="col" className="px-2 py-2 text-xs text-ink-500">
                  <span className="sr-only">{labels.rowHeaderLabel}</span>
                </th>
                {FIDEL_ORDERS.map((order) => (
                  <th
                    key={order.geez}
                    scope="col"
                    className="px-1 py-2 text-xs font-medium text-ink-600"
                  >
                    <span lang="am" className="block text-sm text-earth-800">
                      {order.geez}
                    </span>
                    <span className="block text-ink-500">-{order.vowel}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FIDEL_ROWS.map((row, rowIndex) => (
                <tr key={row.base} className="border-t border-earth-100">
                  <th
                    scope="row"
                    className="px-2 py-1 text-xs font-medium text-ink-600"
                  >
                    {row.latin}
                  </th>
                  {FIDEL_ORDERS.map((_, order) => (
                    <td key={order} className="p-0.5">
                      <button
                        type="button"
                        data-cell={`${rowIndex}:${order}`}
                        aria-label={fidelLatin(row, order)}
                        className="flex w-full flex-col items-center rounded-md px-1 py-1 transition hover:bg-earth-100 focus-visible:ring-2 focus-visible:ring-earth-600 focus-visible:outline-none"
                      >
                        <span
                          lang="am"
                          aria-hidden="true"
                          className="font-display text-xl leading-tight text-earth-900"
                        >
                          {fidelChar(row, order)}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-[10px] leading-tight text-ink-500"
                        >
                          {fidelLatin(row, order)}
                        </span>
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
