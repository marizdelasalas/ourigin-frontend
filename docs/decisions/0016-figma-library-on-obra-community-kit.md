# ADR-0016: Figma library on the Obra shadcn/ui Community kit

- **Status:** Superseded by [ADR-0018](0018-fresh-figma-design-system.md)
- **Date:** 2026-11-09
- **Origin:** Project owner

## Context

The project owner wants Figma as the central design workspace: a shadcn/ui
component library with Ourigin branding, Ourigin's own components, and the
application pages, all editable and built from variables. The team is on the
Figma Pro plan. shadcn/ui publishes no official Figma kit; its
[Figma page](https://ui.shadcn.com/docs/figma) lists community and paid kits.

The options were a paid kit (Obra shadcn/ui Pro, from $249, every component in
all styles), a free kit, or building every component from the code. The owner
chose the free Obra shadcn/ui Community kit after weighing the effort of
building from scratch.

## Decision

- The library lives in one Figma file, **Ourigin Design System**, in the
  Ourigin team. It starts from a copy of the
  [Obra shadcn/ui Community kit](https://www.figma.com/community/file/1514746685758799870/obra-shadcn-ui)
  (Nova style, light mode, CC BY 4.0).
- The kit's variables are re-pointed to Ourigin's values from
  `src/styles/globals.css`, with each variable's web code syntax set to the
  CSS variable (for example `var(--primary)`). Kit components are re-skinned
  through those variables, not edited one by one.
- Ourigin components get their own pages, are built from instances of the kit
  and of each other, and describe their source file in the component
  description.
- Components the kit only offers in Pro are built when the app needs them.
  Round 1 needed only Sonner (`Ourigin/Toast`).
- The code stays the source of truth. Differences and Figma approximations are
  listed on the file's "Ourigin vs shadcn" page and in
  [the Figma guide](../design-system/figma.md).

## Consequences

- The Community licence requires credit to Obra Studio BV and a note that
  changes were made. Both are on the file's brand and differences pages.
- The kit has 30 editable components. The other 23 (Sidebar, Sheet, Command,
  Skeleton, Progress, Slider, Toggle, Date Picker and more) are view-only and
  have to be built if a design needs them.
- Re-skinning through variables means a kit update can be merged by re-pointing
  variables again, but customised kit components would need manual merging.
- Code Connect needs an Organization or Enterprise plan, and the Variables REST
  API needs Enterprise, so on Pro tokens are synced by an agent run or a plugin
  export (see the guide). Revisit if the plan changes.

## Alternatives considered

- **Obra shadcn/ui Pro (paid):** complete and the closest match, but a cost the
  owner chose not to take on for now.
- **Build every component from the code:** an exact match with no licence
  conditions, but the slowest option.
- **Obra Community+ (free, all 65 components, until 2026-11-20):** requires a
  company sign-up; the owner may still apply and swap the base file.
