# State and data

## Data flow

- Pages read page data through the async getters in `src/lib/data` and pass it
  down to templates as props: plain objects, strings, and image URLs from
  static imports.
- Interactive state lives in **providers** ([ADR-0008](../decisions/0008-scoped-react-context-for-client-state.md)).
  There is no global store and nothing is persisted: a full page reload resets
  the preview.

## Providers

Each provider is mounted at the closest common parent of the components that
use it.

```mermaid
flowchart TD
  layout["app/workplace-layout.tsx"] --> fv["FeedViewProvider<br/>query · filter · reset()"]
  fv --> dd["DemoDialogProvider<br/>openDemo(title)"]
  dd --> shell["AppShell"]
  shell --> sidebar["AppSidebar<br/>reset() on Home click"]
  shell --> topbar["TopBar → SearchField<br/>setQuery()"]
  shell --> home["HomeTemplate"]
  home --> hf["HomeFeedProvider<br/>posts · saved · appreciated · preferences"]
  hf --> feed["Feed<br/>reads query, filter, posts"]
  hf --> composer["Composer → openCompose()"]
  hf --> rail["ContextRail → setFilter('saved')"]
```

| Provider | Mounted in | State | Written by | Read by |
| --- | --- | --- | --- | --- |
| `FeedViewProvider` | `app/workplace-layout.tsx` | `query`, `filter` (`following` · `highlights` · `saved`) | `SearchField`, the sidebar's Home link (`reset`), `Feed` tabs, `OpenSavedButton`, a new post (back to Following) | `Feed` |
| `DemoDialogProvider` | `app/workplace-layout.tsx` | Open state and title of the demo dialog, and the element to return focus to | Any `RailItem`, `EventItem`, `PostByline` menu, `LinkedWork`, `Callout`, the Notifications and Help buttons, `AccountMenu` items, `FollowingItem`, `AskOuriginCard` | Renders `PreviewDialog` |
| `HomeFeedProvider` | `HomeTemplate` | Drafts, saved IDs, appreciated IDs, `showRecognition` / `showProfiles`, compose and customize dialog state | Post actions, `Composer`, `CustomizeFeedDialog` | `Feed`, post cards |

Why two levels: the search box (top bar) and the Home link (sidebar) are in the
shell, but the posts belong to Home. Search and the active tab therefore live
in the layout, while post state stays with the Home template.

### Demo dialog focus

The demo dialog is opened from code, not by a `DialogTrigger`, so Radix can't
return focus on its own. `openDemo()` records the focused element and whether it
was showing the focus ring; closing the dialog focuses it again the same way.
`AccountMenu` first moves focus back to its trigger (without the ring after
mouse or touch use) and then opens the dialog, so focus lands on the trigger.

### Feed filtering

`Feed` shows a post when all of these are true:

1. It isn't hidden by a preference (recognition and profile posts can be
   switched off in **Customize feed**).
2. It matches the tab: **Following** shows everything, **Highlights** shows
   posts marked `highlight`, and **Saved** shows posts the user saved.
3. Its searchable text contains the trimmed, lowercased query. The searchable
   text is the author, meta line, title, body and the post kind's own fields.

### Route preservation

`PreservedOutlet` (`src/app/preserved-outlet.tsx`) renders the workplace
routes. It keeps the visible route and the three most recently visited ones
mounted, each in its own React `<Activity>`, and hides the inactive ones
instead of unmounting them. This reproduces what Cache Components did in the
Next.js version ([ADR-0013](../decisions/0013-vite-and-react-router-instead-of-nextjs.md)).
As a result:

- Home's drafts, saved posts and preferences survive navigation to a placeholder
  route and back. A route that drops out of the four is unmounted, and its
  state resets.
- Layout providers (`FeedViewProvider`) persist across every workplace route.
- Hidden routes keep their DOM (with `display: none`) and their state. Their
  effects are cleaned up and run again when the route is shown, so a component
  that should reset when hidden (for example a dropdown left open) can close
  itself in an effect cleanup.
- The visible route is always first in the DOM.
- Don't read page data with React Router loaders. Loader data is dropped for
  routes that are no longer matched, so a hidden page would lose it.

## Data access layer

[ADR-0009](../decisions/0009-data-access-layer-over-fixtures.md)

| File | Contents | Imported by |
| --- | --- | --- |
| `lib/data/index.ts` | `getHomeFeed()`, `getWorkplaceContext()` | Pages only |
| `lib/data/home-feed.ts` | The five illustrative posts | `index.ts` |
| `lib/data/workplace-context.ts` | Context rail content | `index.ts` |
| `lib/data/people.ts` | `viewer`, `priya`, `amira`, `operationsAndEngineering`, `workspace` | Fixtures and components that show the signed-in user |
| `lib/data/navigation.ts` | Navigation groups, section descriptions, `getNavItem()`, `followingNavigation` | `AppSidebar`, placeholder pages |
| `lib/data/demo-details.ts` | Copy for demo dialogs, `getDemoDetail()` | `DemoDialogProvider` |
| `types/workplace.ts` | `Person`, `NavItem`, `FeedPost` union, `WorkplaceContext`… | Everywhere |

**Page data** (posts and rail content) goes through the async getters, so it
can be replaced with real requests without touching components. `HomePage`
starts the request once, when its module loads, and reads the promise with
React's `use()`; the `<Suspense>` boundary in `PreservedOutlet` shows nothing
until it resolves. **Reference data** (navigation, the signed-in user, demo
copy) is imported directly by the components that need it.

### Connecting a real API

1. Keep the getter signatures and return types from `types/workplace.ts`.
2. Replace the fixture return with a `fetch` to the API. Put the base URL in
   an environment variable prefixed with `VITE_` (for example
   `VITE_API_URL` in `.env.local`), read through `import.meta.env`. Anything
   prefixed `VITE_` is public, so never put secrets there.
3. Requests that must refetch, or that depend on route parameters or the user,
   need a cache rather than a module-level promise. Adopt a query library (for
   example TanStack Query) and record it in an ADR.
4. Add a loading state where a page used to render instantly. The
   `<Suspense>` boundary in `PreservedOutlet` currently has no fallback.
5. Image URLs from an API work as they are: `Person.avatar` and
   `linkedWork.image` are plain strings.
6. Record the change in [progress.md](../progress.md), and in an ADR if it
   changes the approach.
