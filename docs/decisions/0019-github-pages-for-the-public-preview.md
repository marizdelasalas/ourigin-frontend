# ADR-0019: GitHub Pages for the public preview

- **Status:** Accepted
- **Date:** 2026-11-10
- **Origin:** Project owner

## Context

The code is in a GitHub repository, `marizdelasalas/ourigin-frontend`. The
project owner made it public and wants the app published on GitHub Pages. The
app is a static single-page app ([ADR-0013](0013-vite-and-react-router-instead-of-nextjs.md)),
so any static host works, but it needs an SPA fallback. GitHub Pages serves a
project site from a sub-path (`/ourigin-frontend/`), not from `/`, and has no
rewrite rules.

## Decision

- A GitHub Actions workflow, `.github/workflows/deploy-pages.yml`, runs on
  every push to `main`. It lints, builds and publishes `dist/` to
  <https://marizdelasalas.github.io/ourigin-frontend/>.
- The build sets `BASE_PATH=/ourigin-frontend/`. Vite uses it as `base`, and the
  router passes Vite's `import.meta.env.BASE_URL` to `createBrowserRouter` as
  `basename`. Without `BASE_PATH`, both are `/`, so local development is
  unchanged.
- The workflow copies `index.html` to `404.html`. GitHub Pages serves that file
  for every unknown path, which is the SPA fallback.

## Consequences

- A direct visit to a route such as `/ourigin-frontend/inbox` opens the right
  page, but the HTTP status is 404. Browsers show the page as normal. Search
  engines and link checkers see a 404; acceptable for a preview.
- Code must not hard-code root paths (`"/images/x.png"`, `<a href="/inbox">`).
  Import assets, and link with React Router's `Link` and `navigate`, which add
  the base path.
- Anyone can read the code and open the preview. The fixtures are illustrative
  and there are no keys or secrets in the repository.
- Moving to another host (or a custom domain at `/`) means changing
  `BASE_PATH` in the workflow and replacing the `404.html` step with that
  host's rewrite rule.

## Alternatives considered

- **Hash routing (`/#/inbox`):** no fallback needed and real 200 responses, but
  every URL gets a `#`, and moving to a host with rewrites later would change
  every shared link.
- **The spa-github-pages redirect script:** gives 200 responses, but adds a
  script to `index.html` that rewrites the URL on load. More moving parts for a
  preview.
- **Vercel or Netlify:** real rewrites and preview deployments per branch, but
  another account and service to manage.
