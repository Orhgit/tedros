# ADR-020: Long-form content lives in `.server` modules; `messages/*` is UI chrome only

**Status**: Accepted (2026-08-31).
**Owner**: Tedros DevOps (this decision + the CI budget); Tedros Engineer (route/loader shape); Tedros Content & SEO (where new copy is authored).
**Related**: TED-153 (Linear), TED-115 (the budget bumps this ADR exists to stop), TED-140 (the first attempt at the fix, on the wrong target), TED-137 (the `CHROME`-in-route pattern), `package.json` `size-limit` (the 400 kB gate).

## Context

The `size-limit` client-bundle budget was raised three times in one session — 375 → 390 → 400 kB — every time from content growth alone. At the start of TED-153, `main` measured **397.43 kB brotlied against a 400 kB limit: 2.57 kB of headroom**, so the next content PR breached it. A fourth bump was ruled out.

The received explanation was that `messages/*.json` (he/en/am) ship whole to the client, so every new content string costs three times over. TED-140 acted on that theory by hand-moving long subtitles and disclaimers out of `messages/*` and into server modules (399.02 → 397.43 kB).

**That theory is mostly wrong, and the measurements say so.** Every number below is a real `pnpm build && pnpm size` run on this repo, changing one thing at a time.

### What the 397.43 kB is actually made of

`size-limit` measures `build/client/assets/*.js` — the **sum of all 165 emitted chunks**, not what any one page loads. The top of that sum:

| Chunk                         | brotli  | What it is                          |
| ----------------------------- | ------- | ----------------------------------- |
| `entry.client`                | 52.0 kB | React DOM — irreducible             |
| `messages`                    | 48.0 kB | all 916 keys × he/en/am             |
| `chunk-EVOBXE3Y`              | 38.3 kB | React + React Router — irreducible  |
| `_lang.calculator.mortgage-…` | 14.2 kB | genuinely interactive route         |
| `_lang.design`                | 12.2 kB | design-system gallery               |
| `_lang.agency.listings.new`   | 11.4 kB | genuinely interactive route         |
| `registry` (cities)           | 11.1 kB | **city prose in 3 locales**         |
| `registry` (urban-renewal)    | 9.1 kB  | **neighborhood prose in 3 locales** |
| ~157 further route chunks     | ~201 kB | the long tail                       |

### The four measurements that decided this ADR

1. **Deleting every message value with a Hebrew length ≥ 80 chars** — 82 keys, 46.6 kB of raw value bytes, 35% of the dictionary — saved **3.1 kB brotli**. This is the thing TED-140 spent a PR doing. Long strings compress extremely well; moving them is close to worthless.
2. **Emptying _every_ message value** (keys and structure kept) saved **38.5 kB** — the absolute ceiling for the dictionary, only reachable by removing `t()` from the client entirely.
3. **Deleting `en` + `am` outright** saved **28.4 kB**. Real, but unreachable through code-splitting: three per-locale chunks all sit in `build/client/assets/`, so the metric counts them all. Splitting helps users and does nothing for this gate.
4. **Blanking the prose in the two content registries** saved **9.6 kB and 6.5 kB** — and unlike the dictionary, that content is reachable, because it is addressed by key rather than looked up dynamically.

So the dominant, _actionable_ cost is not `messages/*`. It is **long-form content sitting in modules the client build can reach.**

### Why the registries were reachable at all

Route `meta` functions import `cityName` and `neighborhoodName` from those registries. **`meta` is not stripped from the client bundle** — it runs in the browser on client-side navigation. Importing one short helper from a 73 kB module drags the whole module, prose included, into a client chunk.

### The rule that actually predicts what ships

Not "server-ish code is stripped". Precisely this:

- The React Router Vite plugin strips **`loader` and `action`** from the client route module. Rollup then dead-code-eliminates any module-scope const that only those referenced.
- **`meta`, the default-export component, and module scope are NOT stripped.** Anything they reach ships.

We verified this the expensive way. Moving four loader-only consts (`FAQ_CONTENT` ×2, `RESOURCES`, `CHROME`) into `.server` modules changed the bundle by **exactly zero bytes** — the emitted chunk hashes were byte-identical. The `CHROME` const in `$lang.voice.street-stop.tsx` that TED-137 was flagged for was, in fact, already being tree-shaken; the file's comment claiming it was server-side was right about the outcome and wrong about the mechanism.

## Decision

### 1. Long-form content in three locales lives in a `.server` module, never in a registry or route module that `meta` or a component can reach

Narrative prose — overviews, project statuses, community context, policy text, article bodies, FAQ answers, source lists — lives in a `*.server.ts` module. The `loader` resolves the **single locale being rendered** and passes plain strings through loader data. The component receives resolved strings, not `Record<Locale, string>`.

Applied in TED-153:

| Module                                    | Holds                                                     |
| ----------------------------------------- | --------------------------------------------------------- |
| `app/lib/cities/content.server.ts`        | `overview`, `communityStats` for 39 cities                |
| `app/lib/urban-renewal/content.server.ts` | `status`, `authority`, `communityContext`, notes, sources |
| `app/lib/pages/about-copy.server.ts`      | the /about page copy                                      |
| `app/lib/pages/privacy-copy.server.ts`    | the privacy policy                                        |
| `app/lib/rights/city-faq.server.ts`       | generated rights×city FAQ prose                           |

### 2. A registry splits into a client-safe **index** and a server-only **content** module

