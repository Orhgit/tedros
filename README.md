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
| 1 | Strategy & Architecture | Backlog |
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

## Repo conventions

- Architecture Decision Records under `docs/adr/` (and `docs/discovery/adr/` for Phase 0)
- TypeScript strict mode
- Conventional commits
- PR per Multica issue when feasible

---

🤖 Built by a coordinated team of AI agents. Coordinator: Vega (Multica workspace `tedros`).
