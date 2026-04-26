# ADR-001: Stack — React Router v7 + Postgres + Drizzle + Auth.js + Payload

**Status**: Accepted (2026-04-26).
**Owner**: Vega (until Tedros Architect agent exists).

## Context

Tedros is a multi-tenant content + transactional platform:
- Tri-lingual day-1 (Hebrew RTL, English LTR, Amharic RTL with Ge'ez script).
- SEO-critical (programmatic landing pages per city × topic).
- Multi-role auth: end users, real-estate agencies (B2B onboarding + listing CRUD), admins (verification workflow).
- Real estate listings (sale, rent, urban renewal, investment, government programs), file uploads, leads, future Stripe billing.
- Hosted on user's existing server (Node-capable) + git ready.
- **No monthly subscription budget** — free tiers and self-hosted only.
- Performance budget: LCP < 1.5s.

## Decision

| Layer | Choice | Why |
|---|---|---|
| **Framework** | **React Router v7** (Remix-current) | Full-stack React, SSR + streaming, file-based routing, loaders + actions for data, no separate API service. User-rejected Next.js. |
| **Language** | TypeScript | Non-negotiable for safety + DX. |
| **DB** | **PostgreSQL** self-hosted on user's server | Mature, JSONB for flexible listings, FTS built-in. Free. |
| **ORM** | **Drizzle** | TypeScript-native, lightweight, framework-agnostic. |
| **Auth** | **Auth.js** | Mature, Remix/RR7-compatible, OAuth + email. RBAC in loaders/actions. |
| **CMS** | **Payload** self-hosted | Headless, TypeScript, multi-locale. Owns content + admin UI. Free. |
| **Styling** | **Tailwind + shadcn/ui** | RTL-aware, accessible, consistent. Free. |
| **i18n** | **Paraglide JS** | Compile-time, type-safe, fast. HE/EN/AM seamless. Free. |
| **File storage** | **Cloudflare R2** | Free 10GB, S3-compatible. |
| **Search** | **Postgres FTS** initially | Free. Meilisearch self-hosted later if needed. |
| **Email** | **Resend** | Free tier 3K/mo. |
| **Payments** | **Stripe** | Standard. Transactional fees only — no monthly. |
| **Hosting** | User's server (Node, RR7 server adapter) + Cloudflare CDN free tier | Per user's existing infrastructure. Free. |
| **Background jobs** | Node cron + queue on user's server (BullMQ + Redis self-hosted) | Free. |
| **Observability** | **GlitchTip** self-hosted (Sentry-compatible) + **Plausible** self-hosted | Free. |
| **Analytics** | Plausible self-hosted (privacy-friendly) + Google Search Console | Free. |

## Consequences

### Positive
- **Zero monthly subscription cost**. All infrastructure runs on user's server or free tiers.
- **One codebase**: UI + server logic + APIs + admin in RR7. Loaders/actions = no separate backend service.
- **React ecosystem**: huge component library, mature tooling.
- **Performance**: SSR + streaming + selective hydration → LCP < 1.5s achievable.
- **i18n + RTL**: Paraglide + Tailwind logical CSS make tri-lingual easier than most frameworks.

### Negative / Risks
- **RR7 ecosystem still catching up to Next.js** in third-party recipes. Mitigation: stick to first-party patterns + shadcn/ui.
- **Self-hosted observability** has setup cost (one-time). Mitigation: DevOps agent owns this.
- **No paid Sentry/Plausible support** — debugging incidents is on us. Acceptable for MVP scale.

## Alternatives Considered

- **Next.js** — rejected by user.
- **SvelteKit** — initial pick; user requested React.
- **Astro / Remix v2 / TanStack Start / RedwoodJS / Vite + Hono** — see TED-13 for full comparison.

## Override / Revisit

Architect agent (when created) is authorized to draft ADR-001-amendment based on Phase 0 final findings. P2 (hosting topology) may refine deployment specifics without changing this ADR.

## Change Log

- 2026-04-26 v1: SvelteKit + Lucia + shadcn-svelte (initial).
- 2026-04-26 v2: User requested React → React Router v7 + Auth.js + shadcn/ui.
- 2026-04-26 v3: User confirmed no monthly budget → swapped paid SaaS to self-hosted equivalents (Plausible, GlitchTip), removed managed Postgres in favor of self-hosted on user's server.
