# ADR-022: The client budget measures the payload one page downloads, not the sum of every chunk

**Status**: Accepted (2026-09-02).
**Owner**: Tedros DevOps.
**Related**: TED-154 (this decision), TED-153 / ADR-020 §6 (which deferred it here by name), TED-115 (the three budget bumps), `package.json` `size-limit`, `scripts/check-route-chunks.mjs`, `lighthouserc.json`.

## Context

**This ADR changes what the CI size gate protects. It is not a budget raise, and it should not be read as one — but it does stop enforcing something the old gate enforced. §"Consequences" states exactly what is no longer caught.**

ADR-020 §6 left the `size-limit` glob at `build/client/assets/*.js` and said plainly that changing it "is equivalent to raising the limit and is not to be done as a side effect of a content PR. If the metric is to change, that is its own ADR with its own justification." This is that ADR.

### What the old gate measured

`build/client/assets/*.js` is the **sum of all 182 emitted chunks** — the entry, the shared React/Router chunk, the message dictionary, and all 107 lazily-loaded route chunks. On `main` at the time of writing it reports **395.95 kB brotlied against a 400 kB limit: 4.05 kB of headroom.** The next content PR breaches it.

Three things are wrong with that number, and they are separate problems:

**1. It does not describe any user's experience.** No browser ever downloads 395.95 kB. A first-time visitor to `/he` downloads 12 chunks totalling **160.58 kB** brotlied. The heaviest real page in the app — the mortgage calculator — is **176.08 kB**. The reported figure is 2.5× the worst page anyone actually loads.

**2. It makes content growth a build failure.** Every new page emits a route chunk that nobody but that page's visitors will ever fetch, and every one of them counts against the sum. This is what forced 375 → 390 → 400 kB in two days (TED-115), and what put `main` back at 4 kB of headroom eleven days after ADR-020 bought 25 kB of it. The treadmill is structural: the metric grows with the size of the site, and the site is supposed to grow.

**3. It penalises correct work.** ADR-020 measured this directly: splitting `messages/*` per locale would cut ~28 kB from what every real user downloads — the largest single user-facing win available in this repo — and **zero** from the gate, because all three locale chunks still land in `build/client/assets/`. A team optimising against this metric is being steered away from the best available optimisation.

Problem 2 alone would argue for a smarter glob. Problem 3 is the one that makes the metric worse than no metric: it is not merely uninformative, it is pointed the wrong way.

### What Lighthouse CI already covers

`lighthouserc.json` runs 5 passes over `/he`, `/en` and `/am` on every PR and asserts `total-blocking-time ≤ 200 ms`, `largest-contentful-paint ≤ 4000 ms`, `cumulative-layout-shift ≤ 0.1` and `categories:performance ≥ 0.80`. So the **user-perceived cost of the home page** is already gated, on real page loads, in three locales.

That matters for scoping. The size gate should not try to be a second, worse Lighthouse. What Lighthouse does _not_ give us is (a) a stable, attributable byte number that says _which chunk_ grew, (b) any coverage of the ~104 routes it never loads, and (c) a signal that survives runner noise — the performance score coin-flips on shared runners, which is why TED-115 had to drop it from 0.85 to 0.80. Bytes are deterministic; scores are not. The size gate's job is the deterministic byte accounting Lighthouse cannot provide.

## Decision

### 1. `size-limit` budgets the initial payload of two named pages

Each entry lists the **static import closure** of one page: the shell every page loads (`entry.client`, the shared React/Router chunk, the route manifest, `messages`, `root`, the `_lang` layout, `utils`, `jsx-runtime`), the shared components that page reaches, and that page's own route chunk. Dynamic `import()`ed chunks (e.g. `mula-chat`) are excluded — they are not fetched before interactive.

| Entry                                                    | Measured (brotli) | Limit  | Headroom        |
| -------------------------------------------------------- | ----------------- | ------ | --------------- |
| `initial payload — home page (/he)`                      | 160.58 kB         | 172 kB | 11.42 kB (7.1%) |
| `initial payload — mortgage calculator (heaviest route)` | 176.08 kB         | 188 kB | 11.92 kB (6.8%) |

Two entries, not one, because they fail for different reasons. The home page is the shell plus almost nothing, so a regression there is a regression in something **every** page pays for. The calculator is the app's heaviest genuinely-interactive route; it is the entry that notices a form library or a chart dependency arriving.

The calculator entry reads 176.08 kB against a true closure of 175.15 kB. The 0.94 kB difference is a second `registry-*` chunk the glob catches and that page does not load. It is left in, deliberately: the glob is conservative (it fails early rather than late), and narrowing it to a hash-specific name would break on the next build.

The budgets are set at the current honest measurement plus ~7%. That is room for ordinary UI work and is _meant_ to become pressure — the shell is the one place where bytes really are charged to every visitor, so it should be defended, not accommodated.

### 2. `scripts/check-route-chunks.mjs` covers what two named pages cannot

Two budgeted pages leave two blind spots, and both are closed by a script wired into `pnpm size`:

