# ADR-014: Monetization portfolio

**Status**: Accepted (2026-04-29).
**Owner**: Tedros Architect (model); Tedros DevOps (Stripe integration). Vega (revenue strategy).
**Related**: [ADR-001 stack](../discovery/adr/ADR-001-stack.md) (cost discipline P5), [Vision v2 §Monetization](../discovery/0.1-vision-v2.md), R8 (lead model unvalidated).

## Context

The original Phase 0 plan staked monetization on a single revenue stream: real-estate broker leads (R8 — unvalidated until Phase 3 pilot). Two problems:

1. **R8 is high-impact, untested.** If brokers don't pay, the platform has no revenue at all. Vision v2 acknowledges this.
2. **The 10-pillar scope (ADR-010) creates monetization opportunities the 3-pillar plan didn't.** Professional referral fees, employer postings, sponsored content — all natural extensions of pillars Tedros is building anyway.

Cost discipline (P5, [ADR-001 stack](../discovery/adr/ADR-001-stack.md)) is unchanged: zero monthly subscriptions, all infra on free tiers or self-hosted, Stripe used transactionally only. Revenue diversity is therefore about hedging _income_ risk, not about absorbing _cost_ growth.

## Decision

Tedros monetizes through a **portfolio of seven streams**, none of which is required to make the platform viable. The portfolio is sequenced so each stream activates as the relevant pillar enters delivery.

### Stream 1 — Real-estate broker leads (Phase 3, primary)

- Per-qualified-lead fee paid by brokers when a Tedros-sourced inquiry reaches their inbox.
- Lead quality validated by ADR-009 eligibility snapshot (already merged) — "qualified" means the inquiry passed a programme-eligibility check.
- Stripe transactional: each lead emits a Stripe `Charge` to the broker's payment method on file.
- **Validates R8** in the first 90 days post-Phase-3 launch. Trigger to descope: <3 paid leads in month 3.

### Stream 2 — Real-estate listing fees (Phase 3, secondary)

- Subscription tier for agencies wanting featured / above-the-fold placement.
- Stripe transactional: monthly invoice; agency cancels via dashboard (no auto-renew lock-in).
- Cost discipline: this is _agency_ cost, not Tedros's monthly subscription. Stripe's per-transaction fee is the only Tedros-incurred cost.

### Stream 3 — Professional referral fees / featured (Phase 4)

- Per-booking fee paid by professionals when a Tedros booking confirms.
- Featured-listing tier (similar to Stream 2) for prominent placement.
- Margin medium; volume is the constraint (booking adoption ramps slowly).

### Stream 4 — Employer job-posting fees (Phase 5)

- Per-posting fee for employers using the Tedros job board.
- Free tier for community-facing employers (Olim Beyahad-tagged employers, NGOs); fee for general-market employers wanting community-targeted reach.
- Margin low-medium; volume scales with employer adoption.

### Stream 5 — Sponsored content (Phase 7+, partner-only)

- Limited to vetted partners (Tier-2 distribution partners per [ADR-011](./011-anchor-partnership-tiering.md)) producing community-relevant content (events, scholarships, programs).
- **Hard rule**: sponsored content carries a visible badge. No native-ad camouflage. No personal-injury / financial-services / political advertisers.
- Margin low; primary purpose is partner alignment, not revenue.

### Stream 6 — Voluntary donations (all phases)

- Optional Stripe one-off "support Tedros" button on the homepage and in account settings.
- Funds pooled for: server costs, content honoraria for community contributors, accessibility audits.
- Donations are recorded but never tied to user accounts in promotional emails.

### Stream 7 — Government tenders (Phase 9+, aspirational)

- Govt Decision 3242+3243 funded community-integration projects; Tedros may bid as a service-delivery vendor for specific deliverables (programmatic-SEO content for Ministry of Aliyah, eligibility-wizard plugin for gov.il, etc.).
- Project-based, not recurring.
- Aspirational — depends on platform reaching demonstrated reach (Vision v2 success metric: 30K MAU @ 12 months).

## Allocation policy

- **No revenue from Pillars 6 (Health), 7 (Family), 10 (Voice).** These pillars are donor-supported (Stream 6) only. Monetizing crisis flows is incompatible with the trust model.
- **Pillars 1 (Rights), 8 (Heritage), 9 (News)** monetize indirectly: Pillar 1 funnels users to Pillar 2; Pillars 8/9 may carry sponsored content (Stream 5) with the partner-only constraint.
- **Pillars 2, 3, 4** are the primary revenue-bearing pillars (Streams 1–4).

## Stripe integration constraints

- **Transactional only** (per cost discipline P5). Tedros does not pay Stripe a monthly fee; per-transaction percentage is the sole cost.
- **No card-on-file for users**. Anonymous donations OK; no recurring user subscriptions.
- **Agency/professional/employer subscriptions** are Stripe Subscription Schedules (not monthly auto-renew); each cycle re-authorizes.
- **No platform escrow.** Tedros doesn't hold buyer funds. Real-estate transactions stay between broker and buyer; Tedros is paid for the lead, not the deal.

## Consequences

- **Positive**: revenue risk is hedged across 6 active streams (Stream 7 aspirational); R8 (lead model) becomes one of seven bets, not a single point of failure.
- **Negative**: Stripe complexity ramps over phases — agency invoicing (Phase 3), professional referrals (Phase 4), employer postings (Phase 5), donations (any phase), sponsored-content invoicing (Phase 7). Architect cost: one ADR-extension per stream when activated.
- **Audit**: all Stripe events flow into `audit_log`; reconciliation runs nightly against Stripe's own records.

## Alternatives considered

- **A1 — Single stream (broker leads only)** (rejected): R8 becomes existential.
- **A2 — Donor-funded only** (rejected): contradicts Vision v2's sustainability thesis; replicates ENP/Tene Briut/Tebeka's funding model and inherits their grant-cycle precarity.
- **A3 — Paid platform subscription for users** (rejected): inconsistent with the equity mission; Tedros is for the community, not gated behind a paywall.
- **A4 — Display advertising (programmatic ads)** (rejected): incompatible with trust model on sensitive pillars; cookie-tracking requirements clash with crisis-UX (ADR-012).
