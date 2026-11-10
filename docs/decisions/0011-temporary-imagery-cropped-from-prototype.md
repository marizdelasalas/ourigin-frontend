# ADR-0011: Temporary imagery cropped from the prototype

- **Status:** Accepted
- **Date:** 2026-11-09
- **Amended by:** [ADR-0013](0013-vite-and-react-router-instead-of-nextjs.md): the images render as plain `<img>` elements from Vite static imports, not `next/image`
- **Origin:** Project owner

## Context

The prototype has no standalone photos. Its avatars (Nora Chen, Priya Nair,
Amira Hassan) and the team photo are CSS crops of a screenshot of an older
prototype. At native size they're about 39×39px and 202×59px.

## Decision

- Cut each crop out at native resolution into its own image file in
  `src/assets/people/` and `src/assets/content/`.
- Render them with `next/image` through static imports.
- People without a photo get an initials fallback (`UserAvatar`).

## Consequences

- The app matches the design visually today.
- The images look soft on high-density screens until they're replaced.
- To replace them, swap the files (or point `Person.avatar` at a URL and allow
  the host in `images.remotePatterns`). No component changes are needed.

## Alternatives considered

- **Initials-only avatars:** clean, but they don't match the design.
- **Waiting for real photos:** blocks parity work. The swap is cheap either
  way.
