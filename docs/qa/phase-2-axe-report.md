# Phase 2 — axe-core AA report

**Issue:** TED-18 · **Branch:** `agent/tedros-qa/afc9c904` · **Designer PR:** `agent/tedros-designer/66b6e129` (`0fc2549`)
**Stack under test:** `pnpm start` (RR7 production server) at `http://localhost:4173`
**Tooling:** `@playwright/test@1.59` + `@axe-core/playwright@4.11` (axe-core 4.11), Chromium 1217.
**Tags:** `wcag2a wcag2aa wcag21a wcag21aa`.
**Spec:** [`tests/a11y/axe.spec.ts`](../../tests/a11y/axe.spec.ts) · matrix in [`tests/a11y/matrix.ts`](../../tests/a11y/matrix.ts)
**Run:** `pnpm a11y` (see `package.json` script). Per-cell JSON dropped to `qa/axe-results/`.

## Verdict — ❌ DoD not met (4 distinct AA rule failures)

| Bucket                                                | Result                |
| ----------------------------------------------------- | --------------------- |
| 10 stories × {he-light, he-dark, en-light} = 30 scans | **15 pass · 15 fail** |
| 3 routes × {light, dark} = 6 scans                    | **0 pass · 6 fail**   |
| **Total**                                             | **15 pass · 21 fail** |

The DoD line "axe scan: 0 AA violations on 13 stories/routes" is **not met**. Three of the four root-cause defects are token-level (color contrast across the muted/primary/success/destructive-tinted variants); one is a critical structural defect in `<FormField>`/`<FormControl>` that breaks every form on the site.

## Stories — story × locale × theme

| Story           |              he-light | he-dark | en-light |
| --------------- | --------------------: | ------: | -------: |
| Button          | **1** · **1** · **1** |
| Input           |             0 · 0 · 0 |
| Form            | **1** · **1** · **1** |
| Dialog          |             0 · 0 · 0 |
| NavMenu         |             0 · 0 · 0 |
| ListingCard     | **1** · **1** · **1** |
| Hero            |             0 · 0 · 0 |
| ArticleTemplate |             0 · 0 · 0 |
| ProfileTemplate | **1** · **1** · **1** |
| LeadForm        | **2** · **2** · **2** |

## Full design routes — `/{lang}/design`

| Route      |         light | dark |
| ---------- | ------------: | ---: |
| /he/design | **4** · **4** |
| /en/design | **4** · **4** |
| /am/design | **4** · **4** |

## Violation rollup (failing nodes across all 36 scans)

| Rule                   | Impact   | Failing nodes | WCAG               |
| ---------------------- | -------- | ------------: | ------------------ |
| `color-contrast`       | serious  |           183 | 2 AA · 1.4.3       |
| `label`                | critical |             9 | 2 A · 4.1.2, 1.3.1 |
| `select-name`          | critical |             9 | 2 A · 4.1.2        |
| `aria-prohibited-attr` | serious  |             6 | 2 A · 4.1.2        |

Counts are deduplicated per `(rule, node)` pair across the matrix; the same physical chip on `/he/design` therefore contributes once per scan it appears in. Rule rollups are stable across light/dark and across locales (no locale-specific defects detected).

---

## Findings

### 🔴 BLOCKER 1 — `label` / `select-name` · `<FormField>` does not wire the label to the control · WCAG 4.1.2

**Where:** `app/components/ui/form.tsx` (`FormLabel`, `FormControl`).
**Cited nodes (de-duped):**

- `<input type="text" name="phone" aria-invalid="true" required value="abc">` — playground "Form composition" demo (`#form`)
- `<select name="preferred_language" required>` — `LeadForm` (`#lead`)
- `<input name="name">`, `<input name="phone" type="tel">`, `<input name="email" type="email">`, `<textarea name="message">` — `LeadForm` (`#lead`)

**Root cause.** `FormLabel` does `<label htmlFor={fieldId}>` where `fieldId` is `f-${useId()}`, but `FormControl` only sets that id on a wrapper `<div data-field-id="...">` and never on the actual `<Input>` / `<Select>` / `<Textarea>` child:

```tsx
// FormLabel — sets htmlFor to "f-:r0:" (form.tsx:60-62)
<label htmlFor={fieldId} ...>{children}{required && "*"}</label>

// FormControl — id stays on the wrapper div, never reaches the control (form.tsx:76-90)
<div data-field-id={fieldId} data-described-by={...} data-invalid={...}>
  {children}            {/* <Input>, <Select>, <Textarea> render WITHOUT id */}
</div>
```

Result: the `for` attribute references an id that doesn't exist anywhere in the DOM, the control has no accessible name, and `<FormDescription>` / `<FormMessage>` are equally orphaned (no `aria-describedby` link).

**Why it's a blocker.** This is a **critical** axe rule; failing screen readers will read the input as just its type ("text edit", "phone, edit"), and it kills the entire `LeadForm` page-level template — which is one of the four ATAG-listed deliverables of Phase 2.

**Fix sketch (1 file, ~30 lines).** Either:

- Render `<FormControl>` via `React.cloneElement(child, { id, "aria-describedby", "aria-invalid", required: child.props.required })`, or
- Drop the wrapper div and have each input primitive consume `useFormField()` itself (cleaner long-term, but touches every primitive).

The first option is what the inline TODO already gestures at (`form.tsx:78-80`).

