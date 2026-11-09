# ADR-0010: Placeholder routes for unbuilt sections

- **Status:** Accepted
- **Date:** 2026-11-09
- **Origin:** Project owner

## Context

The design covers only the Home feed. In the prototype, the sidebar
destinations open an illustrative dialog. The project owner wanted real routes
so the app's structure is in place for future sections.

## Decision

- Inbox, Calendar, Messages, Organization, Goals, People and Resources each get
  their own route folder in `(workplace)`, rendering `SectionTemplate`: a page
  heading plus a "coming soon" empty state.
- Navigation items are links, and the active state follows the URL.
- "Open calendar" in the Today panel links to `/calendar`.
- Destinations that aren't sections (rail items, post menus, notifications,
  help, profile) keep the prototype's demo dialog.
- Each route has its own folder rather than a dynamic `[section]` route, so
  each section can grow independently.

## Consequences

- The shell, navigation states and metadata are exercised on every route.
- The section descriptions and "coming soon" copy were written for this build
  and need review (see [progress.md](../progress.md#next-steps)).
- Search only has results on Home. Pressing Enter in search on another route
  goes to Home.

## Alternatives considered

- **Home only, keeping the prototype's demo dialogs:** a closer match to the
  prototype, but no route structure to build on.
- **A dynamic `[section]` route:** less repetition now, but it couples
  unrelated sections.
