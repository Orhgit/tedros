# ADR-008: Amharic runs LTR — locking direction for HE / EN / AM

**Status**: Accepted (2026-04-27).
**Owner**: Tedros Architect.
**Supersedes**: D1 in [ADR-000](../discovery/adr/ADR-000-foundations.md) where it states "Amharic (RTL, Ge'ez script)".
**Related**: [TED-15](https://multica.ai) (Phase 2 design system, where the implementation landed); [TED-19](https://multica.ai) (this ADR).

## Context

ADR-000 D1 and the project README both stated **"Amharic (RTL, Ge'ez script)"**. That is wrong: Ge'ez (Ethiopic, ኣማርኛ) is an **LTR** script per the Unicode Bidirectional Algorithm (UAX #9). All Ge'ez code points belong to the bidi class **L** (left-to-right), the same class as Latin. Amharic publications, websites, and Wikipedia all read left-to-right; reading right-to-left is unattested as a norm in modern usage and conflicts with the Unicode spec.

The error originated in Phase 0 from a faulty assumption that "non-Latin script + community shared with Israel ⇒ RTL like Hebrew." That conflated *script directionality* with *reader population*, which is incorrect: directionality is a property of the script, not of the audience.

Phase 2 (TED-15) shipped the correct behavior already in code:

- `app/lib/i18n/config.ts` — `LOCALE_DIRECTION = { he: "rtl", en: "ltr", am: "ltr" }`.
- `app/app.css` — `html[lang^="am"] { font-family: var(--font-ethiopic); line-height: 1.7; }`. No `dir` flip.

So the implementation is correct; the **documentation** still claims RTL. This ADR locks the decision in writing, so future contributors don't re-introduce the original mistake by trusting the prose in ADR-000 or the README.

## Decision

**Amharic (`am`) runs in LTR.** The three supported locales lock as follows and no route, layout, or component is permitted to override on the basis of locale alone:

| Locale | Script   | `dir`   | `lang` (HTML) | Font stack base       |
| ------ | -------- | ------- | ------------- | --------------------- |
| `he`   | Hebrew   | **rtl** | `he-IL`       | Heebo                 |
| `en`   | Latin    | **ltr** | `en`          | Inter                 |
| `am`   | Ge'ez    | **ltr** | `am-ET`       | Noto Sans Ethiopic    |

### How direction is set

`<html dir="…" lang="…">` is written by `app/root.tsx` from `LOCALE_DIRECTION[locale]` and `LOCALE_HTML_LANG[locale]` in `app/lib/i18n/config.ts`. The map is the **single source of truth** for directionality. Components do not read the locale to flip — they consume `dir` via Tailwind logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `inset-inline-*`) and the `[dir="rtl"]` selector when a true mirror is needed (e.g. `.icon-flip`).

### Typography, not direction, is what differentiates `am`

Ge'ez glyphs are taller and visually denser than Latin or Hebrew. The Phase 2 design system addresses this with **typography**, not direction:

- `--font-ethiopic` token (`Noto Sans Ethiopic`, `Nyala`, `Abyssinica SIL`, fallbacks).
- `html[lang^="am"]` selector applies `font-family: var(--font-ethiopic)` and `line-height: 1.7` (vs. 1.5 default).
- No `dir` change. No layout flip. No mirrored icons under `am`.

### `useGeezReadingOrder` — opt-in escape hatch (deferred)

A future React hook **`useGeezReadingOrder()`** is reserved as an **opt-in** mechanism for the rare case of liturgical/religious Ge'ez where bidirectional or vertical reading hints may be desired (e.g. quoted scripture in Sigd content). It is **not** the default and is **not** implemented in Phase 2. When the need surfaces (likely Phase 4, Rights Hub or community/cultural content), the hook MUST be opt-in at the component level — never globally on `am`.

The contract for that future hook (specified here so Engineer can implement it consistently):

- Lives in `app/lib/i18n/geez.ts`.
- Returns `{ dir, bidiOverride, lineHeight }` for a wrapped subtree, never mutates `<html>`.
- Default behavior: same as page locale (no override).
- Caller opts in explicitly: `<div {...useGeezReadingOrder({ liturgical: true })}>…</div>`.

