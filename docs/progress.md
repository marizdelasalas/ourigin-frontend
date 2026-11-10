# Progress

A living record of where the frontend stands. Update the status table when an
area changes state, and add a log entry (newest first) with every change that
affects behaviour, structure, tooling or dependencies.

## Current status

_Last updated: 2026-11-10_

| Area | Status | Notes |
| --- | --- | --- |
| Home feed (`/`) | ✅ Done | Matches the design proposal from 390px to 1600px; all prototype interactions work |
| Workplace shell | ✅ Done | Collapsible sidebar with Following and Ask Ourigin, phone bottom tab bar, top bar with workspace name, search and account menu |
| Inbox, Calendar, Messages, Organization, Goals, People, Resources | 🚧 Placeholder | "Coming soon" pages; designs not available yet |
| Data | 🚧 Fixtures | Illustrative content behind `src/lib/data` getters; no API |
| Imagery | 🚧 Temporary | Avatars and team photo cropped from the prototype screenshot |
| Automated tests | ⏳ Not started | Parity and interaction checks were run manually (see [prototype parity](design-system/prototype-parity.md)) |
| Version control | 🚧 Started | Git initialised with one checkpoint commit (the Next.js app). Nothing since is committed: the migration and every change after it |
| Tooling | ✅ Done | Vite + React Router; Next.js removed ([ADR-0013](decisions/0013-vite-and-react-router-instead-of-nextjs.md)) |
| Figma library | 🚧 In progress | Fresh files, no third-party kit: variables, styles, icons, every component on the shadcn/ui docs list (66 of 68; the other two have nothing to draw), all Ourigin components and the App shell. Home (desktop) built in the Application file ([Figma guide](design-system/figma.md)) |
| Documentation | ✅ Done | This `docs/` directory, ADRs 0001–0018 |

## Next steps