- **A heavy dependency landing on some other route.** No single `_lang.*` route chunk may exceed **20 kB brotlied**. The largest today is the mortgage calculator's at 14.26 kB; the next two are `/design` at 12.22 kB and `agency.listings.new` at 11.36 kB. This is the per-route budget in generic form: it applies to all 107 route chunks including ones that do not exist yet, and it is indifferent to how many of them there are.
- **The globs silently drifting.** An enumerated glob list can go stale — if the build starts emitting a shared chunk under a name no glob matches, the budgeted number quietly understates reality and both entries keep passing. So the script recomputes the real static import closure of each budgeted route from the emitted bundles and **fails if any file in it is not covered by a glob**, naming the file and telling you to add it.

Both failure modes were verified by deliberately breaking them before this ADR was written: padding `_lang.design` to 24.57 kB fails the first check; deleting the `site-header-*` glob fails the second.

### 3. The `*.js` sum is retired, not re-tuned

There is no entry summing all chunks. Keeping one at any limit would keep the treadmill, and keeping one at a slack limit would be a gate that only fires long after the useful signal.

## Consequences

**What the gate now catches that it did not before**

- A regression in the shell — a dependency added to `root`, the `_lang` layout, `site-header`/`site-footer`, `utils`, or `entry.client` — is now measured against a tight budget instead of being lost in a 400 kB sum where 12 kB is 3% noise.
- Per-locale `messages` splitting, or any other real reduction in what a user downloads, now **shows up as a win** (~28 kB off both entries). Under the old metric it scored zero. The metric now points the same direction as the user's interest.
- Any single route chunk over 20 kB fails, on all 107 routes and every future one.

**What it no longer catches — stated plainly**

- **Total bytes served across the whole site.** If 200 new pages each emit a 3 kB route chunk, the client build grows ~600 kB and no gate fires. This is deliberate: that growth costs a visitor nothing, because a visitor loads one route chunk. It does cost CDN storage and cold-cache deploys, which is a hosting concern, not a performance one.
- **Broad, shallow bloat spread thin.** ~2 kB added to each of 107 route chunks — 214 kB — passes both the per-chunk cap and both entries, and would have been caught by the old sum. This is the honest cost of the change. It is a narrow shape of regression (a shared component inlined per-route rather than chunked would do it), it does not degrade any single page much, and the per-chunk cap plus the two entries catch the concentrated version.
- **The mortgage calculator and home page are proxies.** A regression confined to a route with no budget entry and under 20 kB is invisible. If a third route becomes structurally important, it gets its own entry.
- The measured number is now a _floor_ on what some users download: a visitor navigating to a heavy route pays the shell plus that route's chunk, and the second entry is our stand-in for the worst case.

**Costs**

- The glob lists are verbose and must be maintained when the build's shared-chunk naming changes. The drift guard makes that a loud CI failure with the file name in it rather than silent under-measurement — this is the mitigation, and it is the reason the enumerated-glob approach is acceptable at all.
- `pnpm size` now needs `build/client/assets` present with real content, same as before, but also re-brotlies every chunk for the per-route cap (~1 s).

**Before / after, so this is auditable**

| Metric                               | `main` @ 303f989 | Limit  | Headroom |
| ------------------------------------ | ---------------- | ------ | -------- |
| **Old** — sum of all 182 chunks      | 395.95 kB        | 400 kB | 4.05 kB  |
| **New** — home page initial payload  | 160.58 kB        | 172 kB | 11.42 kB |
| **New** — calculator initial payload | 176.08 kB        | 188 kB | 11.92 kB |
| **New** — largest single route chunk | 14.26 kB         | 20 kB  | 5.74 kB  |

No bytes changed in this PR. The build output is byte-identical to `main`; only what is measured changed. The old metric would still say 395.95 kB, and it is 395.95 kB — of which one visitor downloads 160.58.

## Alternatives considered

- **Raise the limit to 425 kB.** The fourth bump. Rejected for the reasons TED-115 and ADR-020 already gave; it does nothing about problems 1 and 3 above.
- **One entry per route (107 budgets).** Maximum precision, unmaintainable in `package.json`, and every new page would need a new entry. The 20 kB per-chunk cap in `check-route-chunks.mjs` gets ~90% of the value with zero per-route maintenance.
- **Budget the shell alone (`entry.client` + shared chunk + `messages`), no route chunk.** Simpler and stable, but it stops being a payload figure — it would report 155 kB for a page that downloads 176 kB, and it would miss a route chunk growing to 60 kB. The per-chunk cap would still catch that, but the headline number should be a number a user experiences.
- **Drop the size gate entirely and lean on Lighthouse.** Rejected: Lighthouse's performance score is noisy enough on shared runners that it was already loosened once (TED-115, 0.85 → 0.80), it only ever loads the home page, and it cannot tell you _which chunk_ grew. Bytes are deterministic and attributable; that is the gate's comparative advantage.
- **Compute the payload dynamically in a `.size-limit.js` config instead of enumerating globs.** Would remove the drift problem at the source rather than guarding against it. Rejected for now because the config would then be program output rather than a reviewable budget — a PR that grows the shell would show no diff. The enumerated list plus a loud drift guard keeps the budget visible in review, which is where it does its work.
- **Gate on gzip of the server build too.** Out of scope; the server bundle is not downloaded by anyone.
