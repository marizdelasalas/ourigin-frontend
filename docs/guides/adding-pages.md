# Adding pages

Routes are declared in one place, `src/app/router.tsx`
([ADR-0013](../decisions/0013-vite-and-react-router-instead-of-nextjs.md)).

## Add a page inside the workplace

Routes nested under `WorkplaceLayout` get the shell (sidebar, tab bar, top
bar), the workplace providers and [route preservation](../architecture/state-and-data.md#route-preservation)
automatically.

1. Create the page in `src/pages/`:

   ```tsx
   // src/pages/reports-page.tsx
   import { use } from "react"

   import { ReportsTemplate } from "@/components/templates/reports-template"
   import { getReports } from "@/lib/data"

   // Requested once, when the route module loads; read with use() below.
   const reports = getReports()

   export function ReportsPage() {
     return <ReportsTemplate reports={use(reports)} />
   }
   ```

2. Add the route to the `WorkplaceLayout` children in `src/app/router.tsx`.
   `handle.title` sets the browser tab title:

   ```tsx
   {
     path: "/reports",
     Component: ReportsPage,
     handle: { title: "Reports" } satisfies RouteHandle, // "Reports · Ourigin"
   },
   ```

3. Add a getter for the page's data in `src/lib/data/index.ts`, with types in
   `src/types/workplace.ts`. See
   [state and data](../architecture/state-and-data.md#data-access-layer).
4. Create the template in `src/components/templates/`. Start it with
   `PageHeading` so the page matches the rest of the workplace.
5. Add a navigation entry if the page should appear in the menu (below).

## Replace a placeholder section

The seven sections (Inbox, Calendar, Messages, Organization, Goals, People,
Resources) are created from the navigation data: `router.tsx` adds a
`SectionPage` route for every navigation item except Home. To build one:

1. Build the section's template and organisms, and a page in `src/pages/`.
2. In `router.tsx`, add an explicit route for it before the generated ones and
   leave it out of `sections`. For example, filter with
   `item.href !== "/" && item.href !== "/inbox"`. Keep the title from the
   navigation item (`getNavItem("/inbox").label`) so the menu and the tab agree.
3. Update the section's status in [progress.md](../progress.md#current-status).

## Navigation

Navigation is defined in `src/lib/data/navigation.ts`:

- **`primaryNavigation`**: Home, Inbox, Calendar, Messages. This group also
  forms the **phone tab bar**, which fits **four** items. If you add a fifth,
  move one to Explore.
- **`exploreNavigation`**: shown under the "Explore" heading from `md` up. It
  isn't available on phones yet.
- **`followingNavigation`**: the "Following" list from `md` up. Each item has
  a `label`, an `icon` (an `IconName`) and the `demo` dialog
  it opens. These have no routes yet; give one an `href` and render a link
  once its page exists.

Primary and Explore items have `href`, `label`, `icon` (an `IconName`), an optional `count`, and
a `description` that placeholder pages use. A link is active when the URL
starts with its `href` (Home only matches `/` exactly). A new navigation item
gets a placeholder route automatically.

## Pages outside the shell

For screens with a different frame, such as sign-in, add a route beside
`WorkplaceLayout` under `RootLayout`, with its own layout component if needed:

```tsx
{ path: "/sign-in", Component: SignInPage, handle: { title: "Sign in" } },
```

The root layout still provides tooltips, toasts, scroll restoration and the
document title. Keep the `*` not-found route last.

## Dynamic routes

Use a path parameter (`path: "/people/:id"`) and read it with `useParams()`.
Route preservation keys hidden routes by pathname, so `/people/1` and
`/people/2` are kept separately.

Don't read page data with React Router loaders: loader data is dropped when a
route is hidden ([why](../architecture/state-and-data.md#route-preservation)).

## Hosting

The app is a single-page application. The host must answer every unknown path
with `index.html` (often called an SPA fallback or rewrite). Otherwise a direct
visit to `/inbox` returns the host's own 404.
