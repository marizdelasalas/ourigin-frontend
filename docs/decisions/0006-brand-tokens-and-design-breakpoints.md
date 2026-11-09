# ADR-0006: Brand tokens and design-specific breakpoints

- **Status:** Accepted
- **Date:** 2026-11-09
- **Origin:** Implementation default

## Context

The design specifies exact colours, radii, shadows and pixel font sizes. Its
layout changes at 650, 700, 1050/1150, 1350 and 1500px, which don't line up
with Tailwind's default breakpoints (640, 768, 1024, 1280, 1536). shadcn
primitives read semantic CSS variables such as `--primary` and `--border`.

## Decision

- Map shadcn's semantic tokens to the brand palette in `globals.css`, using the
  brand guide's hex values.
- Add product tokens (`divider`, `tile`, `chip`, `nav-icon`, status colours),
  radii (`card`, `tile`, `control`), shadows and the `bg-backdrop` utility.
- Replace Tailwind's breakpoints with the design's: `sm` 651, `md` 701, `lg`
  1151, `xl` 1351, `2xl` 1500px. Write styles mobile-first.
- Keep the design's small font sizes as arbitrary pixel values.
- Ship a light theme only, because the design has no dark mode.
- Extend `cn` in `@/lib/utils` with the custom radius and shadow names.

Details are in [foundations](../design-system/foundations.md) and
[responsive layout](../design-system/responsive-layout.md).

## Consequences

- The layout matches the prototype at every width
  ([parity results](../design-system/prototype-parity.md#how-parity-is-verified)).
- `md:` means 701px here, not Tailwind's default 768px. Contributors need to
  know this.
- Primitives use the default `cn`, so custom radius and shadow names must not
  be passed into them
  ([cn rules](../guides/conventions.md#cn-rules)).
- Adding dark mode later means defining a `.dark` palette and reviewing the
  arbitrary colour values.

## Alternatives considered

- **Tailwind's default breakpoints:** they would need a scatter of arbitrary
  `min-[701px]:` variants, or they'd drift from the design.
- **A token for every font size:** the design uses more than a dozen one-off
  sizes, so a scale wouldn't simplify anything.
