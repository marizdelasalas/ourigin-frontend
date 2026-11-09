# ADR-0001: Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-11-09
- **Origin:** Project owner

## Context

The project needs a living record of its progress and of the reasons behind
its structure, so that new contributors don't have to reconstruct them from
the code.

## Decision

We will keep documentation in `docs/` next to the code:

- [progress.md](../progress.md) for status, next steps and a dated change log
- ADRs in `docs/decisions/` for significant decisions, in the format of
  [template.md](template.md)
- reference pages under `architecture/`, `design-system/` and `guides/`

Documentation is updated in the same change as the code it describes.

## Consequences

- Reviews check documentation as well as code.
- Accepted ADRs are immutable; changes are made by superseding them, which
  keeps the history readable.
- The docs are plain Markdown with Mermaid diagrams, so they render on common
  Git hosts without extra tooling.

## Alternatives considered

- **A wiki outside the repository:** it drifts from the code and isn't
  reviewed with changes.
- **README only:** it can't hold decision history without becoming hard to
  read.
