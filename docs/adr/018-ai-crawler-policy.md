# ADR-018: Explicit allow-list for AI-agent crawlers in robots.txt

**Status**: Accepted (2026-08-19).
**Owner**: Tedros DevOps (robots.txt), Tedros Engineer (implementation).
**Related**: [TED-106](https://linear.app/ringo1/issue/TED-106), [TED-101](https://linear.app/ringo1/issue/TED-101) (SEO/GEO visibility plan), `app/routes/robots[.]txt.tsx`.

## Context

`robots.txt` previously served a single blanket rule — `User-agent: *` / `Allow: /` — which does cover AI-agent crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended, etc.) by default, since none of them were disallowed. Functionally nothing was blocked. But the policy was never a stated decision — it was silence that happened to resolve to "allow."

Tedros's mission is to get the community's rights/benefits/careers/health content in front of people wherever they look, including when they ask an AI assistant instead of searching. A silent default is one accidental config change away from quietly blocking that path (e.g. a future contributor adding `Disallow: /` for a specific bot while "cleaning up" robots.txt, not realizing it cuts off a real acquisition channel).

## Decision

List every major AI-agent crawler explicitly in `app/routes/robots[.]txt.tsx`, each with its own `Allow: /` block, in addition to the blanket `User-agent: *` rule:

- `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` (OpenAI)
- `PerplexityBot`, `Perplexity-User` (Perplexity)
- `ClaudeBot`, `Claude-User` (Anthropic)
- `Google-Extended` (Google's AI-training/Gemini/AI-Overviews opt-in signal, separate from the standard Googlebot directive)

This is redundant with the wildcard rule today — the point is to make the policy legible and intentional, not to change crawling behavior. A future change to any one of these blocks is now a visible, deliberate edit instead of an accidental side effect of touching the wildcard rule.

## Consequences

- No behavior change on deploy — every listed bot was already allowed via the wildcard.
- Future robots.txt edits that would restrict an AI crawler now require touching a named block, making the decision explicit and reviewable in the diff.
- The list will drift as vendors rename or add bots (e.g. a new OpenAI crawler user-agent). This is an accepted maintenance cost — re-check vendor-published crawler lists periodically (OpenAI, Anthropic, Perplexity, Google each publish theirs) rather than treating this list as permanently exhaustive.

## Alternatives considered

1. **Leave the blanket rule as-is, no explicit list.** Rejected: works today, but the decision to welcome AI crawlers stays undocumented and un-reviewable — exactly the ambiguity this ADR exists to remove.
2. **Disallow AI-training crawlers (e.g. `Google-Extended`, `GPTBot`) while allowing AI-_answer_ crawlers.** Rejected: Tedros's content is meant to be found and cited by AI assistants; blocking training crawlers would not meaningfully protect any content asset here (all pages are already public and meant to be indexed) and would work against the GEO/AEO goal.
