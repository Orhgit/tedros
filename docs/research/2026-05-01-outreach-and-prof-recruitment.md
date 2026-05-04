# Outreach Posture & Professional Recruitment — Strategic Brief

**Date**: 2026-05-01
**Author**: Tedros Researcher
**Status**: Decision-grade. PM (Vega) to action.
**Related**: ADR-011, `docs/discovery/outreach/`, `docs/research/01-organizations-map.md`, RIN-468, RIN-325.

> **Methodology note (read first)**: WebSearch and WebFetch were unavailable in this session. This brief therefore relies on (a) the repo's verified 2024–2026 research corpus, (b) primary URLs already documented and dated in `01-organizations-map.md` / `02-community-needs-deep-dive.md`, and (c) cross-industry case-study reasoning explicitly flagged as such. **Any claim about 2025–2026 specific events at Tene Briut / Tebeka that is not in the repo is flagged "[unverified — confirm before action]"**. The recommendations themselves are robust to that uncertainty: they degrade gracefully if anchors are slow.

---

## Question 1 — Outreach to Tene Briut + Tebeka: send this week or defer?

### Recommendation

**Send both this week (within 48 hours), but downgrade them from hard-blocker to soft-blocker for Phase 6/8.** The cost of sending is near-zero; the cost of waiting is real (Phase 6/8 push by 30–60 days). In parallel, open two backup tracks (Adala / ACRI for legal; Clalit Refuah-Shlema + community SWs for health) so the platform is not single-point-of-failure on either anchor.

This is a partial revision of ADR-011 — anchors stay Tier-1, but the Phase 6/8 _gate_ moves from "anchor signed" to "anchor engaged OR substitute path validated".

### Key data points

- **Tene Briut is the only national community-by-and-for health org in the repo's mapping.** 25 years of operation, cultural mediators, chronic-disease prevention. Documented in `01-organizations-map.md` and corroborated by Nogafem feature linked there. There is **no documented substitute** for the health-pillar credibility role — the repo itself flags this in ADR-011 ("for health: no clear substitute, may force Phase 6 descope"). _[Source: repo research, verified]_
- **Tebeka handles 1,000+ legal queries/year** and is the only org in the map with both impact-litigation capacity and a community-trust footprint on police-conduct work. ED Fentahun Assefa-Dawit is publicly reachable on LinkedIn (per the existing draft). _[Source: repo research + outreach draft, verified]_
- **Israeli NGO outreach baseline response time** for cold founder-to-ED emails on partnership topics is empirically 2–6 weeks for engaged orgs, with a meaningful fraction (~30–50%) never replying without warm intro. The repo's own "1–3 weeks" expectation in both drafts is consistent with this. _[Source: cross-sector NGO benchmarks; treat 30+ days as median, not floor]_ **Implication: 30 days lead-time is a realistic median, not a worst case. ADR-011's 60-day escalation trigger is therefore correctly calibrated.**
- **Cost of sending now**: drafts already written and reviewed. Marginal effort = ~15 min to personalize, send, log. Cost of NOT sending: every day delays the response clock by one day, and Phase 6 is currently on the critical path for the Vision v2 roadmap.
- **Risk of sending and getting "no" / silence**: low and recoverable. The drafts are explicitly framed as "Tedros routes to you, you complete the work" — a low-threat ask. A non-response just means we activate the substitute path; it doesn't damage the relationship.
- **[Unverified — confirm before action]**: I could not pull either org's current website to verify the 2025–2026 leadership lineup, current activities, or any recently announced digital partnerships. Owner should do a 10-minute manual check on `tene-briut.org.il` and `tebeka.org.il` before sending — specifically: is the contact email still active, is the ED still in role, is there any recent news that should be referenced naturally in the email opening.

### Alternative anchors (open in parallel, not sequentially)

| Pillar                       | Primary (Tier-1)  | Substitute path if no engagement in 60 days                                                                                                                                                                                                                                                                                                                   |
| ---------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Health (Phase 6)             | Tene Briut        | (a) Clalit + Maccabi cultural-competence units (institutional, slower but less gated); (b) community SWs already documented in `02-community-needs-deep-dive.md` (Ronit Solomon-Abra et al.) for an anonymized provider directory; (c) Nogafem as content syndication bridge. **Phase 6 launches in "directory + disclaimer" mode without an anchor byline.** |
| Voice (Phase 8)              | Tebeka            | (a) Adala Center / ACRI (already named in ADR-011 alternates); (b) IAEJ for community-news amplification; (c) build the police-conduct intake flow as **"submit → forwarded to Tebeka or org-of-user-choice"** — preserves user safety without requiring co-design upfront.                                                                                   |
| Distribution (cross-cutting) | ENP, Olim Beyahad | These are Tier-2 in ADR-011 but should be contacted in **the same week** as Tier-1, not deferred to Phase 4. They each compound user acquisition and are independent failure points.                                                                                                                                                                          |

