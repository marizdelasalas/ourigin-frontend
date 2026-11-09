# ADR-0005: Atomic Design layered over shadcn primitives

- **Status:** Accepted
- **Date:** 2026-11-09
- **Origin:** Project owner

## Context

The project owner asked for Atomic Design: atoms, molecules, organisms,
templates and pages. shadcn's CLI places primitives in `components/ui/` and
expects to be able to update them there.

## Decision

- `components/ui/` keeps shadcn's primitives exactly as the CLI generates them.
- `components/atoms|molecules|organisms|templates/` are the Atomic Design
  layers. Atoms wrap primitives with Ourigin variants.
- Routes in `src/app` act as Atomic Design's pages.
- Imports point down the hierarchy. Client state lives in `src/providers/`,
  beside the layers.

The full rules and inventory are in
[components](../architecture/components.md).

## Consequences

- `npx shadcn@latest add` and `--diff` keep working because generated files
  aren't edited.
- There's one extra layer between primitives and features. A brand change
  happens in one atom rather than in every use.
- Placement sometimes needs judgement. The
  [layer questions](../guides/adding-components.md#1-choose-the-layer) give a
  consistent answer.

## Alternatives considered

- **Point shadcn's `ui` alias at `components/atoms`:** one fewer layer, but
  composite primitives (Dialog, Tabs, Tooltip) would be classed as atoms, which
  blurs the hierarchy, and brand edits would land in CLI-managed files.
- **Feature folders** (`features/feed/…`): a good fit for a large product, but
  it isn't the structure that was asked for. It can be adopted inside the
  layers later if needed.
