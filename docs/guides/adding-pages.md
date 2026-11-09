# Adding pages

## Add a page inside the workplace

Pages inside `src/app/(workplace)/` get the shell (sidebar, tab bar, top bar)
and the workplace providers automatically.

1. Create the route folder and page:

   ```tsx
   // src/app/(workplace)/reports/page.tsx
   import type { Metadata } from "next"

   import { ReportsTemplate } from "@/components/templates/reports-template"
   import { getReports } from "@/lib/data"

   export const metadata: Metadata = {
     title: "Reports", // rendered as "Reports · Ourigin"
   }

   export default async function ReportsPage() {
     const reports = await getReports()
     return <ReportsTemplate reports={reports} />
   }
   ```

2. Add a getter for the page's data in `src/lib/data/index.ts`, with types in
   `src/types/workplace.ts`. See
   [state and data](../architecture/state-and-data.md#data-access-layer).
3. Create the template in `src/components/templates/`. Start it with
   `PageHeading` so the page matches the rest of the workplace.
4. Add a navigation entry if the page should appear in the menu (below).

## Replace a placeholder section

The seven sections (Inbox, Calendar, Messages, Organization, Goals, People,
Resources) currently render `SectionTemplate`:

1. Build the section's template and organisms.
2. In `src/app/(workplace)/<section>/page.tsx`, render the new template
   instead of `<SectionTemplate section={section} />`. Keep
   `getNavItem("/<section>")` for the title and description, or move them into
   the template.
3. Update the section's status in [progress.md](../progress.md#current-status).

## Navigation

Navigation is defined in `src/lib/data/navigation.ts`:

- **`primaryNavigation`**: Home, Inbox, Calendar, Messages. This group also
  forms the **phone tab bar**, which fits **four** items. If you add a fifth,
  move one to Explore.
- **`exploreNavigation`**: shown under the "Explore" heading from `md` up. It
  isn't available on phones yet.

Each item has `href`, `label`, `icon` (an `IconName`), an optional `count`, and
a `description` that placeholder pages use. A link is active when the URL
starts with its `href` (Home only matches `/` exactly).

## Pages outside the shell

For screens with a different frame, such as sign-in, create another route
group with its own `layout.tsx`, for example `src/app/(auth)/sign-in/page.tsx`.
The root layout still provides fonts, tooltips and toasts.

## Caching and dynamic data

Cache Components is on, so every route is prerendered unless it reads
request-time data.

- When a page starts reading cookies, headers or uncached requests, cache the
  data with `'use cache'` or put that part of the page behind `<Suspense>`.
- Dynamic routes (`[id]`) need `generateStaticParams`, or a `<Suspense>`
  boundary around components that call `usePathname`. Without one, the build
  fails.

Read the bundled guides in `node_modules/next/dist/docs/01-app/` (caching,
layouts and pages) before relying on older Next.js patterns. `AGENTS.md`
explains why.
