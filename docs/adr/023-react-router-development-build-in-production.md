# ADR-023: `dist/development` in production stack traces is expected, and we do not patch it

**Status**: Accepted (2026-09-09).
**Owner**: Tedros DevOps.
**Related**: TED-166 (the OOM incident that raised the question), `Dockerfile`, `docker-compose.prod.yml`, `app/lib/http/no-action.ts`.

## Context

Production crashed 19 times with `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory`. Every stack frame in the container logs resolved through `node_modules/react-router/dist/development/chunk-*.mjs`, even though `NODE_ENV=production` was set in the image and confirmed inside the running container.

The natural reading is that the container is running React Router's development build, that the development build is heavier and retains more per error, and that this is the leak. That reading is wrong on both halves, and this ADR records the evidence so nobody spends another incident on it.

### There is no production build to select

`react-router@7.14.2` publishes both `dist/development/` and `dist/production/`. Its `exports` map references **only** `dist/development/`:

```
$ grep -c 'dist/production' node_modules/react-router/package.json
0
```

Every condition — `node`, `module`, `import`, `default`, `react-server` — points at `dist/development/`. There is no `production` condition to supply, so the usual mechanism does nothing:

```
$ NODE_ENV=production node --conditions=production \
    --input-type=module -e "console.log(import.meta.resolve('react-router'))"
file:///…/react-router/dist/development/index.mjs
```

This is not specific to 7.14.2. Spot-checking the registry, `7.13.2`, `7.15.0` and `7.18.3` all ship the same development-only `exports` map. `dist/production/` is published and unreachable in every 7.x we checked. Any React Router v7 app that externalises `react-router` — which is the default, and which our Vite server build does (`build/server/assets/server-build-*.js` contains a bare `import … from "react-router"`) — loads `dist/development` in production. The stack traces are normal.

### The two builds are the same code

The `dist/production` chunk is one byte different from the `dist/development` chunk:

```
$ diff <(dev chunk, hashes normalised) <(prod chunk, hashes normalised)
5589c5589
< var ENABLE_DEV_WARNINGS = true;
---
> var ENABLE_DEV_WARNINGS = false;
```

`ENABLE_DEV_WARNINGS` gates `console.warn` calls and a "Hey developer 👋" hint inside React Router's _default_ `ErrorBoundary`. We ship our own `ErrorBoundary` in `app/root.tsx`, so most of it is unreachable for us. It gates no allocation, no caching and no retention.

Critically, the error that the scanner flood actually produced is built in `getInternalRouterError`, outside every `ENABLE_DEV_WARNINGS` guard, and is byte-identical in both builds:

```js
return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
```

Loading `dist/production` would not have removed a single one of those `Error` objects.

## Decision

**Accept `dist/development` in production stack traces. Do not patch, alias, or otherwise force `dist/production`.**

Concretely: no `pnpm patch` on `react-router`'s `exports` map, no `resolve.alias` to `dist/production`, no `ssr.noExternal: ["react-router"]`, and no `--conditions=production` in `NODE_OPTIONS`.

The real fix for TED-166 is to stop generating the errors, which is what `app/lib/http/no-action.ts` and the catch-all `action` exports do, plus the memory ceiling in the `Dockerfile` and `docker-compose.prod.yml`.

## Consequences

- Production logs and any future error-reporting integration (GlitchTip) will keep showing `dist/development/` paths. **This is not a misconfiguration and is not evidence of a dev build being deployed.** Treat it as noise.
- We keep React Router's dev-only `console.warn`s in production. They are cheap, and in practice they fire for `<Routes>`/`useRoutes` patterns this app does not use.
- We carry no patch file, so React Router upgrades stay a version bump. A patched `exports` map would silently stop applying — or start conflicting — on every upgrade, in exchange for flipping one boolean.
- `ssr.noExternal: ["react-router"]` was rejected on a stronger ground than cost: `@react-router/express`, `@react-router/node` and `@react-router/serve` all `import "react-router"` at runtime and would keep resolving to `dist/development`. Bundling a second copy into the server build puts two React Router module instances, and therefore two sets of module-level contexts, in one process.

## Alternatives considered

**Upgrade React Router.** Rejected as a fix for _this_ — 7.15 through 7.18 ship the same development-only `exports` map, so it changes nothing here. Worth doing on its own merits, on its own issue.

**`pnpm patch` to add a `production` export condition, plus `NODE_OPTIONS=--conditions=production`.** This would work, and it is provable. Rejected on payoff: the measured benefit is `ENABLE_DEV_WARNINGS=false`, against the standing cost of a patch that must be re-validated on every upgrade.

**Report it upstream.** Worth doing, and not mutually exclusive with the above. `dist/production/` being published but unreferenced looks like a packaging bug rather than an intentional choice. Not blocking on it — an upstream fix would land as a version bump and change nothing we depend on.
