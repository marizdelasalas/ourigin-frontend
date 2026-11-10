# ADR-0014: Lucide icons for standard controls

- **Status:** Accepted
- **Date:** 2026-11-09
- **Origin:** Project owner
- **Amends:** [ADR-0007](0007-custom-duotone-icon-set.md)

## Context

ADR-0007 kept Lucide out of Ourigin components: every icon in the interface
came from the custom two-tone set. The project owner then asked for Lucide
icons in two places, for generic controls that users recognise by their
standard shapes:

- the account menu in the top bar: `ChevronDown`, `User`, `Settings`,
  `SlidersHorizontal`, `LogOut`
- the sidebar collapse toggle: `ChevronLeft` and `ChevronRight` at stroke 1.75

The two-tone set stays for navigation and content. When a Lucide `BookOpen`
was tried for Learning circle in the sidebar, the owner asked for the shared
two-tone `book-open` icon instead, so the same item looks the same everywhere.

## Decision

- Use Lucide for standard controls (menus, disclosure chevrons, panel
  toggles), where the generic shape is the point.
- Keep the two-tone set from `atoms/icon.tsx` for navigation destinations,
  content and anything that represents an Ourigin concept. When an item
  appears in several places, use the same icon in each.
- Brand imagery, such as the Ask Ourigin robot, stays an image asset; it isn't
  redrawn as an icon.

## Consequences

- The account menu and the sidebar toggle look like standard controls.
- Two icon styles now coexist, so choosing one is a judgement call. When
  unsure, use the two-tone set.
- The two-tone `panel-left-close` and `panel-left-open` icons are unused. They
  stay in `atoms/icon.tsx` until someone decides to remove them.

## Alternatives considered

- **Two-tone icons for these controls too:** consistent, but the owner chose the
  plainer Lucide shapes for the toggle and the menu.
- **Lucide everywhere:** the outline style the design moved away from
  (ADR-0007).