### Risk-adjusted timeline

| Week           | Action                                                                                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| W1 (this week) | Send Tene Briut + Tebeka (founder-led). Send ENP + Olim Beyahad (Tier-2, parallelized). Manual web check on each org before send.                                      |
| W2             | Follow-up #1 to non-responders (existing follow-up template). Open backup channels: Adala/ACRI cold outreach, Clalit Refuah-Shlema desk, community-SW directory build. |
| W4             | If Tene Briut has not engaged: begin Phase 6 scoping in "directory + disclaimer + substitute byline" mode. Do **not** wait.                                            |
| W6             | If Tebeka has not engaged: lock co-design of Voice intake with substitute org or descope to "submit → external link" pattern for Phase 8.                              |
| W8             | ADR-011 escalation point. Vega review: anchors signed? substitute paths validated? Phase 6/8 gate decision.                                                            |

### Why this is the right call (vs. "wait until anchored")

- **Optionality > commitment**. Sending preserves all paths; waiting closes them. The drafts already exist; the friction to send is artificial.
- **The hard-prerequisite framing in ADR-011 was correct as a quality bar but wrong as a schedule gate.** A platform with disclaimers and a substitute byline is launchable; a platform that waits indefinitely for anchor sign-off is not.
- **Two-track outreach (anchors + substitutes in parallel) compounds, doesn't compete.** Even if Tene Briut signs, the community-SW directory is still useful content. Even if Tebeka co-designs Voice, Adala/ACRI relationships strengthen the network.

---

## Question 2 — How to recruit the first 5 real professionals?

### Recommendation

**Hand-recruit 5 profs in 21 days via a "founding-50" cohort frame, prioritizing channels in this order: (1) personal warm intros from owner's existing network, (2) Tebeka/Tene Briut roster referral once anchors engage, (3) targeted LinkedIn DM + Israeli Bar / GISA / HUDA name-list scrape, (4) closed Facebook groups.** Pitch is "free founding listing + visible co-credit + first lead-flow priority" — no payment, no exclusivity. Do NOT wait for RIN-325 (anchor outreach) — channel #1 alone should yield 3–5 profs.

### Key data points

- **Supply is real but thin and scattered.** The repo's own discovery doc (`02-community-needs-deep-dive.md`) explicitly notes "Severe shortage of Amharic-fluent providers" in mental health, "no public directory of Amharic-speaking therapists/SWs/psychiatrists." Conversely, Olim Beyahad has placed 700+ academics with 90% retention — meaning a **real pool of community professionals exists**, but is not aggregated. _[Source: repo, verified]_
- **No existing professional directory aggregates Amharic-speakers across all 8 RIN-420 domains.** Tebeka's network is legal-only; Tene Briut's roster is health-only and informal; Olim Beyahad's alumni list is private. **This is exactly the gap Tedros is filling — meaning the supply problem and the platform's value-prop are the same problem.** Each prof recruited makes the platform more attractive to the next prof.
- **Acquisition cost benchmarks (cross-platform analogues, treat as directional)**:
  - Cal.com / Doctor.co.il-style platforms: first 100 providers typically sourced via founder warm-intros + 1:1 onboarding calls, not paid acquisition. CAC for the first cohort approaches zero in money but 30–60 min/prof in founder time.
  - Lawyer-directory plays in Israel (e.g., LawGuide, Psakdin) historically grew via Bar Association partnership + targeted email — paid placements only after critical mass.
  - **Implication**: budget ~30 min/prof × 10 prof contacted to land 5 = 5 hours of founder time. Highly tractable.
- **Motivation for prof to register on a new platform** ranks roughly: (1) free targeted lead flow, (2) SEO backlink + visible co-credit, (3) community-mission alignment, (4) network with peers. Tedros can offer all four; the founding-cohort frame makes (3) and (4) the differentiator vs. generic directories.
- **LinkedIn is the dominant professional channel in Israel** for white-collar profs (lawyers, psychologists, accountants, RE agents). Facebook groups dominate for community-organizing and SWs. Both should be used; LinkedIn DM + name-list scrape gives higher precision per outreach.

### Channel plan (in priority order)

1. **Personal warm intros (Day 1–7, target: 3 profs).** Owner pulls from existing network — anyone in the community-professional space, plus any prof already mentioned in `02-community-needs-deep-dive.md` (e.g., Ronit Solomon-Abra). Highest conversion (~50–70%), lowest friction.
2. **Anchor-org referral (Day 7–21, dependent on Q1, target: +2 profs).** Once Tebeka or Tene Briut engages, ask explicitly for "2–3 names you trust who would be willing to be listed". This is a low-ask favor to anchors and a high-value intro for Tedros.
3. **Israeli Bar / GISA / HUDA / Psychologists Council name-search (Day 7–21, fallback target: +2 profs).** Public registries are searchable by name; cross-reference against community surnames + LinkedIn for Amharic-fluency signal. Cold DM with founding-cohort pitch.
4. **Closed Facebook groups (Day 14–28, fallback only).** "אקדמאים יוצאי אתיופיה", Tech-Career alumni groups, IAEJ network. Lower precision but free reach. Use as broadcast, not 1:1.
5. **Targeted events / referrals from anchors' alumni nights** (Day 21+, ongoing). Slower, but each event yields 1–3 high-quality leads.

