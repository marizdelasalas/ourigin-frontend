# ADR-0004: shadcn/ui on Radix (`radix-nova`)

- **Status:** Accepted
- **Date:** 2026-11-09
- **Amended by:** [ADR-0013](0013-vite-and-react-router-instead-of-nextjs.md): `next-themes` was removed and `components/ui/sonner.tsx` is fixed to the light theme
- **Origin:** Implementation default (stated at kickoff)

## Context

The project owner chose shadcn/ui. CLI 4.23 asks for a component base
(`base` for Base UI, `radix` for Radix, `aria` for React Aria) and a preset
(`nova`, `vega`, `maia` and others). The CLI's default is now Base UI
(`base-nova`).

## Decision

We initialise shadcn with `-b radix -p nova`. The resulting `components.json`
has:

- style `radix-nova` and base colour `neutral`, overridden by Ourigin tokens
- CSS variables on, RSC on, the Lucide icon library
- the standard aliases (`@/components/ui`, `@/lib/utils`, `@/hooks`)

shadcn also installed its `cn` package, a faster drop-in replacement for clsx
and tailwind-merge, as `@/lib/utils`.

## Consequences

- Primitives use Radix APIs (`asChild` through `Slot`, `data-state`
  attributes).
- Switching to Base UI later means re-adding the primitives with the other
  base. The atoms in `components/atoms/` contain most of the brand styling,
  which limits the rewrite.
- Lucide (`lucide-react`) and `next-themes` stay installed because the
  generated checkbox and sonner components import them.
- `cn` has config pitfalls described in
  [conventions](../guides/conventions.md#cn-rules).

## Alternatives considered

- **Base UI (the current CLI default):** newer and actively developed, with a
  smaller set of examples. It's a good candidate if Radix maintenance becomes a
  concern; this is tracked in [progress.md](../progress.md#next-steps).
- **React Aria:** strong accessibility, with a different API model from the
  shadcn examples most contributors know.
