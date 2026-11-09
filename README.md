# Ourigin frontend

The Ourigin workplace, a people-centred workplace for employees, teams and
leaders. It's built from the **"New design proposal"** in the Ourigin brand
identity proposal. The Home feed matches the design at every breakpoint; the
other sections are placeholder routes for now.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS v4 ·
shadcn/ui on Radix · Atomic Design

## Quick start

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000> and keep the terminal running. For other scripts
and troubleshooting, see [Getting started](docs/getting-started.md).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type-check |

## Documentation

The living documentation is in [`docs/`](docs/README.md):

| | |
| --- | --- |
| [Progress](docs/progress.md) | Current status, next steps and a dated change log |
| [Architecture overview](docs/architecture/overview.md) | Stack, rendering, routes and folder structure |
| [Components](docs/architecture/components.md) | Atomic Design layers, rules and component inventory |
| [State and data](docs/architecture/state-and-data.md) | Providers, the data access layer and the server/client boundary |
| [Design system](docs/design-system/foundations.md) | Tokens, typography, icons, [breakpoints](docs/design-system/responsive-layout.md) and [prototype parity](docs/design-system/prototype-parity.md) |
| [Guides](docs/guides/conventions.md) | Conventions, [adding components](docs/guides/adding-components.md) and [adding pages](docs/guides/adding-pages.md) |
| [Decisions](docs/decisions/README.md) | Architecture decision records (ADRs) |

## Project layout

```
docs/                 Living documentation
src/
├── app/              Routes ("pages"): (workplace)/ shares the workplace shell
├── components/
│   ├── ui/           shadcn primitives, managed by the CLI
│   ├── atoms/        → molecules/ → organisms/ → templates/
├── providers/        Client state (feed view, demo dialog, Home feed)
├── lib/              cn() and the data access layer (lib/data)
├── types/            Domain types
└── assets/           Brand symbol and images
```

See the [architecture overview](docs/architecture/overview.md#folder-structure)
for the full tree.

## Contributing

1. Follow the [conventions](docs/guides/conventions.md), especially the
   [layering rules](docs/architecture/components.md#rules) and the
   [`cn` rules](docs/guides/conventions.md#cn-rules).
2. Before merging, run `npx tsc --noEmit`, `npm run lint` and `npm run build`,
   and check the layout at 390, 900 and 1440px.
3. Update the docs in the same change:
   - add a log entry in [progress.md](docs/progress.md)
   - add an [ADR](docs/decisions/README.md) for any significant decision
   - update the [component inventory](docs/architecture/components.md#inventory)
     when components change
