# ADR-0007: Custom two-tone icon set

- **Status:** Accepted
- **Date:** 2026-11-09
- **Origin:** Implementation default

## Context

The brand guide specifies custom two-tone icons: solid, rounded shapes with a
lighter secondary layer. The design proposal replaces all of the prototype's
Lucide outline icons with them. The icons only existed as SVG strings inside
the prototype's script.

## Decision

- Generate `src/components/atoms/icon.tsx` from the prototype's markup: 27
  interface icons plus the sidebar's collapse and expand icons.
- Expose them through `<Icon name="…" />`, with names typed as `IconName`.
- Every shape uses `currentColor`.
- Don't use Lucide in Ourigin components.

## Consequences

- Icons match the design exactly. They render as inline SVG on the server, with
  no icon font or sprite request.
- New icons are drawn by hand to the brand rules
  ([adding an icon](../guides/adding-components.md#5-add-an-icon)), not picked
  from a library.
- Lucide stays installed because shadcn primitives use it internally
  ([ADR-0004](0004-shadcn-ui-on-radix.md)).

## Alternatives considered

- **Lucide:** shadcn's default and already installed, but it's the outline
  style the design moved away from.
- **SVG sprite or icon font:** adds a request and makes per-shape opacity
  harder.
