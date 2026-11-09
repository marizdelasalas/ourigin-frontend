# ADR-0012: npm as the package manager

- **Status:** Accepted
- **Date:** 2026-11-09
- **Origin:** Implementation default

## Context

pnpm was the intended default, but it isn't installed on the development
machine. npm 11, Yarn 1 and Bun are available. Installing a global tool wasn't
requested.

## Decision

We use **npm** and commit `package-lock.json`.

## Consequences

- No extra tooling is needed on any machine with Node.js.
- Every command in the docs uses npm or npx.
- Switching later means deleting `package-lock.json`, installing with the new
  manager, committing its lockfile, and updating the docs. Record that in a new
  ADR.

## Alternatives considered

- **pnpm:** faster, and disk-efficient through its content-addressable store.
  It isn't installed here; reconsider if the team standardises on it.
- **Bun:** fast, but less common in this stack's documentation and CI images.