- [ ] Commit the Vite migration, and set a Git author identity (`git config user.name` / `user.email`)
- [ ] Configure an SPA fallback on the chosen host ([getting started](getting-started.md#deploying))
- [ ] Export a small brand symbol (the current file is 770 kB) and decide on image optimisation
- [ ] Replace the cropped avatars and team photo with real images ([ADR-0011](decisions/0011-temporary-imagery-cropped-from-prototype.md))
- [ ] Review the placeholder copy: navigation descriptions in `src/lib/data/navigation.ts` and the "coming soon" text in `SectionTemplate`
- [ ] Add automated tests: component tests (Vitest) and browser tests (Playwright) that repeat the parity and interaction checks
- [ ] Design and build the remaining sections
- [ ] Connect real data behind the `src/lib/data` getters ([ADR-0009](decisions/0009-data-access-layer-over-fixtures.md))
- [ ] Re-run `npm audit` once the shadcn CLI and `typescript-eslint` publish patched dependencies
- [ ] Split routes with `lazy` once real sections arrive (the bundle is 599 kB, 181 kB gzipped)
- [ ] Choose a data-fetching cache (for example TanStack Query) when the NestJS API is ready ([state and data](architecture/state-and-data.md#connecting-a-real-api))
- [ ] Confirm the component base: keep Radix or move to Base UI ([ADR-0004](decisions/0004-shadcn-ui-on-radix.md))
- [ ] Figma: publish the library again so the Application file gets the new shadcn/ui components
- [ ] Figma: the other module screens as they're designed
- [ ] Figma screens: Home at 900px and 390px, collapsed-sidebar Home, dialogs and Not found
- [ ] Code (later): decide on `"style": "radix-nova"` in `components.json` and turn hard-coded colours into CSS variables ([future alignment](design-system/figma.md#future-alignment-code-not-now))

## Log

### 2026-11-10: shadcn/ui completeness check in Figma

- The owner couldn't find a dialog or modal. Dialog, Alert Dialog, Sheet and
  Drawer were there; shadcn names no component "Modal". Added a Modal component
  (each one open over the overlay at 1440×900), an example over the App shell,
  and "modal" keywords in their descriptions.
- Checked against the shadcn docs list and built the docs-only items: Typography,
  Data Table and a Form example. Added a shadcn/ui Index page linking every
  component to its page: 66 of 68 built, with Direction and Toast having
  nothing to draw.

### 2026-11-10: The rest of the shadcn/ui set in Figma

- Built the remaining shadcn/ui components from the official registry source in
  the app's radix-nova style: 50 more, for 62 in all, across Actions &
  feedback, Forms, Navigation & menus, Data display, Overlays, and two new
  pages, Layout and AI. `direction`, `form` and `toast` have no Figma
  counterpart (a provider, Field covers form, Sonner replaces toast).
- Added the tokens and styles they need: `derived/*` opacity modifiers,
  `derived/primary-tint`, `font/mono` and 11 text styles. Regenerated the
  Foundations page.
- Audited all seven pages: every component has a description and every colour
  is bound to a variable. Checked each page visually. No app code changed.

### 2026-11-10: Fresh Figma design system

- The project owner chose to start again in new files rather than keep
  converting the Obra-based one ([ADR-0018](decisions/0018-fresh-figma-design-system.md),
  superseding ADR-0016 and ADR-0017). The old file stays as a backup.
- Created **Ourigin — Design System** and **Ourigin — Application** in the
  Ourigin team. The Application file has a page per module.
- Built the variables from `globals.css`: Primitives, Color, Spacing, Radius and
  Typography, named after the CSS with exact code syntax, plus 26 text styles
  and 16 effect styles. A Foundations page shows them all.
- Generated the two-tone and Lucide icons from the code, and uploaded the logo,
  robot and photos from `src/assets`.
- Built the 12 shadcn/ui components the app uses from `src/components/ui`, and
  rebuilt every Ourigin component and the App shell pattern. Spacing and radii
  on the Tailwind scale are bound to variables. Checked each page visually.
- The owner published the library. Built Home (desktop 1440) in the
  Application file from library instances, starting from the App shell, and
  checked it against the app. No app code changed.

### 2026-11-10: Figma cleanup after the backup

- The owner saved the named version "Before Obra cleanup". Checked again what
  depends on the pages marked for deletion: only Backdrop (OC) is still used, by
  the Legacy Dialog and Alert Dialog examples, so it moved to the Legacy section
  instead.
- Deleted 36 pages: the 31 "PRO ONLY" previews, Obra's ad, About, Changelog,
  Thumbnail and the OC docs. Also deleted the unused duplicate focus-ring style
  and an empty variable collection. All instances on the Ourigin pages still
  link to live components.
- The kit's licence (section 11) excludes Obra custom (OC) components from the
  Community Edition. The two left are used only by Legacy pages and go with
  them. Added the kit's copyright and warranty notice to the Cover credits.

### 2026-11-09: Figma library made independent of Obra (in progress)

- Audited the file. Ourigin components used no Obra components: only 7 Lucide
  icons from the kit and the kit's variables. Recorded the direction in
  [ADR-0017](decisions/0017-independent-figma-library.md). No app code changed.
- Renamed 234 variables, 22 text styles and 10 effect styles into Primitives,
  Semantic (`shadcn/*` with CSS names, `ourigin/*`), Component and Typography
  tiers. Kit-only collections are marked Legacy. Renaming kept every link.
- Reorganised the pages into sections 01–07, a Legacy kit section and a Pending
  deletion section. Added a Cover page with credits and licence notices.
- Generated 52 Lucide icons from `lucide-react` and switched the 13 Ourigin icon
  instances to them, so the Ourigin work no longer depends on the kit.
- Built shadcn batch 1 from `src/components/ui`: Button (96 variants), Button
  (icon) (80), Badge, Spinner, plus component tokens and translucent colour
  tokens. Checked them visually, and checked that Home is unchanged.
- Deletions wait for a named version in Figma, which Figma's tools can't create.

### 2026-11-09: Figma design system, round 1

- Set up the **Ourigin Design System** Figma file from the free Obra
  shadcn/ui Community kit ([ADR-0016](decisions/0016-figma-library-on-obra-community-kit.md)).
  No app code changed.
- Re-pointed the kit's variables to the values in `globals.css`, added an
  `ourigin primitives` collection and Ourigin product colours, radius and type
  tokens, with CSS code syntax on each. Added Ourigin text and effect styles.
- Built the 29 two-tone icons, brand images and Ourigin's atoms, molecules and
  organisms as components, plus `Ourigin/Toast` for Sonner, which is Pro-only
  in the kit. Re-bound the kit tooltip to `foreground` / `background` to match
  the code.
- Laid out Home at 1440px from instances. Checked against a screenshot of the
  running app: the layout and content match. Manrope 650 is drawn as 600, so
  some headings are slightly narrower.
- Documented the file, its mapping to the code and the sync workflow in
  [the Figma guide](design-system/figma.md).

### 2026-11-09: Documentation audit

- Compared the docs with the code. Added
  [ADR-0014](decisions/0014-lucide-icons-for-standard-controls.md) (Lucide for
  standard controls, amending ADR-0007) and
  [ADR-0015](decisions/0015-type-scale-tokens.md) (type tokens, amending
  ADR-0006). The original ADRs still said "no Lucide in Ourigin components" and
  "keep small sizes as pixel values".
- Updated the responsive layout (account menu, sticky sidebar, tablet
  wrapping, phone tabs), the demo dialog's openers and focus return in
  [state and data](architecture/state-and-data.md#demo-dialog-focus), and this
  status table.

### 2026-11-09: Shared Learning circle icon

- The sidebar's Learning circle item now uses the two-tone `book-open` icon
  from `atoms/icon.tsx`, the same one as the "Following in this demo" card,
  instead of Lucide's `BookOpen`. Verified that both render identical SVG
  markup.
- It's 18px and coloured `nav-icon`, like the other Following items; the
  card shows the same icon at 15px in `primary`.
- `FollowingItem.icon` is an `IconName` again; the Lucide branch was removed.

### 2026-11-09: AI robot on the Ask Ourigin card

- Replaced the card's Sparkles icon with the supplied Ourigin AI robot,
  `src/assets/brand/ourigin-ai-assistant.png`. It's a byte-identical copy of
  the provided transparent PNG: not cropped, resized or given a background.
- The layout is a horizontal row: the robot (44px tall, original 1.011 aspect
  ratio) on the left, centred against the title and description stacked on the
  right. The card padding went from 12px to 8px and the gap is 10px, so the
  description wraps as "Explore connected / context" on desktop. In the 185px
  tablet sidebar the text column is 91px, so it takes three lines there.
- Click behaviour, hover, keyboard use and the collapsed tooltip are
  unchanged. Collapsed, the card shows only the robot.
- The PNG is 840 kB at 1261×1247 for a 44px display. Export a small copy (for
  example 96px or 132px tall) before launch.

### 2026-11-09: One focus style

- The focus colour (`--ring`) is now the brand overlap teal `#128D89`, in
  place of the prototype's blue `#4D78C9`. It still passes 3:1 against the
  background, white and `accent`.
- One indicator everywhere: a 2px solid outline with a 2px offset, on keyboard
  focus only. shadcn primitives (Button, Tabs, Checkbox, Textarea) used to add
  a translucent 3px ring as well; an unlayered rule in `globals.css` replaces it
  with the same outline. The search field uses the outline too, instead of its
  own ring. Menu items keep their highlight background and get no outline.
- Fixed the ring appearing after mouse use. Closing the account menu with the
  mouse (selecting an item, or clicking outside) returned focus to the trigger
  as if by keyboard. It now returns focus with `focusVisible: false` after
  pointer use and shows the ring only after keyboard use. Demo dialogs restore
  focus the same way the opener had it.
- Verified in Chrome: every control shows the same ring after a keyboard Tab,
  none shows it after mouse use, and the desktop interaction suite still
  matches. No console errors.

### 2026-11-09: Following and Ask Ourigin in the sidebar

- Added a "Following" section under Explore: a divider, the heading, and
  Finance AI (Resources icon), AI-request pilot (Organization icon) and
  Learning circle (Lucide `BookOpen`). The rows are quieter than the main
  navigation: 18px icons, muted labels, 40px tall. The data is
  `followingNavigation` in `lib/data/navigation.ts`.
- Added the "Ask Ourigin" card below it: Lucide `Sparkles`, teal title,
  "Explore connected context", on the light `secondary` surface with 13px
  corners and a hover background.
- Nothing here has a route or a feature yet. The Following items open the
  existing demo dialogs, the same ones as the "Following in this demo" panel.
  Ask Ourigin opens a dialog saying it isn't part of the preview; there's no AI.
- Collapsed: the divider stays, the heading becomes screen-reader-only, and
  every item shows its icon with a tooltip.
- The sidebar's contents now stick to the top of the window and scroll on
  their own when they're taller than it (for example at 900×700). The padding
  moved onto the new scroll wrapper, so the active marker isn't clipped.
- At 900px, "AI-request pilot" wraps to two lines rather than being cut off.
- Verified at 1440×1000 and 900×700, expanded and collapsed, and at 390px
  (hidden on phones, like Explore). The desktop and state-preservation
  interaction suites still match. No console errors.

### 2026-11-09: Lighter sidebar toggle icon

- The sidebar toggle now uses Lucide's `ChevronLeft` (expanded) and
  `ChevronRight` (collapsed) at 18px with a 1.75 stroke, instead of the panel
  icons. The 32×32px button has no border or background until hover.
- The gap between the logo row and the first navigation item went from 22px to
  16px.
- Labels, tooltips, keyboard use and the collapsed layout are unchanged.
  Verified at 1440 and 900px; the desktop interaction suite still matches.

### 2026-11-09: Compact sidebar toggle

- Replaced the full-width "Collapse menu" button with a 32px icon-only toggle
  at the right of the logo row, vertically centred on the logo. It uses
  Lucide's `PanelLeftClose` (expanded) and `PanelLeftOpen` (collapsed), with a
  subtle hover background and 9px corners.
- The accessible label and tooltip read "Collapse sidebar" or "Expand
  sidebar"; `aria-expanded` and `aria-controls` are kept. Collapsed, the
  toggle sits centred under the brand symbol, because the 78px rail can't fit
  both side by side.
- The logo row and the navigation are 22px apart in both states, so the
  navigation starts 63px higher than before. The toggle logic, active states
  and phone tab bar are unchanged.
- The two-tone `panel-left-close` and `panel-left-open` icons in
  `atoms/icon.tsx` are now unused.
- Verified at 1440 and 900px (mouse and keyboard, both states) and 390px (row
  hidden). The desktop interaction suite matches the baseline. No console
  errors.

### 2026-11-09: Larger type scale

- Added font-size tokens in `globals.css`: `text-caption` (12px),
  `text-detail` (13px) and `text-body` (14px), registered with `cn`. The base
  text is now 14px. Replaced every one-off small size (7–12px) in components
  with the token for its role: metadata, descriptions, or body, navigation and
  buttons.
- Shared styles carry the sizes. The `Button` atom sets 14px and `Pill` sets
  12px, so callers no longer pass a size. Context panel titles in the `Heading`
  atom are 18px from `sm` up (they were 15–17px from `md`). Post body copy is
  14px with a 1.7 line height. Page, feature, post and recognition headings are
  unchanged. The workspace name went from 17px to 18px.
- Follow-up fixes: post reaction and comment counts no longer wrap on tablets,
  the ⌘K hint no longer shrinks, and phone tabs widened from 58px to 66px so
  "Messages" fits at 12px.
- Verified at 1440, 1280, 900 and 390px: no horizontal overflow and no clipped
  text, with 12px the smallest size rendered. Home is taller (2112px instead of
  1833px at 1440px), and some rail descriptions wrap onto more lines.
  The interaction suites match the baseline; the only difference is a wider
  toast. No console errors.

### 2026-11-09: Account menu in the top bar

- The top-bar profile control now shows Nora Chen's avatar, name and role
  with a chevron (avatar only on phones). It opens an account menu built on
  the shadcn `dropdown-menu` primitive (newly added), with Lucide icons, below
  the trigger and aligned to the right: My Profile, Account Settings,
  Preferences and Log out.
- My Profile opens the existing profile dialog. The other three open the demo
  dialog with copy saying they aren't available in the preview; Log out
  doesn't pretend to sign anyone out.
- Keyboard: Enter or Space opens the menu, the arrow keys move between items,
  Escape closes it and returns focus to the trigger. Clicking outside closes
  it. An account row briefly added to the sidebar was removed; the sidebar is
  unchanged.
- Fixed focus return for every demo dialog. `DemoDialogProvider` now restores
  focus to whatever opened the dialog; before, focus fell back to the page
  body, because the dialog has no `DialogTrigger`. `PreviewDialog` gained an
  `onCloseAutoFocus` prop for this.
- Fixed the shadcn CLI writing to a literal `@/` folder. The root
  `tsconfig.json` now repeats the `@/*` path alias.
- Verified at 1440, 900 and 390px. The header stays 92px (77px on phones),
  every control is vertically centred, page heights are unchanged, nothing
  overflows, and there are no console errors.

### 2026-11-09: Workspace label in the top bar

- The top bar shows the workspace name, "Northstar", with a subtle
  chevron, instead of the "ourigin" wordmark, which already appears in the
  sidebar. The label is static because workspace switching doesn't exist yet.
  Phones keep the brand symbol (linking Home), because they have no sidebar.
- The page eyebrow reads "Your workplace" instead of "Northstar / Your
  workplace" (`workspace.tagline` in `lib/data/people.ts`), on every page.
- Header and page heights are unchanged. Search, notifications and profile are
  untouched; the phone search still expands over the label.

### 2026-11-09: Migration from Next.js to Vite and React Router

[ADR-0013](decisions/0013-vite-and-react-router-instead-of-nextjs.md)

**Before**

- Audited the Next.js usage. It used App Router routes and layouts,
  `next/link`, `next/navigation`, `next/image`, `next/font/google`, the
  Metadata API, async Server Components with a `server-only` data layer, and
  Cache Components' route preservation. There were no Server Actions, route
  handlers, middleware or environment variables.
- Initialised Git and committed the Next.js app as a checkpoint (`63a1b64`).
- Captured a baseline from the Next production build: element geometry,
  full-page screenshots and interaction results.

**Changed**

- Tooling: Vite 8.3 with `@vitejs/plugin-react` and `@tailwindcss/vite`. React
  Router 8.5 in data mode. Self-hosted Inter and Manrope from Fontsource.
  ESLint now uses Vite's config (`typescript-eslint`, `react-hooks`,
  `react-refresh`).
- New entry points: `index.html` (meta tags, icons) and `src/main.tsx`.
- `src/app/` now holds the route table, `RootLayout`, `WorkplaceLayout` and
  `PreservedOutlet`, which keeps visited routes alive in `<Activity>` as Cache
  Components did. Pages moved to `src/pages/`; the seven placeholder pages are
  one `SectionPage`, with a route per navigation item.
- Moved `globals.css` to `src/styles/` and the app icons to `public/`.
- Components: Next links and hooks became React Router's `Link`, `useLocation`
  and `useNavigate`. `next/image` became `<img>` with the same positioning.
  `StaticImageData` became `string` in the types. All `"use client"`
  directives were removed, along with `server-only` and `next-themes` (in
  `ui/sonner.tsx`). No markup, classes or behaviour changed.
- Scripts: `dev`, `build` (`tsc -b && vite build`), `preview`, `lint`, and a
  new `typecheck`. Node 22.22+ is now required.
- Removed `next`, `next-themes`, `server-only`, `eslint-config-next`,
  `@tailwindcss/turbopack`, `next.config.ts`, `next-env.d.ts`, `.next/`,
  `AGENTS.md` and the `app/` route files.
- Pinned Tailwind to 4.3.3. Added an npm `overrides` entry for an optional Babel
  peer conflict.

**Verified**

- `npm run typecheck`, `npm run lint` and `npm run build` pass. The build warns
  about the 599 kB chunk.
- The Next and Vite builds were compared at 390, 680, 900, 1280, 1440 and
  1600px, with 1920px checked separately. Geometry and page heights were
  identical; screenshots differed only by antialiasing on the brand symbol
  and avatars. All interaction scripts gave identical results, including
  state preservation. See the
  [migration check](design-system/prototype-parity.md#migration-check-2026-11-09).
- Direct loads, Back and Forward (with scroll restoration) and page titles work
  on every route. There were no console errors or warnings in the dev server or
  the production build.
- Known differences: a new page always starts at the top (Next sometimes left
  it partly scrolled), and unknown URLs return HTTP 200.

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