### 🔴 BLOCKER 2 — `color-contrast` · semantic-tinted variants fail AA · WCAG 1.4.3

**Where:** `tokens.json` + `app.css` semantic tokens, exercised by **all** of:

- `Badge` variants `primary`, `success`, `destructive`, `sigd` (`badge.tsx:9-17`)
- `Alert` body text variants `success`, `destructive` (`alert.tsx:8-15`)
- `Toast` body text variants `success`, `destructive` (`toast.tsx:9-15`)
- `Button` variant `success` (`button.tsx:18`)
- `TabsTrigger` inactive state on `bg-muted` (`tabs.tsx:54, 88-89`)
- `text-muted-foreground` on `bg-muted` (lead-form topic banner, footer copyright, breadcrumb-style links throughout)

**Cited contrast ratios (light theme, axe computed values):**

| Pattern                                                      | Computed FG / BG      | Ratio | Need |
| ------------------------------------------------------------ | --------------------- | ----: | ---: |
| `bg-primary/10 text-primary` (Badge primary, "v0.1")         | `#9d6044` / `#f5e8e0` |  4.17 |  4.5 |
| `bg-success/10 text-success` (Badge success)                 | `#308639` / `#eaecdf` |  3.82 |  4.5 |
| `bg-destructive/10 text-destructive` (Badge destructive)     | `#c92f33` / `#fae3de` |  4.34 |  4.5 |
| `bg-success/8 text-success` (Alert success body)             | `#308639` / `#eeeee2` |  3.90 |  4.5 |
| `bg-destructive/8 text-destructive` (Alert destructive body) | `#c92f33` / `#fbe7e2` |  4.47 |  4.5 |
| `bg-success text-success-foreground` (Button success)        | `#fcfcfc` / `#308639` |  4.45 |  4.5 |
| `bg-muted text-muted-foreground` (Tabs inactive, footer)     | `#76706c` / `#f9ece3` |  4.21 |  4.5 |

These are all near-misses (3.51–4.47 vs the 4.5 AA threshold for body text), but **183 individual nodes fail** because each token is reused everywhere. Fixing the tokens fixes all 183 in one shot.

**Why it's a blocker.** AA contrast is a hard WCAG threshold and the issue spec explicitly calls out "0 AA violations" as DoD.

**Fix sketch (token-level).**

1. **Translucent chip pattern is structurally wrong.** Stop layering `bg-X/10 text-X`: with the brand earth/green/red picks, the alpha-blended background ends up too close to the text. Replace with solid foreground variants (`bg-success text-success-foreground` etc.) for badges + alerts, or darken the text token for soft-fill variants (e.g. add `--color-success-strong: oklch(0.42 0.14 145)` and use it for all chips/alerts/toasts on tinted bg).
2. **Tighten `--color-muted-foreground`.** It is `oklch(0.55 0.01 55)` — bumping to `~0.45` gets the muted/muted-foreground pair past 4.5.
3. **Tighten `--color-success` for the solid Button.** `oklch(0.55 0.14 145)` → `~0.5` on white text reaches ≥ 4.5.

The dark-theme failures are the same set; recomputed dark-mode tokens already address the `*-foreground` pairs but the translucent chip pattern is broken in dark too.

### 🟠 BLOCKER 3 — `aria-prohibited-attr` · `<ToastViewport>` div has `aria-label` without a role · WCAG 4.1.2

**Where:** `app/components/ui/toast.tsx:62-79`.

```tsx
<div aria-label="התראות" className="...">  {/* serious; div has no role */}
```

**Fix.** Either add `role="region"` (or `role="status"` if the viewport itself should announce queue changes — but you already have `role="status"` on each `<Toast>`, so `region` is the right call), or drop `aria-label` and use a visually-hidden `<h2>` heading.

### Stories that passed cleanly (15 / 30)

`Input`, `Dialog`, `NavMenu`, `Hero`, `ArticleTemplate` — across all three locale/theme combos sampled. These are good prior art for Designer to reference when fixing the others.

---

## Notes / not blockers

- **`incomplete` results** (axe couldn't auto-decide): mostly `aria-allowed-role` on the native `<dialog>` element. Manually verified — this is fine, native `<dialog>` is the role.
- **Amharic LTR**: render is correct on `/am/design` light/dark; same 4 violations as the other routes (no AM-specific issue).
- **No `region`, `landmark-unique`, `heading-order`, `image-alt`, `link-name`, `bypass`, or `tabindex` violations** — semantic structure is solid.
- **CI integration** — see `.github/workflows/a11y.yml` (added in this PR). Job currently runs the same matrix and uploads `qa/axe-results/` + `qa/rtl-screenshots/` as artifacts. DevOps owns wiring it into branch protection if/when blockers clear.

## Reproducing locally

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm build
DATABASE_URL='postgres://x:y@localhost:5432/z' \
AUTH_SECRET='ci-only-placeholder-secret-do-not-use-in-prod-32+chars' \
PORT=4173 PUBLIC_URL=http://localhost:4173 NODE_ENV=production pnpm start &
pnpm exec playwright test tests/a11y/axe.spec.ts
node scripts/summarize-axe.mjs
```

`qa/axe-results/<scope>__<id>__<locale>-<theme>.json` contains every violation node, with html, target selector, computed values, and `failureSummary`.
