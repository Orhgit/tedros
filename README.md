# Tedros

**Comprehensive Ethiopian-Israeli community portal** — the unified action layer for rights, real estate, professionals, employment, education, health, family support, heritage, news, and voice.
Tri-lingual from day one: Hebrew (RTL), English (LTR), Amharic (LTR, Ge'ez script — see [ADR-008](./docs/adr/008-amharic-ltr.md)).

## Mission

> **"לא רק לדעת — לקבל. לא רק לבקש — לקבל בחזרה."**
> *Not just to know — to receive. Not just to ask — to receive back.*
>
> Tedros aggregates what already exists across the ecosystem (Kol-Zchut, ENP, Tebeka, Tene Briut, government programs), translates it into HE/EN/AM, and turns reading into doing — apply, book, claim, complain, find a person.

## Status

In active development by an autonomous multi-agent team coordinated through [Multica](https://multica.ai).
Source of truth for plans, decisions, and live progress: the Multica workspace `tedros` (issues TED-1+).
**Vision v2** ([`docs/discovery/0.1-vision-v2.md`](./docs/discovery/0.1-vision-v2.md)) widens scope from 3 to 10 pillars; Phase 0 sign-off pending.

## The 10 pillars

| # | Pillar | Read | Do | Connect |
|---|---|---|---|---|
| 1 | Rights & Programs | Rights × city programmatic SEO | Eligibility wizards, application status | Tebeka triage |
| 2 ⭐ | Real Estate | Listing pages, neighborhood SEO | 600K mortgage wizard, urban-renewal lookup | Vetted brokers |
| 3 | Professionals | Profession × city pages | Booking | Vetted directory + reviews |
| 4 | Employment & Career | Job-market overviews | Job board, scholarship deadlines | Olim Beyahad / Tech-Career feeds |
| 5 | Education & Mentorship | Scholarship / mechinot guides | Scholarship-finder, mentor matching | ENP / Fidel / ISEF / Hesegim |
| 6 | Health & Wellness | Amharic-explainers, prevention content | Provider booking | Amharic-fluent clinicians (Tene Briut anchor) |
| 7 | Family & Social Support | Resource hubs | Crisis-mode flow (DV, sensitive) | Community social workers |
| 8 | Heritage & Culture | Sigd, Beta Israel, oral history | Event registration | Council of Kessim, Heritage Center |
| 9 | Community News & Activism | Aggregated news, events | Campaign hosting | IAEJ |
| 10 | Voice & Advocacy | Story library | Racism / police-conduct complaint flow | Tebeka co-design |

## Stack (ADR-001)

| Layer     | Choice                                    |
| --------- | ----------------------------------------- |
| Framework | React Router v7 (Remix-current)           |
| Language  | TypeScript                                |
| DB        | PostgreSQL                                |
| ORM       | Drizzle                                   |
| Auth      | Auth.js                                   |
| CMS       | Payload (self-hosted)                     |
| Styling   | Tailwind + shadcn/ui (RTL-aware)          |
| i18n      | Paraglide JS                              |
| Storage   | Cloudflare R2                             |
| Email     | Resend (free tier)                        |
| Payments  | Stripe (transactional only)               |
| Hosting   | User's server + Cloudflare CDN free tier  |
| Analytics | Plausible self-hosted / Umami             |
| Errors    | GlitchTip self-hosted (Sentry-compatible) |

**Cost model**: zero monthly subscription where possible. All paid services use free tiers, all infra runs on user's server.

## Phases (v2 — 9 phases)

Vision v2 reorganizes the roadmap so information pillars launch *alongside* real-estate, not after it. This widens user acquisition (info pillars rank faster) while keeping real-estate as the monetization spine.

| #   | Phase                                              | Pillars activated         | Status                                  |
| --- | -------------------------------------------------- | ------------------------- | --------------------------------------- |
| 0   | Discovery & Audit                                  | —                         | 90% complete                            |
| 1   | Strategy & Architecture (skeleton + i18n + auth)   | (foundation)              | In progress                             |
| 2   | Design System & Brand (incl. crisis-mode pattern)  | (foundation)              | In progress                             |
| 3   | MVP: **Rights Hub + Real Estate** (parallel) ⭐    | 1, 2                      | Backlog (target: live in 6-8 weeks)     |
| 4   | Professionals Directory + Booking                  | 3                         | Planned                                 |
| 5   | Employment + Education Hub (parallel)              | 4, 5                      | Planned                                 |
| 6   | Health + Family Support (parallel; partner-gated)  | 6, 7                      | Planned (Tene Briut anchor required)    |
| 7   | Heritage, Culture & Community News                 | 8, 9                      | Planned                                 |
| 8   | Voice & Advocacy (Tebeka co-designed)              | 10                        | Planned                                 |
| 9   | Launch, Automation & Scale                         | (all)                     | Planned                                 |

## Trust anchors (must-have before sensitive launches)

- **Tene Briut** ([tene-briut.org.il](https://tene-briut.org.il/)) — co-byline for Health pillar (Phase 6).
- **Tebeka** ([tebeka.org.il](https://www.tebeka.org.il)) — co-design for Voice pillar; legal triage routing (Phase 3+ for rights, Phase 8 for Voice).
- **ENP / Fidel / Olim Beyahad / Tech-Career** — content + job feeds (Phase 5).
- **Heritage Center / Council of Kessim / IAEJ** — heritage and news (Phase 7).

## SEO Goal

Top organic ranking on Hebrew (and Amharic where relevant) queries around the community within 90 days of launch. Programmatic SEO across all pillars: city × topic × language. See [`docs/seo/`](./docs/seo) when populated.

## Monetization (portfolio model)

| Stream                                  | Pillar | Notes                                |
| --------------------------------------- | ------ | ------------------------------------ |
| Real-estate broker leads                | 2      | Primary revenue; validates R8        |
| Real-estate listing fees                | 2      | Stripe transactional                 |
| Professional referral fees / featured   | 3      | Stripe transactional                 |
| Employer job-posting fees               | 4      | Stripe transactional                 |
| Sponsored content (transparent only)    | 7,8,9  | Partner-only                         |
| Voluntary donations                     | All    | Optional                             |

Cost discipline (P5): zero monthly subscriptions. All infra self-hosted or free-tier. Stripe transactional only.

## Documentation

- [`docs/discovery/`](./docs/discovery) — Phase 0 deliverables
  - [`0.0-summary.md`](./docs/discovery/0.0-summary.md) — original Phase 0 summary
  - [`0.1-vision-v2.md`](./docs/discovery/0.1-vision-v2.md) — **comprehensive 10-pillar vision (current proposal)**
  - [`adr/`](./docs/discovery/adr/) — Architecture Decision Records (000-foundations, 001-stack)
  - [`risk-register.md`](./docs/discovery/risk-register.md) — R1–R18
  - [`interview-protocol.md`](./docs/discovery/interview-protocol.md) — Community interview protocol (will be expanded for v2 pillars)
- [`docs/research/`](./docs/research) — research synthesis
  - [`01-organizations-map.md`](./docs/research/01-organizations-map.md) — ecosystem map
  - [`02-community-needs-deep-dive.md`](./docs/research/02-community-needs-deep-dive.md) — community-needs research
- More as phases progress.

## Local development

Prereqs: **Node 22+**, **pnpm 9+**, **Docker** (for the dev DB).

```bash
# 1. Install deps
pnpm install

# 2. Wire the husky pre-commit hook (one-time, sandbox-safe)
mkdir -p .husky && printf '%s\n' "pnpm lint-staged" > .husky/pre-commit && chmod +x .husky/pre-commit

# 3. Bring up dev infra (postgres + redis + mailhog)
pnpm dev:up

# 4. Configure env
cp .env.example .env
# generate AUTH_SECRET: `openssl rand -base64 32` and paste into .env

# 5. Generate the DB schema migration (after Data lands schema files) + apply
pnpm db:generate
pnpm db:migrate
pnpm db:seed

# 6. Run the app
pnpm dev
```

Open http://localhost:3000 — root redirects to `/he`. Switch to `/en` or `/am` for the other locales. MailHog UI at http://localhost:8025 catches dev magic-link emails. Postgres on `:5432`, Redis on `:6379`.

`pnpm dev:up --profile payload` adds the standalone Payload service (separate DB on `:5433`, admin on `:3001`) — not wired into the RR7 app per Vega D1; reserved for Phase 4 (Rights Hub).

## Project layout

```
app/
  root.tsx                    # HTML shell, sets dir/lang from locale
  routes.ts                   # File-based RR7 routes
  routes/
    _index.tsx                # / -> /<locale>
    $lang.tsx                 # i18n layout (validate locale, set cookie, hreflang)
    $lang._index.tsx          # Homepage in HE/EN/AM
    $lang.login.tsx           # Google sign-in (Email returns once auth schema lands)
    $lang.dashboard.tsx       # Auth-required, uses requireUser()
    auth.$.tsx                # Auth.js v5 catch-all handler
    healthz.tsx               # Liveness probe (DB ping)
  app.css                     # Tailwind v4 entry + theme
  lib/
    env.server.ts             # Zod-validated process.env
    db.server.ts              # Drizzle Postgres client (connection pool)
    db/schema/                # Drizzle schemas (Data agent fills per ADR-002 + D3-D5)
    auth/auth.server.ts       # Auth.js v5 wired with Drizzle adapter
    auth/guards.ts            # requireUser / requireRole / requireAgencyAccess
    i18n/config.ts            # Locale list, direction, html lang
    i18n/cookie.server.ts     # tedros_locale cookie helpers
    i18n/messages.ts          # t(locale, key, vars) — JSON-backed runtime helper
    utils.ts                  # cn() — tailwind-merge + clsx
auth.config.ts                # Auth.js providers (no adapter — adapter wired in auth.server.ts)
drizzle.config.ts             # drizzle-kit config
react-router.config.ts        # RR7 framework config (SSR on)
vite.config.ts                # Vite + Tailwind v4 + Paraglide + RR7 plugins
project.inlang/settings.json  # Paraglide JS project settings
messages/{he,en,am}.json      # Translation messages (HE = source of truth)
docker-compose.dev.yml        # postgres + redis + mailhog + standalone payload
```

## Repo conventions

- Architecture Decision Records under `docs/adr/` (Phase 0 ADRs live in `docs/discovery/adr/`)
- TypeScript strict mode (with `noUncheckedIndexedAccess`)
- Conventional commits, reference TED-N when applicable
- PR per Multica issue when feasible

---

🤖 Built by a coordinated team of AI agents. Coordinator: Vega (Multica workspace `tedros`).
