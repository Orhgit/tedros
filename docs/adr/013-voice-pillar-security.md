# ADR-013: Voice pillar — data-security model

**Status**: Accepted (2026-04-29). Implementation deferred to Phase 8 (gated by Tebeka co-design).
**Owner**: Tedros Architect (model); Tedros DevOps (infra); Tebeka (legal review — partnership prerequisite).
**Related**: [ADR-010](./010-comprehensive-portal-scope.md), [ADR-012 Crisis-UX](./012-crisis-mode-ux-pattern.md), [ADR-011 Partnership tiering](./011-anchor-partnership-tiering.md), R12/R16/R17 in [risk-register](../discovery/risk-register.md).

## Context

Pillar 10 (Voice & Advocacy) hosts the highest-stakes flow on the platform: structured intake of racism / police-conduct complaints, with auto-routing to Tebeka triage (anonymous) or to מח"ש directly (consented). The State Comptroller report 7302 documented that:

- Community police-case rate is 2× population share.
- Complaints to מח"ש are 2.6× population share.
- Many complaints close for "complainant abandonment" — i.e., the broken pipeline is itself a community-harm pattern Tedros's structured intake is meant to fix.

This pillar will receive disclosures of crime, abuse of authority, and personal trauma. The threat model includes:

- **State actor** (police, government) with motive to suppress disclosures.
- **Civil litigation** that may seek to subpoena platform records.
- **Personal-network attacker** (DV partner, abusive employer) with physical access to the user's device.

Building this without a worked-out security model is a foreseeable harm to vulnerable users and a foreseeable liability to the platform owner.

## Decision

The Voice pillar follows a **data-minimization-first** security model with five principles. Implementation is gated on Tebeka co-design and a third-party security audit before Phase 8 launch.

### D1. The platform stores _routing pointers_, not _content_

Default flow:

1. User enters complaint via `<CrisisFlow>` (per ADR-012).
2. Server validates schema, generates a single-use `report_id` and a `routing_token`.
3. **Content is encrypted at the edge** (browser-side) with a key derived from a Tebeka-managed secret + `routing_token`.
4. Encrypted blob is forwarded to Tebeka's intake (e.g., via a Resend transactional with an encrypted attachment, or a webhook to a Tebeka-hosted endpoint).
5. The platform's `voice.reports` table stores: `report_id`, `created_at`, `routing_target` (Tebeka or מח"ש), `delivery_status`, `consent_disclosure` (boolean). **It does not store the complaint content, the user's identity, or the IP.**

### D2. Identity disclosed at routing target choice

- Default path: anonymous. User identity is disclosed only if they explicitly select "include my name" at submission.
- For consented disclosures, identity goes _to the routing target_ (e.g., directly to Tebeka), not into Tedros's database.

### D3. Defense against legal subpoena

- The platform cannot subpoena what it does not have. D1 + D2 mean a court order against Tedros yields routing metadata only — no complaint content, no user identity for anonymous submissions.
- Tebeka, operating under attorney-client privilege for legal-aid functions, holds the content.
- For מח"ש routing, content is delivered through their official intake; Tedros records only that delivery occurred.

### D4. Defense against device-level attacker

- Per ADR-012 (Crisis-UX): no-trace mode, Quick Exit button, no browser history of the complaint URL after exit.
- Submitted-confirmation page shows _only_ a `report_id` (alphanumeric, not memorable) — no identifying summary that an attacker glancing at the screen could decode.

### D5. Audit + retention

- `voice.reports` rows: 90-day retention by default, then automated hash-and-purge (keep `report_id` hash + `created_at` for statistics, drop everything else).
- Statistical aggregates (count by month, count by routing target, completion rate) preserved indefinitely for advocacy.
- Audit log writes use `actor='system'` for all Voice-pillar mutations — no actor user identity.

### D6. Hard prerequisites for Phase 8 launch

1. Tebeka co-design signed (ADR-011 Tier-1 partnership).
2. Third-party security audit (penetration test + threat-model review) passed.
3. Browser-side encryption library audited (likely libsodium / NaCl wasm).
4. Disaster runbook for "complaint pipeline down" written and tested.
5. Legal opinion (from a lawyer engaged by Tedros, separate from Tebeka) on platform-owner liability for hosted intake.

## Consequences

- **Positive**: structured intake is delivered with a defensible security posture; "complainant abandonment" pattern (Comptroller 7302) is reduced because the platform tracks delivery and can resurface dropped cases.
- **Negative**: complexity is high — browser-side encryption, separate routing channel, retention automation. Engineering cost ~4–6 sprint-weeks beyond ADR-012's Crisis-UX cost.
- **Conditional cost**: if Tebeka co-design fails or the audit reveals unacceptable residual risk, Phase 8 may descope to redirect-only (per ADR-010 D3). The pattern is preserved here for that future, but spend doesn't start until preconditions are met.

## Alternatives considered

- **A1 — Plain-form submission, content stored on Tedros** (rejected): stores incrimating disclosures on the platform's DB, putting users at risk under subpoena and the platform owner at risk under data-breach liability.
- **A2 — Redirect-only (no hosted flow)** (rejected per Vision v2 sign-off): forfeits the structural fix to the "complainant abandonment" pattern; Tedros adds no value over a static link.
- **A3 — Self-host complaint storage with at-rest encryption** (rejected): better than A1 but still vulnerable to subpoena (the platform holds the keys); doesn't reduce content-exposure risk to Tedros.
- **A4 — Tor / onion-service wrapper** (rejected for v1): too high a usability cost for a community whose digital-literacy distribution is wider than typical infosec audiences. May be added in Phase 8.5 as an option.
