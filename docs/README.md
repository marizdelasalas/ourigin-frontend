# Ourigin frontend documentation

These docs explain how the Ourigin frontend is built, why it's built that way,
and where the work stands. Keep them current: update the relevant page in the
same change as the code it describes.

## Start here

| I want to… | Read |
| --- | --- |
| Run the app locally | [Getting started](getting-started.md) |
| See what's done and what's next | [Progress](progress.md) |
| Understand how the app is put together | [Architecture overview](architecture/overview.md) |
| Know which component layer something belongs in | [Components](architecture/components.md) |
| Find a colour, font size or breakpoint | [Design foundations](design-system/foundations.md), [Responsive layout](design-system/responsive-layout.md) |
| Understand why something was decided | [Architecture decisions](decisions/README.md) |
| Add a component or a page | [Adding components](guides/adding-components.md), [Adding pages](guides/adding-pages.md) |

## Contents

- [getting-started.md](getting-started.md): requirements, scripts, troubleshooting
- [progress.md](progress.md): current status, next steps and a dated log of changes
- `architecture/`
  - [overview.md](architecture/overview.md): stack, rendering model, routing, folder structure
  - [components.md](architecture/components.md): Atomic Design layers, rules and component inventory
  - [state-and-data.md](architecture/state-and-data.md): client state, the data access layer, the server/client boundary
- `design-system/`
  - [foundations.md](design-system/foundations.md): colour, typography, radius, shadow, icons, imagery
  - [responsive-layout.md](design-system/responsive-layout.md): breakpoints and what changes at each
  - [prototype-parity.md](design-system/prototype-parity.md): the design source, how parity is checked, intentional deviations
- `guides/`
  - [conventions.md](guides/conventions.md): code conventions, gotchas and the pre-merge checklist
  - [adding-components.md](guides/adding-components.md): choosing a layer, wrapping shadcn primitives, adding icons
  - [adding-pages.md](guides/adding-pages.md): new routes, replacing placeholders, navigation
- `decisions/`: architecture decision records (ADRs); start with the [index](decisions/README.md)

## Keeping the docs current

| When you… | Update |
| --- | --- |
| Change behaviour, structure, tooling or dependencies | Add an entry to the log in [progress.md](progress.md) |
| Make a decision that is costly to reverse or changes how others work | Add an ADR in [decisions/](decisions/README.md) |
| Add, rename, move or delete a component | The inventory in [architecture/components.md](architecture/components.md) |
| Change a token, font size scale or breakpoint | [design-system/](design-system/foundations.md) |
| Add or replace a route | [architecture/overview.md](architecture/overview.md#routes) and [progress.md](progress.md) |

Writing conventions:

- Use relative links so the docs work in the editor and on the Git host.
- Dates are written `YYYY-MM-DD`.
- Accepted ADRs are not rewritten. To change a decision, write a new ADR that
  supersedes the old one and update the old one's status.
