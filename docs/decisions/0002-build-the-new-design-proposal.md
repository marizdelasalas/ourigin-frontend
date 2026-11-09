# ADR-0002: Build the "New design proposal"

- **Status:** Accepted
- **Date:** 2026-11-09
- **Origin:** Project owner

## Context

The brand identity proposal is a single HTML file that bundles three pages:

- the brand guide
- a rebrand of the team's existing prototype
- a "New design proposal"

The inner pages open as `blob:` URLs whose IDs change on every load, so the
link that was shared couldn't identify which page was meant. Both product pages
show the same Home feed, but they differ in layout, fonts and icons.

## Decision

We build the **"New design proposal"** (`direction.html`, sections 07–08 of the
guide). The brand guide (`index.html`) is the reference for tokens, fonts and
iconography. The existing-prototype rebrand (`sample.html`) isn't used. The
goal is visual and behavioural parity at every breakpoint.

## Consequences

- The design brings these choices with it:
  - Manrope and Inter fonts
  - two-tone icons ([ADR-0007](0007-custom-duotone-icon-set.md))
  - a collapsible labelled sidebar and a phone tab bar
  - the context rail to the left of the feed
- Elements that the proposal hides at every width are omitted.
- Deliberate deviations from the prototype are listed in
  [prototype parity](../design-system/prototype-parity.md#intentional-deviations).
  Any new deviation should be added there.

## Alternatives considered

- **Existing prototype rebrand:** this is the team's current layout with
  Ourigin colours (flat cards, Lucide icons, Source Sans 3). It doesn't match
  the brand guide's typography or icon style.
