# ADR-000: Foundations

**Status**: Draft (pending Phase 0 sign-off).
**Date**: 2026-04-26.
**Owner**: Vega (until Tedros Architect agent exists).

## Context

Foundational decisions that shape every later phase. Locked here so subsequent ADRs (data model, auth, i18n, SEO architecture, etc.) inherit a stable base.

## Decisions LOCKED

### D1 — Languages
**Hebrew (RTL) + English (LTR) + Amharic (RTL, Ge'ez script)** — supported from day one.

Implications: i18n architecture is non-negotiable from Phase 1. Routing under `/he`, `/en`, `/am`. hreflang per page. Font loading strategy includes Heebo (HE), Inter (EN), Noto Sans Ethiopic (AM).

### D2 — Real-estate scope
**All types**: sale, rent, urban renewal, investment, government programs (mortgage 600K, מחיר למשתכן, public housing). Commercial as a later expansion.

Implications: flexible listing schema, multi-source ingestion (gov data + agency-supplied), multi-role auth (user / agency / admin).

### D3 — Coordination
**Vega = tech lead + coordinator** until specialist agents are created. Each phase has a designated Owner agent role; PM splits issues; specialists work in chain.

Implications: Vega holds Phase 0 directly, hands off as agents are stood up.

## Decisions PENDING

| ID | Decision | Resolution |
|---|---|---|
| P1 | Existing-site disposition (rebuild / migrate / retire) | Awaiting URL from owner |
| P2 | Hosting topology details (server specs, Postgres location, CDN config) | Open |
| P3 | Git provider | ✅ `github.com/Orhgit/tedros` |
| P4 | Lead-model — how brokers monetize (free / per-lead / subscription) | Awaiting interview validation |
| P5 | Monthly infra budget cap | ✅ No monthly budget; free tiers + self-hosted only |

## Consequences

- All Phase 1 ADRs (data model, auth, i18n, SEO, hosting) inherit D1–D3 as constraints.
- Cost discipline (P5 resolved) drives stack-substack choices: Plausible self-hosted, GlitchTip instead of paid Sentry, Postgres on user's server instead of paid Neon.
- Pending P1, P2, P4 do not block Phase 1 architecture work; they refine implementation later.

## Risks tracked

See [`risk-register.md`](../risk-register.md) (R1–R10).
