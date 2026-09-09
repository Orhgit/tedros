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
# 384 MB is ~10x the 38 MB heap actually in use at idle, and the budget
# chain works out as:
#   --max-old-space-size=384  ->  V8 heap_size_limit 576 MB  (measured;
#                                 V8 adds ~192 MB of new space + reserve)
#   + ~120 MB non-heap RSS (server bundle, native, stacks; ~41 MB at idle)
#   = ~700 MB peak RSS, under the 768 MB mem_limit in
#     docker-compose.prod.yml.
# Staying under the container limit is the point: V8 hitting its own limit
# logs and exits so `unless-stopped` restarts cleanly, whereas the cgroup
# OOM killer SIGKILLs with no log at all. This caps the blast radius; it is
# not itself a leak fix.
ENV NODE_OPTIONS="--max-old-space-size=384"
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
