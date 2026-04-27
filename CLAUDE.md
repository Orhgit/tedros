# Tedros — Repo Instructions for AI Agents

This repo is built and maintained by a multi-agent team coordinated through Multica (workspace `tedros`).

## Source of truth

- **Plans, decisions, status**: Multica issues (TED-N). The `multica` CLI is the canonical interface.
- **Code, ADRs, content**: this repo.

## Agent roster

| Agent                      | Domain                                           |
| -------------------------- | ------------------------------------------------ |
| Vega (coordinator)         | Cross-cutting; tech lead until specialists exist |
| Tedros PM                  | Issue splitting, DoD, sequencing                 |
| Tedros Researcher          | Market, SEO, community insights                  |
| Tedros Architect           | ADRs, data models, decisions                     |
| Tedros Designer            | UX/UI, design system, RTL, accessibility         |
| Tedros Engineer            | Full-stack RR7 (UI + server + auth + CRUD)       |
| Tedros Data & Integrations | DB schema, CMS, sync workers, third-party        |
| Tedros Content & SEO       | Programmatic content, copy, optimization         |
| Tedros QA                  | Tests, accessibility, performance, regression    |
| Tedros DevOps              | CI/CD, hosting, monitoring, autopilots           |

## Conventions

- **Languages**: All UI strings authored in Hebrew first, mirrored to English and Amharic via Paraglide messages.
- **Commits**: Conventional commits. Reference TED-N when applicable.
- **ADRs**: `docs/adr/NNN-title.md` with Context / Decision / Consequences / Alternatives.
- **Risk**: New risks appended to `docs/discovery/risk-register.md`.
- **PRs**: One per Multica issue when feasible. Tag the next agent in the chain when handing off.

## Cost discipline

User has stated no monthly budget — favor free tiers and self-hosted alternatives over paid SaaS:

- Cloudflare CDN (free), Cloudflare R2 (free 10GB)
- Resend (free 3K/mo)
- Plausible self-hosted or Umami
- GlitchTip self-hosted (Sentry alternative)
- Postgres + Payload on user's existing server

Stripe is fine — transactional only, no monthly cost.
