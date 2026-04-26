# Tedros

**Ethiopian-Israeli community platform**: rights, professionals directory, and real estate (top priority).
Tri-lingual from day one: Hebrew (RTL), English (LTR), Amharic (RTL, Ge'ez script).

## Mission

> "לא רק לדעת — לקבל." — Not just to know — to receive.
> A platform where the community claims its rights, finds property, and trusts professionals from within.

## Status

In active development by an autonomous multi-agent team coordinated through [Multica](https://multica.ai).
Source of truth for plans, decisions, and live progress: the Multica workspace `tedros` (issues TED-1+).

## Stack (ADR-001)

| Layer | Choice |
|---|---|
| Framework | React Router v7 (Remix-current) |
| Language | TypeScript |
| DB | PostgreSQL |
| ORM | Drizzle |
| Auth | Auth.js |
| CMS | Payload (self-hosted) |
| Styling | Tailwind + shadcn/ui (RTL-aware) |
| i18n | Paraglide JS |
| Storage | Cloudflare R2 |
| Email | Resend (free tier) |
| Payments | Stripe (transactional only) |
| Hosting | User's server + Cloudflare CDN free tier |
| Analytics | Plausible self-hosted / Umami |
| Errors | GlitchTip self-hosted (Sentry-compatible) |

**Cost model**: zero monthly subscription where possible. All paid services use free tiers, all infra runs on user's server.

## Phases

| # | Phase | Status |
|---|---|---|
| 0 | Discovery & Audit | In progress |
| 1 | Strategy & Architecture | In progress (skeleton landed) |
| 2 | Design System & Brand | Backlog |
| 3 | MVP — Real Estate ⭐ | Backlog (target: live in 5-7 weeks) |
| 4 | Rights Hub | Planned |
| 5 | Professionals Directory | Planned |
| 6 | SEO Content Engine | Planned |
| 7 | Launch & Automation | Planned |

## SEO Goal

Top organic ranking on Hebrew queries around the community within 90 days of launch. See [`docs/seo/`](./docs/seo) when populated.

## Documentation

- [`docs/discovery/`](./docs/discovery) — Phase 0 deliverables (Discovery summary, ADRs, risk register, interview protocol)
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
    $lang.login.tsx           # Magic link + Google
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

- Architecture Decision Records under `docs/adr/`
- TypeScript strict mode (with `noUncheckedIndexedAccess`)
- Conventional commits, reference TED-N when applicable
- PR per Multica issue when feasible

---

🤖 Built by a coordinated team of AI agents. Coordinator: Vega (Multica workspace `tedros`).
