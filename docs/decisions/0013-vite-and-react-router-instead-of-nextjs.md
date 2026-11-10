# ADR-0013: Vite and React Router instead of Next.js

- **Status:** Accepted
- **Date:** 2026-11-09
- **Origin:** Project owner
- **Supersedes:** [ADR-0003](0003-nextjs-app-router-with-cache-components.md)

## Context

The project owner decided to run the frontend as a standalone React
application rather than on Next.js. A NestJS API with PostgreSQL will follow
later as a separate service, so the frontend has no need for a server of its
own. The approved UI, interactions, TypeScript code and mock data had to stay
exactly as they were.

The Next.js app used these framework features:

- App Router routes, layouts and the `(workplace)` route group
- `next/link`, `next/navigation` (`usePathname`, `useRouter`)
- `next/image` with static imports
- `next/font/google` for Inter and Manrope
- the Metadata API (title template, description, viewport, app icons)
- async Server Components reading a `server-only` data layer
- Cache Components, which kept recently visited routes alive with React
  `<Activity>`, so Home's state survived navigation

No Server Actions, route handlers, middleware or environment variables were in
use.

## Decision

We build and serve the app with **Vite** and route on the client with
**React Router** in data mode (`createBrowserRouter`). Each Next.js feature is
replaced as follows:

| Next.js | Replacement |
| --- | --- |
| `app/` routes, layouts, route group | Route table in `src/app/router.tsx`; `RootLayout` and `WorkplaceLayout` render an outlet; pages live in `src/pages/` |
| `next/link`, `usePathname`, `useRouter().push` | React Router's `Link to`, `useLocation().pathname`, `useNavigate()` |
| Route preservation (Cache Components) | `PreservedOutlet` (`src/app/preserved-outlet.tsx`) keeps the three most recently visited routes mounted in a hidden `<Activity>` |
| Metadata title template | `handle: { title }` on each route; `RootLayout` sets `document.title` to `<title> · Ourigin` |
| Description, viewport, theme colour, icons | Static tags in `index.html`; icons in `public/` |
| `next/font/google` | Self-hosted `@fontsource-variable/inter` and `@fontsource-variable/manrope`, mapped to the same `--font-inter` and `--font-manrope` variables |
| `next/image` | `<img>` with Vite's static imports (URL strings), keeping `fill`'s absolute positioning and lazy loading |
| Async Server Component page + `server-only` | `HomePage` reads the same async getters with React's `use()`, inside a `<Suspense>` boundary |
| `@tailwindcss/turbopack` loader | `@tailwindcss/vite` plugin |
| `eslint-config-next` | ESLint with `typescript-eslint`, `react-hooks` and `react-refresh` (Vite's template) |

The `"use client"` directives were removed, because every component now renders
on the client. In shadcn's `components.json`, `rsc` is now `false`, so the CLI
stops adding the directive. `components/ui/sonner.tsx` no longer reads the
theme from `next-themes`; it is fixed to `light`, which is all the app supported.

## Consequences

- The UI is unchanged. Before Next.js was removed, the Next production build
  and the Vite production build were compared in headless Chrome:
  - element geometry and page heights match at all six testing widths
  - full-page screenshots match, apart from antialiasing on the edges of the
    brand symbol and avatars, which `next/image` used to resize on the server
  - every interaction script gives the same results, including state
    preservation across two route changes
  See [prototype parity](../design-system/prototype-parity.md#migration-check-2026-11-09).
- **Nothing is prerendered.** The page is blank until the JavaScript bundle
  loads. That's fine for a signed-in workplace app, but search engines and link
  previews only see `index.html`.
- **Hosting needs an SPA fallback.** Every unknown path must serve
  `index.html`. `vite dev` and `vite preview` do this already. Unknown URLs now
  return HTTP 200 with the not-found page, where Next returned 404.
- **Images aren't optimised.** The 770 kB brand symbol is downloaded at full
  size; `next/image` used to serve a small resized copy. Export a smaller file
  or add an image plugin to fix this.
- **Scrolling after navigation** is React Router's `<ScrollRestoration>`: a new
  page always starts at the top, and Back restores the previous position. Next
  skipped the scroll when the new page's top edge was already on screen. After
  scrolling down Home on a phone and tapping Inbox, Next left the page about
  70px down, below the top bar; it now starts at the top.
- The production bundle is one 599 kB JavaScript file (181 kB gzipped), mostly
  React DOM and React Router. Vite warns above 500 kB. Split routes with
  `lazy` when real sections arrive.
- `PreservedOutlet` stores each hidden route's element. Pages that read route
  data must not depend on React Router loaders: loader data is dropped for
  routes that are no longer matched, which would break a hidden page.
- Tailwind is pinned to 4.3.3 together with `@tailwindcss/vite`.
- `package.json` overrides `@babel/plugin-transform-runtime` to `^7.29.0`. The
  optional Babel integration in `@vitejs/plugin-react` would otherwise pull in
  Babel 8, which conflicts with the Babel 7 that the shadcn CLI uses. The app
  doesn't use that integration.

## Alternatives considered

- **React Router framework mode, or another SSR setup:** this would keep
  prerendering, but it brings back a server runtime. The brief asked for a
  frontend-only app, with the API to come from NestJS.
- **Next.js static export:** this removes the server but keeps the framework,
  which was the thing to remove.
- **TanStack Router:** a good fit, but React Router is the more familiar
  default, and the app needs only a flat route table.
- **React Router loaders for page data:** these are idiomatic, but loader data
  disappears when a route is hidden by `PreservedOutlet`. Revisit with a query
  cache (for example TanStack Query) when the API arrives.
