# syntax=docker/dockerfile:1.7
# Multi-stage build for Tedros (React Router v7 SSR).
# Stages:
#   deps   — installs all dependencies (incl. dev) for the build
#   build  — runs `pnpm build` to produce build/server + build/client
#   runner — final image; carries node_modules so `pnpm db:migrate`
#            (drizzle-kit) works via `docker compose run --rm tedros`.

FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
WORKDIR /app
COPY . .
RUN pnpm build

FROM node:22-alpine AS runner
RUN corepack enable && corepack prepare pnpm@9 --activate \
    && apk add --no-cache curl tini
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# Bound V8's old space (TED-166). Unset, Node sizes the old-space heap from
# the host's RAM — measured `heap_size_limit` is 4288 MB — so a leaking
# Tedros process grows into the gigabytes before `FATAL ERROR: Reached heap
# limit`, starving postgres, redis and the other project on the 7.6 GB box
# on its way down.
#
# SIZING (revised 2026-09-10 after a production regression).
#
# The first attempt set this to 384 MB. That was wrong and made things
# materially worse: crashes went from ~19 per 18 hours to 13 per 2 hours,
# a ~10x increase in restart frequency, because the leak simply reached a
# much nearer ceiling. Each restart is a short outage.
#
# The leak is real and is NOT the scanner traffic that motivated the
# earlier fix: crash logs show the heap climbing steadily to the ceiling
# over ~26 minutes of ordinary SSR — rights x city, heritage and
# scholarship pages, all 200/404 in 15-30 ms — while Googlebot crawls the
# ~9,250-URL matrix. Capping the heap does not slow that climb; it only
# decides how often the process dies.
#
# So the ceiling's job is blast radius, not crash prevention, and it should
# sit as high as the box safely allows. The host has 7.6 GB with ~5 GB
# free; postgres and redis are the neighbours that must not be starved.
#   --max-old-space-size=1536  + non-heap RSS  ->  well under
#   the 2 GB mem_limit in docker-compose.prod.yml.
# Staying under the container limit still matters: V8 hitting its own
# limit logs and exits so `unless-stopped` restarts cleanly, whereas the
# cgroup OOM killer SIGKILLs with no log at all.
#
# This is a mitigation. The leak itself is still open.
ENV NODE_OPTIONS="--max-old-space-size=1536"
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/app /app/app
COPY --from=build /app/drizzle.config.ts /app/drizzle.config.ts
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/pnpm-lock.yaml /app/pnpm-lock.yaml
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -fsS http://127.0.0.1:3000/healthz || exit 1
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["pnpm", "start"]
