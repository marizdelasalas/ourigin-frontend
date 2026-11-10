# ADR-0009: Data access layer over illustrative fixtures

- **Status:** Accepted
- **Date:** 2026-11-09
- **Amended by:** [ADR-0013](0013-vite-and-react-router-instead-of-nextjs.md): the getters no longer import `server-only`; `HomePage` reads them with `use()`
- **Origin:** Implementation default

## Context

There's no API yet. The design's content (the Northstar workspace, its people
and posts) is illustrative, but the pages should be written the way they will
work once real data exists.

## Decision

- Keep the content as typed fixtures in `src/lib/data/`, with shared types in
  `src/types/workplace.ts`.
- Pages read page data only through async getters in `src/lib/data/index.ts`
  (`getHomeFeed`, `getWorkplaceContext`). That module imports `server-only`.
- Static reference data (navigation, the signed-in user, demo copy) can be
  imported directly, including by client components.

## Consequences

- Replacing fixtures with API calls changes the getters, not the components
  ([connecting a real API](../architecture/state-and-data.md#connecting-a-real-api)).
- `server-only` makes the build fail if a client component imports the getters.
- When the user and navigation come from the backend, the direct imports of
  reference data will need to move behind getters or into providers.

## Alternatives considered

- **Importing fixtures directly in templates:** simpler today, but every
  component would change when the API arrives.
- **Mock API route handlers:** more realistic, but they add a network hop and
  code that would be thrown away.
