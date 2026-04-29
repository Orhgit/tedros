# ADR-010: Comprehensive 10-pillar portal scope

**Status**: Accepted (2026-04-29).
**Owner**: Tedros Architect.
**Related**: [Vision v2](../discovery/0.1-vision-v2.md) (decision narrative), [research/02-community-needs-deep-dive.md](../research/02-community-needs-deep-dive.md) (evidence).
**Supersedes**: The 3-pillar framing in `docs/discovery/0.0-summary.md` ("rights, professionals, real estate").

## Context

Phase 0 originally framed Tedros as a 3-pillar platform anchored on real estate. Research (12 sources, see `02-community-needs-deep-dive.md`) showed that the community's underserved domains are wider than 3 — and that information pillars (rights, scholarships, mortgage wizards) acquire users _faster_ than real estate because the SEO competition is encyclopedic (Kol-Zchut), not action-driven.

Quantified gaps that the 3-pillar framing leaves unaddressed:

- **Education**: 36.8% community matriculation eligibility vs 50.8% general (Knesset MMM).
- **Welfare**: 41% of community youth registered with welfare vs ~14% general.
- **Law enforcement**: police case rate 2× population share (3.5% vs 1.7%); complaints to מח"ש 2.6× share (State Comptroller 7302).
- **Mental health**: significantly higher psychiatric hospitalization with severe Amharic-fluent provider shortage (Springer Nature, NIH PMC).
- **Domestic violence**: complaint rate significantly above population share, spousal-murder spike 2001–2006 (BIU Gender Studies, Nogafem).

Refusing to acknowledge these gaps in scope is a policy stance against the data.

## Decision

Tedros's scope is **10 pillars**:

1. Rights & Programs · 2. Real Estate ⭐ (monetization spine) · 3. Professionals · 4. Employment & Career · 5. Education & Mentorship · 6. Health & Wellness · 7. Family & Social Support · 8. Heritage & Culture · 9. Community News & Activism · 10. Voice & Advocacy.

Each pillar exposes the same three layers — **Read** (programmatic SEO), **Do** (wizards, applications, complaint flow), **Connect** (vetted humans).

### Phase gating principle (D1)

10-pillar scope is a **vision statement**, not a delivery commitment. The roadmap is **strictly sequential** by phase (3 → 9), not parallel. Each phase introduces 1–2 pillars and depends on prior infrastructure, partnerships, and ADRs being in place.

The cost of accepting "10 pillars" today is therefore zero engineering; the cost of refusing is locking the project into a narrative that contradicts the research.

### Pillar prioritization — ROI ladder (D2)

Pillars enter the roadmap in this order, by descending ROI of (acquisition speed × monetization × trust requirement):

| Phase   | Pillars                    | Driver                                                                   |
| ------- | -------------------------- | ------------------------------------------------------------------------ |
| Phase 3 | 1 Rights + 2 Real Estate   | Schema present (RIN-320); Rights funnels users into RE (mortgage = both) |
| Phase 4 | 3 Professionals            | Booking + referral fees                                                  |
| Phase 5 | 4 Employment + 5 Education | Distribution partners ready (Olim Beyahad, Tech-Career, ENP)             |
| Phase 6 | 6 Health + 7 Family        | Tene Briut anchor + crisis-mode UX hard prereqs                          |
| Phase 7 | 8 Heritage + 9 News        | Sigd seasonal, IAEJ feed                                                 |
| Phase 8 | 10 Voice                   | Tebeka co-design hard prereq                                             |

### Descope rule (D3)

A pillar may be dropped from the roadmap if a hard prerequisite (anchor partnership, security audit, regulatory clearance) cannot be met within twice the planned phase duration. Dropping a pillar does not retroactively invalidate this ADR — the 10-pillar vision is preserved as an aspirational target; the roadmap is the live commitment.

## Consequences

- **Positive**: SEO acquisition diversifies across 10 verticals; monetization risk (R8) is hedged by professional-referral and employer-posting revenue streams; community trust deepens because Tedros isn't perceived as another single-vertical service.
- **Negative**: Larger surface area to maintain; partnership requirements (Tene Briut, Tebeka) introduce schedule dependencies; risk register expanded from R10 to R18.
- **Bus factor**: R4 (single-stakeholder dependency) is amplified by wider scope. Mitigation: each pillar is owned by a specialist agent (per `.claude/agents/`); cross-pillar architectural decisions go through ADRs.

## Alternatives considered

- **A1 — Stay at 3 pillars** (rejected): contradicts community-needs research; loses the SEO-velocity argument for information pillars.
- **A2 — 5 pillars** (rejected as artificial): no natural cut between health/family/voice or between heritage/news. The data either supports widening or it doesn't.
- **A3 — 10 pillars in parallel** (rejected): unrealistic for a small team; converts the scope decision into a delivery risk. Sequential phasing keeps cost-of-yes at zero.