Until that need arises, the hook does not exist. Do not add it speculatively.

## Consequences

### Code-level

- All routes under `/am/*` render `<html dir="ltr" lang="am-ET">`.
- No `[dir="rtl"]` styles apply on `am` pages — RTL-specific tweaks (icon flip, RTL-only spacing overrides, `unicode-bidi: plaintext` rule on `html[dir="rtl"]`) only fire under `he`.
- Typography stack on `am` includes `Noto Sans Ethiopic` and uses leading **1.7** to compensate for taller glyphs. Engineer should preload this font for `/am/*` to keep LCP within budget.
- Page templates (header, footer, navigation, listing card) do **not** branch on `locale === "am"` for layout — they branch on `dir` from `useDirection()` (or equivalent), and `dir` is derived from `LOCALE_DIRECTION`.
- Storybook stories for `am` use the LTR canvas, not the RTL canvas.

### Test/QA

- QA must add a regression test: `/am/` returns HTML with `dir="ltr"`.
- axe scans must include `/am/*` routes and verify reading order matches LTR.
- A visual regression snapshot per locale × theme: `(he, ltr) × (en, ltr) × (am, ltr) × (light, dark)` — six total, not eight.

### Documentation

- README D1 reference and the ADR-000 Consequences section are updated to point here.
- Phase 0 docs that pre-date this correction (`docs/discovery/0.0-summary.md`, `docs/discovery/adr/ADR-001-stack.md` Context section) are **not** rewritten — they are historical Phase 0 artifacts. ADR-000's correction note + this ADR are the authoritative source going forward.

### Risk register

- R3 in `docs/discovery/risk-register.md` ("Ge'ez RTL less supported") wording is **inaccurate**; Ge'ez is LTR. Risk reframes to **font availability + translation quality**, both of which are real. Designer/Data should retitle on next risk-register pass.

## Alternatives Considered

### Alt 1 — Keep Amharic as RTL (status quo of ADR-000 prose)

Rejected. Violates Unicode UAX #9 (Ge'ez code points are bidi class L). No precedent in Amharic publishing, native software, or community-led websites. Would force every component to flip back to LTR locally for any `am` line — a layout maintenance burden for zero gain. Existing Amharic readers expect LTR; serving RTL would degrade comprehension and SEO (search engines rely on `dir`/`lang` correctness for relevance).

### Alt 2 — Use `auto` direction on `am` and let the browser decide

Rejected. `dir="auto"` is a per-element fallback for unknown content (UGC); it is the wrong tool for a known locale. Setting it at `<html>` produces inconsistent layout on identical pages depending on first-strong character, breaks SSR determinism (search engines see different `dir` than users), and prevents reliable visual regression testing.

### Alt 3 — Force `am` to LTR but mirror navigation RTL "to feel like he"

Rejected. Visually-mirrored navigation under LTR text is disorienting and inaccessible (focus order does not match visual order). Hebrew speakers who also read Amharic switch locales explicitly; they don't need a hybrid layout, and forcing one harms screen-reader ordering.

### Alt 4 — Skip the ADR; just fix the README

Rejected. The error lives in **two** Phase 0 sources of truth (ADR-000 D1 and README) and likely in agent prompts and onboarding for future contributors. A standalone ADR is the durable artifact that future Architect and PM agents will see when they re-read the directional decisions. The cost of an ADR is low; the cost of re-litigating this in Phase 4 when religious content arrives is high.

## Implementation checklist (Engineer)

This ADR is documentation-only. Implementation already shipped in TED-15. Nothing to write, but Engineer should verify on next touch:

- [x] `LOCALE_DIRECTION.am === "ltr"` in `app/lib/i18n/config.ts`
- [x] `html[lang^="am"]` rule in `app/app.css` sets `font-ethiopic` + leading 1.7, no `dir` change
- [x] `app/root.tsx` writes `dir` from `LOCALE_DIRECTION` (not from `locale === "he"`)
- [ ] Engineer adds a unit test asserting `LOCALE_DIRECTION.am === "ltr"` so a future regression fails CI
- [ ] QA adds an `/am/*` axe + reading-order check to the Phase 3 regression suite

## Change Log

- 2026-04-27 v1: Initial. Architect correcting Phase 0 D1.
