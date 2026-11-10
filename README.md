# Ourigin frontend

The Ourigin workplace, a people-centred workplace for employees, teams and
leaders. It's built from the **"New design proposal"** in the Ourigin brand
identity proposal. The Home feed matches the design at every breakpoint; the
other sections are placeholder routes for now.

**Stack:** React 19 · TypeScript · Vite 8 · React Router 8 · Tailwind CSS v4 ·
shadcn/ui on Radix · Atomic Design. It's a frontend-only single-page app with
mock data. The API (NestJS and PostgreSQL) will be a separate service.

## Quick start

Requires Node.js 22.22 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000> and keep the terminal running. For other scripts
and troubleshooting, see [Getting started](docs/getting-started.md).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Type-check and production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | Type-check only |

## Documentation

The living documentation is in [`docs/`](docs/README.md):

| | |
| --- | --- |
| [Progress](docs/progress.md) | Current status, next steps and a dated change log |
| [Architecture overview](docs/architecture/overview.md) | Stack, rendering, routes and folder structure |
| [Components](docs/architecture/components.md) | Atomic Design layers, rules and component inventory |
| [State and data](docs/architecture/state-and-data.md) | Providers, route preservation and the data access layer |
| [Design system](docs/design-system/foundations.md) | Tokens, typography, icons, [breakpoints](docs/design-system/responsive-layout.md) and [prototype parity](docs/design-system/prototype-parity.md) |
| [Guides](docs/guides/conventions.md) | Conventions, [adding components](docs/guides/adding-components.md) and [adding pages](docs/guides/adding-pages.md) |
| [Decisions](docs/decisions/README.md) | Architecture decision records (ADRs) |

## Project layout

```
docs/                 Living documentation
index.html            HTML entry: meta tags, icons, #root
public/               App icons, served as-is
src/
├── main.tsx          Entry: fonts, global CSS, router
├── app/              Route table, layouts and route preservation
├── pages/            Pages: a template filled with data
├── styles/           globals.css (Tailwind, tokens, breakpoints)
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
2. Before merging, run `npm run typecheck`, `npm run lint` and `npm run build`,
   and check the layout at 390, 900 and 1440px.
3. Update the docs in the same change:
   - add a log entry in [progress.md](docs/progress.md)
   - add an [ADR](docs/decisions/README.md) for any significant decision
   - update the [component inventory](docs/architecture/components.md#inventory)
     when components change