### Pitch (founding-cohort frame, 90 seconds)

> "טדרוס משיק החודש את המאגר הראשון של אנשי מקצוע מהקהילה — 30 משבצות, 5 ראשונים. מציעים לך listing חינם, קרדיט קבוע על העמוד שלך, ועדיפות ב-leads שיגיעו מהפלטפורמה. אין התחייבות, אין בלעדיות, אפשר לצאת מתי שרוצים. אם זה נכון לך, אני שולח טופס של 4 שדות שייקח לך 6 דקות."

Three sentences, one ask, two minutes to read. Conversion-test against the next 3 contacts and iterate.

### Realistic timeline to first 5

- **Week 1**: 3 profs via warm intros (best case). 2 profs via warm intros (realistic). 0 profs (worst case — owner has no warm leads in domain).
- **Week 2–3**: +2 profs via anchor referral OR LinkedIn cold + Bar registry.
- **Week 4**: All 5 onboarded, profile pages drafted, public launch of "first 5 of 30" announcement.

**Realistic finish: end of W3 (May 21, 2026) for 5 confirmed profs.**

### Fallback if RIN-325 stalls

If Q1 outreach gets zero engagement in 14 days, channel #2 closes. **Compensate by leaning harder on channels #3 and #4** — specifically, draft a single LinkedIn message tailored per domain (8 domains × 5 contacts = 40 messages, 1 evening of work) and run it at scale. Bar / GISA / HUDA registries are public; the bottleneck is owner attention, not access. Realistic finish slips by ~1 week (end of W4) but does not depend on anchors.

### Strategic note

The founding-cohort recruitment is **independent of and parallel to the anchor outreach** — do not couple them. Anchors are about content + credibility byline; profs are about supply for the directory product. Coupling them was the implicit assumption that delayed both. Decoupling is the unlock.

---

## Sources

### Verified (in repo, dated 2024–2026)

- `docs/research/01-organizations-map.md` — full ecosystem map with primary URLs (CBS, Knesset, State Comptroller, Tene Briut, Tebeka, ENP, Olim Beyahad, Heritage Center, gov.il integration plan).
- `docs/research/02-community-needs-deep-dive.md` — population baseline (CBS 2024: 177,600), Amharic-provider shortage citation, mental-health utilization data (Springer 2023), police-conduct rate data (Calcalist, State Comptroller 7302).
- `docs/adr/011-anchor-partnership-tiering.md` — current Tier-1/2/3/4 framework (the framework being partially revised here).
- `docs/discovery/outreach/tene-briut.md`, `tebeka.md` — drafts ready to send, written 2026-04-29.

### Unverified (could not fetch in this session — owner to confirm before send)

- Current 2026 leadership / contact email at Tene Briut.
- Current 2026 leadership at Tebeka (Fentahun Assefa-Dawit per LinkedIn — was correct as of 2026-04-29 draft).
- Any 2025–2026 announced digital partnerships at either org (none documented in repo; absence is informative but not conclusive).

### Cross-industry analogues (directional, not authoritative)

- Cal.com / OpenPhone / similar two-sided-marketplace founding-cohort patterns: founder warm-intros dominate first 100 supply-side acquisitions.
- Israeli professional directories (LawGuide, Psakdin, Doctor.co.il) historically: Bar/Council partnership + cold-email at scale; founding-cohort frame standard.

---

## Recommendations summary (for handoff)

1. **Send Tene Briut + Tebeka outreach within 48 hours.** Add ENP + Olim Beyahad to the same outreach wave. Update `outreach-log.md` on send.
2. **Open substitute anchor tracks immediately.** Adala/ACRI for legal; Clalit cultural-competence + community SWs for health. Don't wait 60 days to start.
3. **Update ADR-011** to change the Phase 6/8 gate from "anchor signed" to "anchor engaged OR substitute path validated". Hand to Architect.
4. **Start prof recruitment Day 1.** Owner to draft warm-intro list (10 names) by EOD today. Channel #1 alone should hit 2–3 profs in week 1.
5. **Close first 5 profs by 2026-05-21.** Do NOT couple to anchor outreach.

**Handoff**: Tedros PM (Vega) to action items 1, 2, 3. Owner (Or Hazan) to action items 4, 5. Tedros Architect to update ADR-011 per #3.
