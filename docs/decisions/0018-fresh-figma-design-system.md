# ADR-0018: A fresh Figma design system in two new files

- **Status:** Accepted
- **Date:** 2026-11-10
- **Origin:** Project owner
- **Supersedes:** [ADR-0016](0016-figma-library-on-obra-community-kit.md) and [ADR-0017](0017-independent-figma-library.md)

## Context

ADR-0016 started the Figma library from the Obra shadcn/ui Community kit, and
ADR-0017 began converting that file in place into an independent library. The
project owner then chose a simpler path: stop migrating the kit-based file and
start again in new files. The new library must not use the Obra or Nova kits or
any other third-party UI kit. It should use the official shadcn/ui
documentation as its component reference and the React app as its visual
reference. Figma becomes the place where design changes start.

## Decision

- Two new Figma files in the Ourigin team: **Ourigin — Design System** (the
  library) and **Ourigin — Application** (screens, one page per module).
- The old Obra-based file is kept as a backup and is no longer maintained.
- Variables are created from `src/styles/globals.css` in five collections:
  Primitives, Color, Spacing, Radius and Typography. Names follow the CSS
  (`primary` is `--primary`, `brand/deep-teal` is `--brand-deep-teal`,
  `radius/lg` is `--radius-lg`). Each variable's web code syntax holds the
  exact CSS, so a later Figma-to-code sync can map one to one. Colours that are
  literal values in CSS are literal in Figma, and colours that reference a brand
  variable in CSS are aliases.
- shadcn/ui components are built in the file from the docs and from
  `src/components/ui`, starting with the 12 the app uses. Their properties are
  named after the React props (`variant`, `size`). Ourigin's own components
  (`src/components/atoms`, `molecules`, `organisms`) are rebuilt from the code
  with the same tokens.
- Icons are generated from `lucide-react` and from the app's two-tone icon set.
  Images are uploaded from `src/assets`.
- Screens are built in the Application file from published library instances,
  starting with Home.
- The React app isn't changed, and token sync isn't set up yet.

## Consequences

- No kit licence applies to the new files. Only shadcn/ui (MIT), Lucide (ISC)
  and the fonts (OFL) are credited.
- Instances in the Application file need the library to be published, which is
  a manual step in Figma.
- Work done in the old file (round 1 and the migration) isn't carried over as
  layers, because layers can't be copied between files. Its measurements were
  reused to rebuild the Ourigin components.
- Values that are arbitrary in code (for example `gap-[9px]`) stay as numbers in
  Figma; values on the Tailwind scale are bound to variables. Hex colours
  hard-coded in components are `component/*` variables, which are candidates for
  CSS variables later.

## Alternatives considered

- **Keep converting the kit-based file (ADR-0017):** preserves finished layers,
  but leaves kit structure and licence obligations in the file for longer, and
  is slower to reason about.
- **A paid or community shadcn kit:** faster to start, but the owner wants no
  third-party kit.
