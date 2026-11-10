# Getting started

## Requirements

- **Node.js 22.22 or newer** (React Router 8's minimum; Vite 8 needs 22.12).
  The project was set up on Node 26.7.
- **npm.** The lockfile is `package-lock.json`; see
  [ADR-0012](decisions/0012-npm-as-package-manager.md).

Fonts are installed as npm packages (Fontsource), so builds don't need network
access beyond `npm install`.

## Run the app

```bash
npm install     # once, and after dependencies change
npm run dev     # starts the dev server
```

Open <http://localhost:3000>. Keep the terminal open while you work: closing it
or pressing `Ctrl+C` stops the server. To try the mobile layout on a phone on
the same Wi‑Fi, run `npm run dev -- --host`. The startup log then prints a
**Network** address (for example `http://192.168.x.x:3000`).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with fast refresh, on port 3000 |
| `npm run build` | Type-checks, then writes the production build to `dist/` |
| `npm run preview` | Serves `dist/` locally on <http://localhost:4173> (run `npm run build` first) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Type-checks the app and the Vite config (`tsc -b`) |

`npm run build` prints a warning that the JavaScript chunk is larger than
500 kB. That's expected for now
([ADR-0013](decisions/0013-vite-and-react-router-instead-of-nextjs.md#consequences)).

## Routes

| URL | Page |
| --- | --- |
| `/` | Home feed |
| `/inbox`, `/calendar`, `/messages`, `/organization`, `/goals`, `/people`, `/resources` | Placeholder pages |
| Anything else | Not-found page |

To see the phone layout in a desktop browser, make the window narrower than
701px or use the device toolbar in DevTools (`Cmd+Option+M` in Chrome).

## Deploying

`dist/` is a static site. Serve it from any static host and configure an
**SPA fallback**: every path that isn't a file must return `dist/index.html`,
so that a direct visit to `/inbox` works.

## Troubleshooting

#### "This site can't be reached", `ERR_CONNECTION_REFUSED`

Nothing is serving on port 3000. `npm install` only installs packages, so start
the server with `npm run dev` and leave it running.

#### Port 3000 is already in use

Vite picks the next free port and prints it. To choose one, run
`npm run dev -- --port 3001`. To find the process using 3000, run
`lsof -nP -iTCP:3000 -sTCP:LISTEN`.

#### `npm install` reports vulnerabilities

At the time of writing, the warnings come from development tooling (the shadcn
CLI and `typescript-eslint` dependencies). None of that code ships to the
browser. **Don't run `npm audit fix --force`**: it "fixes" them by downgrading
those packages to older major versions, which breaks the setup. Update normally
once patched versions are published.

#### `npm install` fails with `ERESOLVE` on `@babel/core`

The `overrides` entry in `package.json` prevents this. Keep it when editing
dependencies; [ADR-0013](decisions/0013-vite-and-react-router-instead-of-nextjs.md#consequences)
explains why.

#### A page shows the host's 404 when opened directly

The host has no SPA fallback. See [Deploying](#deploying).
