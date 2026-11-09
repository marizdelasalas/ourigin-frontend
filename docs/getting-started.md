# Getting started

## Requirements

- **Node.js 20.9 or newer.** The project was set up on Node 26.7.
- **npm.** The lockfile is `package-lock.json`; see
  [ADR-0012](decisions/0012-npm-as-package-manager.md).
- **Network access on the first build.** `next/font` downloads Manrope and
  Inter from Google Fonts at build time and self-hosts them.

## Run the app

```bash
npm install     # once, and after dependencies change
npm run dev     # starts the dev server
```

Open <http://localhost:3000>. Keep the terminal open while you work: closing it
or pressing `Ctrl+C` stops the server. The startup log also prints a
**Network** address (for example `http://192.168.x.x:3000`) that a phone on the
same Wi‑Fi can open to try the mobile layout.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with Turbopack and fast refresh |
| `npm run build` | Production build. Every route is prerendered as static content |
| `npm start` | Serves the production build (run `npm run build` first) |
| `npm run lint` | ESLint (Next 16's `next build` no longer lints) |
| `npx tsc --noEmit` | Type-check the project |
| `npx next typegen` | Regenerates route types such as `LayoutProps` (dev and build also do this) |

## Routes

| URL | Page |
| --- | --- |
| `/` | Home feed |
| `/inbox`, `/calendar`, `/messages`, `/organization`, `/goals`, `/people`, `/resources` | Placeholder pages |
| Anything else | Not-found page |

To see the phone layout in a desktop browser, make the window narrower than
701px or use the device toolbar in DevTools (`Cmd+Option+M` in Chrome).

## Troubleshooting

#### "This site can't be reached", `ERR_CONNECTION_REFUSED`

Nothing is serving on port 3000. `npm install` only installs packages, so start
the server with `npm run dev` and leave it running.

#### Port 3000 is already in use

Run on another port with `npm run dev -- -p 3001`, or find the process with
`lsof -nP -iTCP:3000 -sTCP:LISTEN`.

#### `npm install` reports vulnerabilities

At the time of writing, the warnings come from development tooling (the shadcn
CLI and `eslint-config-next` dependencies). None of that code ships to the
browser. **Don't run `npm audit fix --force`**: it "fixes" them by downgrading
those packages to older major versions, which breaks the setup. Update normally
once patched versions are published.

#### Fonts fail to download during a build

The build needs network access to fetch Google Fonts the first time. Retry when
you're online.

#### `LayoutProps` or other route types are missing in the editor

Run `npx next typegen`, or start the dev server once.

#### `AGENTS.md` keeps reappearing in the diff

`next dev` writes that block on purpose. Commit it with your work.
