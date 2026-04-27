# Risk Register

**Last updated**: 2026-04-26.
**Owner**: Vega (until specialist agents own per-area risks).

| #   | Risk                                                                        | Severity | Phase    | Mitigation                                                                                                       | Escalation trigger                                     |
| --- | --------------------------------------------------------------------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| R1  | No legal API for Yad2/Madlan; scraping breaks ToS                           | High     | Phase 3  | Strategy shifted to gov open-data first (רמ"י, Tax Authority); Yad2/Madlan only via partnership                  | If we ever ship a scraper, escalate to legal review    |
| R2  | Community fragmented across WhatsApp/Facebook — hard to migrate to platform | High     | Phase 4+ | Partnerships with ENP / IAEJ / Tene Briut for guaranteed user inflow                                             | <100 active users 30 days post-launch                  |
| R3  | Quality Amharic translation is rare/expensive; Ge'ez RTL less supported     | Medium   | Phase 1+ | In-community human translator; verify font + RTL support early in tooling                                        | Storybook fails Ge'ez render                           |
| R4  | Single-stakeholder dependency (אור) — bus factor = 1                        | Medium   | Always   | Document decisions as ADRs; train a community PM later                                                           | Owner unreachable >7 days                              |
| R5  | Cost overruns on hosting/AI/APIs                                            | Medium   | Always   | **RESOLVED**: no monthly budget cap; everything self-hosted or free-tier                                         | Any paid service appears in stack                      |
| R6  | SEO authority race vs Kol-Zchut and incumbent broker sites — 6–12 months    | Medium   | Phase 3+ | E-E-A-T from day one (real authors, sources); backlinks via NGO partnerships                                     | <Page-2 ranking 90 days post-launch on top 10 keywords |
| R7  | Real estate brokerage law (חוק המתווכים) compliance                         | High     | Phase 3  | Legal review BEFORE listing any property; architect platform as listing aggregator + lead conduit, not as broker | Any legal complaint or warning                         |
| R8  | Lead model unvalidated — community brokers may not pay                      | High     | Phase 3  | Validate in interviews (Phase 0); pilot free tier first, monetize later                                          | <3 brokers paid by month 3                             |
| R9  | Self-hosted observability + DB on user's server = single point of failure   | Medium   | Phase 7+ | Backups (daily snapshots), monitoring; document recovery runbook                                                 | Server downtime >2h                                    |
| R10 | Government data formats change without notice                               | Medium   | Phase 3+ | Adapter layer with schema validation; alerts on parse failures; versioned snapshots                              | Sync worker fails >24h                                 |

## Risk handling rules

- **High** → mitigation must be in place before the dependent phase starts.
- **Medium** → tracked weekly; mitigation can be drafted during phase.
- New risks: append, don't renumber.
- When a risk is resolved or no longer applicable, mark **RESOLVED** with date instead of deleting.
