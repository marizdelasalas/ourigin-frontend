# Progress

A living record of where the frontend stands. Update the status table when an
area changes state, and add a log entry (newest first) with every change that
affects behaviour, structure, tooling or dependencies.

## Current status

_Last updated: 2026-11-09_

| Area | Status | Notes |
| --- | --- | --- |
| Home feed (`/`) | ✅ Done | Matches the design proposal from 390px to 1600px; all prototype interactions work |
| Workplace shell | ✅ Done | Collapsible sidebar, phone bottom tab bar, top bar with search |
| Inbox, Calendar, Messages, Organization, Goals, People, Resources | 🚧 Placeholder | "Coming soon" pages; designs not available yet |
| Data | 🚧 Fixtures | Illustrative content behind `src/lib/data` getters; no API |
| Imagery | 🚧 Temporary | Avatars and team photo cropped from the prototype screenshot |
| Automated tests | ⏳ Not started | Parity and interaction checks were run manually (see [prototype parity](design-system/prototype-parity.md)) |
| Version control | ⏳ Not started | Git is not initialised yet |
| Documentation | ✅ Done | This `docs/` directory |

## Next steps

- [ ] Initialise Git and make the first commit
- [ ] Replace the cropped avatars and team photo with real images ([ADR-0011](decisions/0011-temporary-imagery-cropped-from-prototype.md))
- [ ] Review the placeholder copy: navigation descriptions in `src/lib/data/navigation.ts` and the "coming soon" text in `SectionTemplate`
- [ ] Add a `typecheck` script and automated tests: component tests (Vitest) and browser tests (Playwright) that repeat the parity and interaction checks
- [ ] Design and build the remaining sections
- [ ] Connect real data behind the `src/lib/data` getters ([ADR-0009](decisions/0009-data-access-layer-over-fixtures.md))
- [ ] Re-run `npm audit` once shadcn and `eslint-config-next` publish patched dependencies
- [ ] Confirm the component base: keep Radix or move to Base UI ([ADR-0004](decisions/0004-shadcn-ui-on-radix.md))

## Log

### 2026-11-09: Full-viewport app shell

- `AppShell` now fills the browser edge to edge (`w-full min-h-dvh`). Removed
  the outer padding, gradient backdrop, `max-w-[1560px]`/`mx-auto`, the 28px
  rounded corners and the frame shadow. The sidebar sits flush left and the
  content takes the remaining width.
- Inner padding, cards, typography and colours are unchanged. The frame's
  `overflow-hidden` became `overflow-x-clip` to prevent horizontal overflow.
- Verified at 390, 900, 1440 and 1920px: no horizontal overflow, the sidebar
  starts at x=0, the content reaches the right edge, and there are no console
  errors.

### 2026-11-09: Documentation

- Added `docs/`: getting started, this progress log, architecture, design
  system, guides and ADRs 0001–0012.
- Rewrote the root `README.md` as a short entry point that links here.

### 2026-11-09: Project setup and Home feed

**Scaffold**

- Created the app with `create-next-app` (Next.js 16.4.5, React 19.3):
  TypeScript, ESLint, Tailwind CSS v4, App Router, `src/` directory, Cache
  Components and `AGENTS.md`. Automatic Git initialisation was skipped.
- Initialised shadcn/ui 4.23 with the Radix base and the `nova` preset (style
  `radix-nova`). Added avatar, badge, button, checkbox, dialog, kbd, label,
  sonner, tabs, textarea and tooltip.

**Built**

- Ourigin theme in `globals.css`: brand palette mapped to shadcn tokens, custom
  radii and shadows, breakpoints matching the design, gradient backdrop.
- 29-icon two-tone icon set generated from the prototype's markup.
- Component layers: 8 atoms, 13 molecules, 10 organisms, 3 templates and 3
  providers ([inventory](architecture/components.md#inventory)).
- Home feed with every prototype interaction: tabs (Following, Highlights,
  Saved), search with ⌘K, save, appreciate, compose and reply dialogs, customize
  feed, demo dialogs, toasts, collapsible sidebar.
- Seven placeholder routes, a not-found page, and app icons generated from the
  brand symbol.

**Verified**

- `tsc --noEmit`, `eslint` and `next build` pass; all 12 routes prerender as
  static pages.
- Element geometry was compared with the prototype at 390, 680, 900, 1280, 1440
  and 1600px. Page heights and every measured element position match.
- An interaction run in headless Chrome covered every feature above, with no
  console errors or hydration warnings.

**Fixed during verification**

- `cn` drops a `leading-*` class that comes before a font-size class. Line
  heights were restored, and the rule is now in the
  [conventions](guides/conventions.md#cn-rules).
- The prototype's inline titles inherit a 12px line box. Our components now
  keep them inline so heights match.
- Removed the 1px transparent border that shadcn's Button adds, and gave feed
  tabs the prototype's underline height.
- Toasts are centred, sit above the phone tab bar, and never block taps.
- Removed the unused `input` and `input-group` primitives.
