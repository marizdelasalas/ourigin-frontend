# ADR-0017: An independent Ourigin Figma library based on shadcn/ui

- **Status:** Superseded by [ADR-0018](0018-fresh-figma-design-system.md)
- **Date:** 2026-11-09
- **Origin:** Project owner
- **Amends:** [ADR-0016](0016-figma-library-on-obra-community-kit.md)

## Context

ADR-0016 started the Figma library from a copy of the Obra shadcn/ui Community
kit. The project owner then set a different end state: the Ourigin Design System
must not depend on Obra or on the Nova preset. Official shadcn/ui is the
structural reference, and the approved Ourigin UI is the visual one.

An audit of the file found that the Ourigin components used no Obra components.
They used only 7 Lucide icons from the kit's icon page, plus the kit's colour
and type variables, which already held Ourigin values. The kit's own components
are licensed CC BY 4.0, which allows adapting them with credit. Figma's tools
can't copy layers between files, so the migration happens inside the existing
file.

## Decision

- Convert the existing file in place. Nothing finished is rebuilt and no
  instances are detached.
- Build an independent shadcn/ui component library, one batch at a time, from
  the shadcn components in `src/components/ui` (and from the shadcn docs where
  the app has no equivalent). Use Ourigin variables, and name components and
  their properties after the React props (`variant`, `size`). Drop the "Nova"
  naming.
- Keep the kit's components on clearly marked **Legacy** pages until each has an
  independent replacement, then remove them. The Obra credit stays on the Cover
  page as long as any Obra-derived content remains.
- Rename variables into tiers: **Primitives** (colour, spacing, radius),
  **Semantic** (`shadcn/*` with the CSS variable names, plus `ourigin/*`
  product tokens), **Component** tokens and **Typography**. Kit-only
  collections are marked Legacy and deleted once nothing uses them.
- Use our own Lucide icons, generated from `lucide-react`, instead of the kit's.
- Split screens into a separate **Ourigin Application** file once the library is
  published.
- The code isn't changed. Aligning `components.json` (`"style": "radix-nova"`)
  with the library's naming is a separate future task.

## Consequences

- The library can be maintained without Obra. The last dependencies, the Legacy
  pages, go away as their replacements are built.
- Deletions need a backup first, and Figma's tools can't create one: the owner
  saves a named version in Figma before anything is deleted.
- Translucent colours (for example `bg-destructive/10`) are variables that
  reference another variable with an opacity, because Figma ignores a fill's own
  opacity when the colour is a variable.
- Shared components have two layers, as in the code: shadcn components (for
  example Button) and Ourigin components built on them (Ourigin/Button).

## Alternatives considered

- **Rebuild everything in a new file:** clean, but it throws away finished work
  and breaks instance links, since layers can't be copied between files.
- **Adapt the kit components and keep them:** permitted by the licence, but it
  leaves Obra's structure and naming in the final system, which the owner
  doesn't want.
- **Switch to another shadcn preset:** rejected. The aim is Ourigin's own look,
  not a different preset.
