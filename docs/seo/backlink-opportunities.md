# Backlink & citation opportunities (TED-109)

**Date:** 2026-08-19
**Method:** cross-referenced organizations already cited/linked-to from live site content (`grep` over `app/lib/db/seeds/*.ts`) against the existing outreach pipeline (`docs/discovery/outreach/`) and `docs/research/01-organizations-map.md`. No new contacts fabricated — every organization below is either already linked from a live Tedros page, or already has a real outreach relationship in progress per the existing docs.

## Why this matters for GEO/AEO, not just classic SEO

AI engines (Perplexity, ChatGPT browsing, Google AI Overviews) weight third-party citations of a domain more heavily than the domain's own claims about itself. Tedros currently gives outbound link equity to several organizations (Tebeka, ENP, kolzchut.org.il) without receiving anything back. Closing that loop — a real backlink or a "resources" mention on their side — is the highest-leverage GEO lever available that doesn't require new content.

## Organizations already linked from live Tedros content

| Organization                                      | Where Tedros links to them                                                                                                                                 | Outreach status                                                                                                                                                                                                                                    |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tebeka** (tebeka.org.il)                        | `app/lib/db/seeds/rights.ts` — cited as the free-legal-aid resource across ~10 rights entries (police conduct, housing appeals, employment discrimination) | Tier-1 anchor partner. Draft ready: [`docs/discovery/outreach/tebeka.md`](../discovery/outreach/tebeka.md) — **not yet sent** per `outreach-log.md` (still placeholder dates)                                                                      |
| **ENP — Ethiopian National Project** (enp.org.il) | `app/lib/db/seeds/rights.ts` — cited 3× in education/tutoring rights entries                                                                               | Tier-2 partner, no draft yet. Research profile: [`docs/discovery/outreach/enp.md`](../discovery/outreach/enp.md)                                                                                                                                   |
| **Kol-Zchut** (kolzchut.org.il)                   | `app/lib/db/seeds/rights.ts` — cited as the canonical rights-encyclopedia reference on public-housing entries (HE/EN/AM)                                   | No outreach relationship. Per `01-organizations-map.md`, Kol-Zchut is explicitly framed as **coopetition** (high-authority rights encyclopedia) rather than a partner — a backlink ask here is lower-probability but highest-authority if it lands |
| **Tene Briut** (tene-briut.org.il)                | Not yet linked from live content (health pillar cites it conceptually per ADR docs, not yet in seed data)                                                  | Tier-1 anchor partner. Draft ready: [`docs/discovery/outreach/tene-briut.md`](../discovery/outreach/tene-briut.md) — **not yet sent**                                                                                                              |

## The actual opportunity

The two ready-to-send drafts (Tebeka, Tene Briut) are partnership pitches, not backlink requests — and they're already the highest-value ask (anchor partnership implies a link as a side effect, not the other way around). This task doesn't add new outreach; it flags that **when those two emails are sent** (owner action, per `docs/discovery/outreach/README.md` — sent from `orosh87@gmail.com`, not automated), asking for a link/mention from their "resources" or "partners" page is a natural, low-friction addition since Tedros already links to them with real content.

**Recommendation, not an action taken:** when TED PM or the owner sends `tebeka.md` / `tene-briut.md`, consider adding one line asking if they'd be open to listing tedros.co.il as a referral resource. This is a suggestion for the human sender, not something to automate — these are relationship emails.

## What this task does NOT include

- No new cold-outreach targets identified beyond what `01-organizations-map.md` already tracks.
- No fabricated relationships or claimed backlinks — Kol-Zchut and ENP have zero relationship today; the citation is one-directional (Tedros → them).
- No edits to the outreach email drafts themselves — those carry the owner's personal voice for person-to-person outreach and are outside this task's scope.
