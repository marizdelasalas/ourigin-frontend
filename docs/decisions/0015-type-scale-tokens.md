# ADR-0015: Type scale tokens with a 12px minimum

- **Status:** Accepted
- **Date:** 2026-11-09
- **Origin:** Project owner
- **Amends:** [ADR-0006](0006-brand-tokens-and-design-breakpoints.md)

## Context

ADR-0006 kept the design's small font sizes as one-off pixel values copied from
the prototype (7–12px), and rejected a token for every size. The project owner
found that text too small to read comfortably and asked for larger sizes
through shared tokens. Two parts of the request conflicted: "about 1–2px
larger" and minimums such as 12px for metadata and 14px for body text. Asked
to choose, the owner picked the guide's minimums.

## Decision

- Interface text uses three tokens, defined in `globals.css` and registered
  with `cn`:
  - `text-caption`, 12px: metadata, timestamps, tags, pills, eyebrows
  - `text-detail`, 13px: secondary text and descriptions
  - `text-body`, 14px: body copy, navigation, buttons, labels, list and menu
    items
- The base text is 14px. Nothing goes below 12px.
- Shared components carry their own sizes: the `Button` atom is 14px, `Pill`
  is 12px, and heading levels stay in `atoms/heading.tsx`.
- Inside shadcn primitives, write the token as `text-(length:--text-body)`.

## Consequences

- Text is easier to read, and new components pick sizes by role, not by copying
  pixel values.
- Pages are taller: Home at 1440px went from 1833px to 2112px. Some rail
  descriptions and the tablet sidebar wrap onto more lines. Phone tabs widened
  from 58px to 66px.
- The prototype's per-breakpoint size steps (for example 10px on phones and
  11px from `md`) are gone. Most text is now the same size at every width.
- Parity measurements taken before 2026-11-09 no longer apply.

## Alternatives considered

- **+1–2px on every size:** closest to the approved proportions, but small
  metadata would stay around 10px.
- **The middle of each recommended range** (for example 15px body): the most
  readable, but the biggest change to the approved density.
