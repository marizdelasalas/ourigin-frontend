# ADR-0003: Next.js 16 App Router with Cache Components and `src/`

- **Status:** Superseded by [ADR-0013](0013-vite-and-react-router-instead-of-nextjs.md)
- **Date:** 2026-11-09
- **Origin:** Implementation default (Next.js recommended settings)

## Context

The project owner chose Next.js. The current release is 16.4, and its
recommended `create-next-app` settings are TypeScript, ESLint, Tailwind CSS,
the App Router, Turbopack, Cache Components and `AGENTS.md`.

## Decision

- Scaffold with `create-next-app` using the recommended settings plus a `src/`
  directory, with the `@/*` alias pointing to `src/*`.
- Keep `cacheComponents` and `partialPrefetching` enabled.
- Group workplace routes in the `(workplace)` route group so they share one
  layout without a URL segment.
- Treat `node_modules/next/dist/docs/` (referenced by `AGENTS.md`) as the
  version-matched documentation.

## Consequences

- All current routes prerender as static content. Dynamic data will need
  `'use cache'` or `<Suspense>` boundaries
  (see [adding pages](../guides/adding-pages.md)).
- Visited routes stay alive with React `<Activity>`, so page state survives
  navigation ([state and data](../architecture/state-and-data.md#route-preservation)).
- `next build` no longer runs ESLint, so linting is a separate step
  (`npm run lint`).
- Tailwind is compiled through the `@tailwindcss/turbopack` loader configured
  in `next.config.ts`.
- `next dev` re-adds its block to `AGENTS.md`. Commit it rather than fighting
  it.

## Alternatives considered

- **Without Cache Components:** the older caching model. It's not recommended
  for new projects on this version.
- **Pages Router:** a legacy routing model with no Server Components.
- **No `src/` directory:** it mixes application code with configuration files
  at the root.
