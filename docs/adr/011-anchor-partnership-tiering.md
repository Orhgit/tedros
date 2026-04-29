# ADR-011: Anchor-partnership tiering strategy

**Status**: Accepted (2026-04-29).
**Owner**: Tedros Architect (architecture); Vega (relationships).
**Related**: [ADR-010 — comprehensive scope](./010-comprehensive-portal-scope.md), [research/01-organizations-map.md](../research/01-organizations-map.md), `docs/discovery/outreach/`.

## Context

Tedros aggregates content across an existing ecosystem (Kol-Zchut, ENP, Tebeka, Tene Briut, Olim Beyahad, Heritage Center, Council of Kessim, IAEJ, etc.). Without partnerships, the platform looks like another well-meaning generalist site competing on credibility it has not earned. With partnerships, Tedros becomes the unified action layer over content these orgs already produce — a relationship rather than a competition.

Some partnerships are _hard prerequisites_ for specific pillars (Phase 6 Health cannot launch without Tene Briut's content authority; Phase 8 Voice cannot launch without Tebeka's co-design). Others are accelerators that compound user acquisition but are not blocking.

Treating all partnerships equally produces two failure modes:

1. **Over-investment** in nice-to-have orgs (e.g., chasing Sigd-event co-publishing in Phase 0, before any pillar that needs it ships).
2. **Under-investment** in critical anchors (e.g., not securing Tene Briut by Phase 5, blocking Phase 6 launch).

## Decision

Partnerships are organized into **four tiers**. Each tier carries different commitments, escalation paths, and outreach cadence.

### Tier 1 — Trust anchors (hard prerequisites)

| Org                                                         | Pillars gated                                                  | Why hard                                                                                               |
| ----------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Tene Briut ([tene-briut.org.il](https://tene-briut.org.il)) | 6 Health                                                       | National-scale community-trusted health voice. Without their byline, health content reads as generic.  |
| Tebeka ([tebeka.org.il](https://www.tebeka.org.il))         | 1 Rights (legal triage), 10 Voice (co-design + intake routing) | Legal credibility + complaint-routing pipeline. Voice cannot launch without their data-security input. |

**Outreach cadence**: founder-led, immediate. Drafts in `docs/discovery/outreach/`. Follow-up every 2 weeks until response.

**Escalation trigger**: if either fails to engage within 60 days, escalate to Vega; consider alternate anchor (e.g., for legal: bypass via `Adala Center` or `ACRI` is plausible — for health: no clear substitute, may force Phase 6 descope).

### Tier 2 — Distribution partners (Phase 4–5 enablers)

ENP, Olim Beyahad, Tech-Career, Fidel.

**Why important**: their newsletters, events, alumni networks, and job feeds can be cross-published or syndicated, multiplying Tedros's user-acquisition velocity.

**Why not Tier 1**: their absence delays a phase but does not block it (we can build a job board without Olim Beyahad's feed, just slower to ramp).

**Outreach cadence**: founder-led at Phase 4 kickoff (\~1 month before phase opens). Single rejection does not block; pivot to alternates (ISEF, Hesegim).

### Tier 3 — Heritage + religion (Phase 6+)

Council of Kessim, Heritage Center, IAEJ, Israeliana.

**Why important**: cultural authority for Phase 7 (Heritage, News). Content collaboration around Sigd, oral history, kessim directory.

**Outreach cadence**: 6 weeks before Phase 7 starts. Lower-stakes than Tier 1 — these orgs benefit from amplification, so the relationship is more symmetric.

### Tier 4 — Government data (silent partners)

רמ"י, data.gov.il, Tax Authority, Ministry of Aliyah & Integration, Knesset Research & Information Center.

**Why "silent"**: no human relationship needed. Adapter-layer integrations against published open APIs.

**Outreach cadence**: zero. Monitor for API/format changes; alert on adapter failure (R10).

## Consequences

- Founder-time on partnership outreach is bounded: only Tier 1 is "now", Tier 2 is "phase-aligned", Tier 3 is "deferred".
- Phase gates explicitly depend on Tier 1 anchors — Phase 6 (Health) and Phase 8 (Voice) cannot start delivery work until anchors signed. This is a hard schedule dependency.
- A "partnership badge" UI element on pillar landing pages signals trust; Tier 1 anchors get prominent placement, Tier 2 inline mentions.

## Alternatives considered

- **A1 — Treat all partnerships equally** (rejected): over-invests in nice-to-haves and under-invests in blockers.
- **A2 — Build first, partner later** (rejected for Tier 1): Phase 6 health content without Tene Briut byline is a credibility risk; Phase 8 voice intake without Tebeka co-design is a security/legal risk.
- **A3 — Acquire/integrate** (rejected): Tedros has no budget to acquire NGOs and zero strategic reason to subsume their identity. Partnership preserves their independent voice while letting Tedros surface their work.