`registry.ts` keeps only what a link, a route match, or a `meta` tag needs: slug, short display name, region, coordinates, numeric counts, foreign keys. Everything narrative moves to `content.server.ts`.

Where consumers want the whole record back, the content module exports a `hydrate*` function that re-joins index and content **inside a loader** (see `hydrateNeighborhood`). Types describing the joined shape may stay in the index module — types are erased and cost the bundle nothing.

### 3. `messages/*.json` is for UI chrome — but do NOT hand-migrate existing long strings out of it

`messages/*` is for short, reused interface strings: labels, buttons, headings, nav, badges, error text. Page-specific prose belongs in a `.server` content module from the start.

**This is a forward-looking authoring rule, not a migration order.** Measurement 1 above shows that moving existing long strings out buys ~3 kB for a large, risky diff across 100+ files. Do not spend another PR on it, and do not cite bundle size as the reason to move a string that is already there.

The dictionary also **cannot** currently be split into client and server halves: only 4 of 916 keys are provably server-only, and 51 `t()` call sites take a computed or template-literal key, so static analysis cannot prove any key unreachable. Deleting or relocating keys on that evidence would silently break a locale.

### 4. `meta` must never import a `.server` module

**The build fails outright** — not a runtime error, not a silent regression. `meta` is emitted into the client bundle, so a `.server` import from it is unresolvable.

The way through is always the same: **resolve the strings in `loader`, return them as loader data, read them off `data` in `meta`.** Both are already given the same `data` object.

If `meta` needs a fallback for when the loader produced no data (an error render), inline just those one or two strings in the route module and say why. `$lang.about.tsx`'s `META_FALLBACK` is the worked example: it previously fell back to `COPY[DEFAULT_LOCALE]`, `DEFAULT_LOCALE` is `"he"`, so the same two Hebrew strings are inlined verbatim and the emitted tags are unchanged.

### 5. Do not move loader-only consts for bundle reasons

A `Record<Locale, …>` const referenced only from `loader`/`action` is **already** eliminated. Moving it to `.server` is churn that saves nothing.

It is still reasonable to move one to make the guarantee explicit rather than incidental — a later edit that reads it from the component would silently ship all three locales. Just do not claim a byte saving for it. `app/lib/careers/affirmative-action-body.server.ts` is kept on exactly those grounds, and says so.

### 6. The budget stays at 400 kB and the glob stays as it is

`size-limit`'s path stays `build/client/assets/*.js`. It is an imperfect metric — it sums every lazily-loaded route chunk and all three locales, so no user ever downloads the number it reports, and it would even penalise correct per-locale code-splitting. **Changing the glob is equivalent to raising the limit and is not to be done as a side effect of a content PR.** If the metric is to change, that is its own ADR with its own justification.

## Consequences

**Good**

- 397.43 kB → **374.65 kB** brotlied. Headroom went from **2.57 kB to 25.35 kB** — roughly ten times the room, without touching the limit.
- The two registries left the client bundle entirely; their chunks no longer appear in `build/client/assets/`.
- Users now download one locale of city and neighborhood prose instead of three, on every page that shows it — a real user-facing win the gate cannot even see.
- The rule is now mechanical and testable, so content PRs stop being a guessing game about what ships.

**Costs and limits**

- Loaders get longer: every page rendering long-form content resolves it explicitly. That is the price of the guarantee.
- Content is now in two files per domain (index + content), and adding a city means editing both.
- `hydrate*` must be called in a loader. Calling it from a component would import a `.server` module and fail the build — which is the intended guardrail, but is a sharp edge.
- **The ≥30 kB headroom target set in TED-153 was not reached — this PR lands at 25.35 kB.** The remaining honest levers were measured and deliberately not taken:
  - **`/design` (12.2 kB)** — a design-system gallery with no inbound link anywhere in the app. Excluding it from the production build clears the target on its own (→ ~362 kB, ~38 kB headroom) but makes a live URL 404, so it needs owner sign-off, not a DevOps decision.
  - **49 message keys (~11.6 kB raw) have no literal mention anywhere in `app/`, `tests/` or `scripts/`** and match none of the 17 dynamic `t()` prefixes. They are _probably_ dead, but several `t()` call sites take a plain variable key, so this cannot be proven statically. Worth its own issue with Content & SEO; not worth guessing at here.
  - The long tail of ~157 route chunks (~201 kB) is mostly JSX and Tailwind class strings, not extractable content.

## Alternatives considered

- **Raise the budget to 425 kB.** Rejected — this is the fourth-bump path the issue exists to close, and it hides the problem rather than measuring it.
- **Change the `size-limit` glob to the entry chunk only.** Honest in principle (the current metric genuinely does not describe any user's download) but equivalent to raising the limit, and it would have masked the two registries entirely. Deferred to its own ADR.
- **Split `messages/*` per locale with a dynamic import.** Would cut ~28 kB from what every real user downloads — the single biggest user-facing win available — but **zero** from this gate, since all three chunks still land in `build/client/assets/`. Worth doing for users; it must not be sold as budget relief.
- **Deliver the dictionary as root-loader data instead of a JS module.** Removes 48 kB from the metric and makes things _worse_ for users: all 916 keys would then be inlined into the HTML payload of every page. Gaming the metric; rejected.
- **Hand-migrate the 82 long message strings (TED-140's approach), continued.** Measured at 3.1 kB for a diff across 100+ files. Poor return, high regression risk; explicitly stopped by §3.
