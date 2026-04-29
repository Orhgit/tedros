# ADR-012: Crisis-mode UX pattern

**Status**: Accepted (2026-04-29). Implementation deferred to Phase 6.
**Owner**: Tedros Designer (pattern); Tedros Engineer (instrumentation); Vega (escalation).
**Related**: [ADR-010](./010-comprehensive-portal-scope.md), [ADR-013 — Voice security](./013-voice-pillar-security.md), R12/R16/R17 in [risk-register](../discovery/risk-register.md).

## Context

Three Tedros pillars touch users at moments of acute personal risk:

- **Pillar 7 — Family Support**: domestic-violence resources, safe-flow contact. Spousal-murder spike documented 2001–2006 (BIU Gender Studies); cultural-transition pressure on family roles disproportionately affects community women (Nogafem).
- **Pillar 6 — Health**: mental-health resources for users in active crisis. Community psychiatric hospitalization rate is significantly above general (Springer Nature).
- **Pillar 10 — Voice**: police-conduct or racism complaints — events the user is reluctant to disclose, often filed from a shared device.

Standard UX assumes the user has time, attention, and privacy. None of those hold here. A user fleeing DV may have 30 seconds before a partner returns; a user reporting police conduct may be using a phone the police seized briefly; a user finding mental-health support may not want browser history to expose the search.

A platform that ships these pillars with conventional UX patterns is actively unsafe.

## Decision

A **Crisis-mode UX pattern** is a hard prerequisite for any Phase 6/7/8 pillar that handles sensitive flows. The pattern has four components.

### D1. Anonymous session

- No account required to use the flow.
- Session cookie scoped to the specific flow, expires on tab close.
- No `users` row created server-side; data stored in a flow-specific table with no FK to identity (`family.crisis_resources`, `voice.reports`).
- Optionally collect identity at the _end_, not the start, after the user has seen what's available.

### D2. No-trace mode

- Browser-history hygiene: the page exposes a visible **"Quick Exit"** button (top-right, RTL-mirrored) that redirects to a neutral page (Google) and replaces the current history entry.
- Server: response headers `Cache-Control: no-store`, `Pragma: no-cache`. No page caching.
- URL design: paths must not embed the flow nature in human-readable form (e.g., `/he/safe/12fa`, not `/he/dv-help`).

### D3. Multi-lingual at the entry, before-anything-else

- Language switcher is the first interactive element; flow content respects locale immediately.
- Crisis content is translated to HE/EN/AM with the same priority as the homepage (no fallbacks to HE-only).
- Audio supplements text where literacy is a concern (Phase 6.5+).

### D4. Minimal data retention

- Submitted data lives in tables with explicit retention windows (e.g., 30 days, with hashed-identifier deletion thereafter).
- IP addresses and user-agent strings are not stored on these tables; rate-limiting uses an in-memory bloom filter, not a persisted log.
- All access to these tables is audited (write to `audit_log` with `actor='system'`, no real user identity).

### D5. Escalation routing

- Each flow has a documented **routing target** (e.g., DV → community SW; Voice → Tebeka triage; mental-health crisis → ERAN hotline).
- Flow output presents the routing target prominently; submission is delivered to the target via the same outbound channel as our other emails (Resend), tagged for priority.

## Consequences

- **Positive**: Phase 6/7/8 ship safely; the pattern becomes a reusable component (`<CrisisFlow>` parent component composing Quick-Exit, anonymous session, retention-aware data layer).
- **Negative**: engineering cost is real — 3–4 sprint-weeks of pattern build before any sensitive pillar ships. Adopted as Phase 6 hard scope (per Vision v2 sign-off).
- **Conditional cost**: if Phase 6/7/8 are deferred or descoped (per ADR-010 D3), the engineering cost is deferred too. This ADR commits to the pattern only when those phases enter delivery.

## Alternatives considered

- **A1 — Standard UX, with privacy disclaimer** (rejected): puts the safety burden on the user; documented harm pattern across DV-tech research.
- **A2 — Redirect to existing org sites** (rejected for hosted flows): loses the structured intake that makes Phase 8 Voice valuable; forfeits the analytics that drive advocacy.
- **A3 — Build per-pillar custom flows** (rejected): triples engineering cost without improving safety; consistency across crisis flows is the user's UX expectation.
