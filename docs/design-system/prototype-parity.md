# Prototype parity

## Design source

The source of truth is the Ourigin brand identity proposal, a single
self-contained HTML file (`ourigin-brand (1).html`) kept outside this
repository. It bundles three pages:

| Page in the bundle | What it is | Used for |
| --- | --- | --- |
| `index.html` | The brand guide: name, logo, colour, type, icons and previews | Tokens, fonts, iconography |
| `direction.html` | **"New design proposal"** (sections 07–08 of the guide) | **The design we build** ([ADR-0002](../decisions/0002-build-the-new-design-proposal.md)) |
| `sample.html` | The existing prototype with Ourigin colours applied (section 06) | Not used |

To view it, open the HTML file and use **"Open desktop proposal ↗"**. The
bundle creates its inner pages as `blob:` URLs, so those links change every
time the file is opened.

## How parity is verified

On 2026-11-09 the app and the prototype were loaded side by side in headless
Chrome at the widths below, and the position and size of about 40 landmark
elements were compared (headings, rail items, post titles, buttons). Page
heights and element positions matched at every width:

| Width | Prototype page height | App page height |
| --- | --- | --- |
| 390px | 3811px | 3811px |
| 680px | 3440px | 3440px |
| 900px | 2176px | 2176px |
| 1280px | 1909px | 1909px |
| 1440px | 1909px | 1909px |
| 1600px | 1940px | 1940px |

An interaction run then covered every feature with no console errors or
hydration warnings:

- tabs, search and ⌘K
- save, appreciate, compose and reply (including empty-text validation)
- customize feed, demo dialogs and toasts
- sidebar collapse
- navigation and state preservation

These checks were run from scripts outside the repository. Turning them into
Playwright tests is a [next step](../progress.md#next-steps).

### Migration check (2026-11-09)

The app moved from Next.js to Vite
([ADR-0013](../decisions/0013-vite-and-react-router-instead-of-nextjs.md)).
Before Next.js was removed, the same scripts were run against both production
builds in headless Chrome:

- **Geometry:** the landmark elements and the page heights were identical at
  all six testing widths. The heights were already shorter than the table above
  because of the full-viewport shell.
- **Screenshots:** full-page captures of Home, Inbox and the not-found page
  were the same size at every width. 4–8 pixels per page differed, all on the
  edges of the brand symbol and avatars. `next/image` used to resize those
  images on the server; the browser now scales the original files.
- **Interactions:** the desktop, phone and state-preservation scripts gave
  identical results: tabs, search, ⌘K, save, appreciate, compose, reply,
  customize feed, demo dialogs, toasts, sidebar collapse, page titles, direct
  loads, and Home state surviving two route changes. No console errors or
  warnings appeared in the production build or the dev server.
- **Differences found:**
  - Scrolling after navigation: the new page now always starts at the top. Next
    left the page partly scrolled when the new page's top edge was already
    visible.
  - Unknown URLs return HTTP 200 with the not-found page, where Next returned 404.

## Intentional deviations

Each of these changes something the prototype did, and why:

| Area | Prototype | This app | Why |
| --- | --- | --- | --- |
| App shell (since 2026-11-09) | Floating frame: max 1560px, 28px radius and shadow, on a gradient backdrop with 24–38px padding | Fills the viewport edge to edge; sidebar flush left, content takes the remaining width | Product decision to use the full browser viewport. Page heights from `md` up are now shorter than in the parity table above, which was measured with the frame |
| Top bar and eyebrow (since 2026-11-09) | "ourigin" wordmark in the top bar; eyebrow "Northstar / Your workplace" | Top bar shows the workspace, "Northstar", with a chevron (static: no switcher yet); the eyebrow reads "Your workplace"; phones keep the brand symbol | Product decision: the platform brand lives in the sidebar, the top bar names the organisation's workspace, and the heading names the page |
| Account menu (since 2026-11-09) | Top bar: avatar only, opening a demo dialog | Top bar: avatar, name and role with a chevron (avatar only on phones), opening an account menu aligned to the right: My Profile opens the profile demo; Account Settings, Preferences and Log out open dialogs saying they aren't in the preview | Product decision to show the signed-in user in the header |
| Typography (since 2026-11-09) | Interface text 7–12px; panel titles 15–17px from `md` | A 12/13/14px scale (`text-caption`, `text-detail`, `text-body`), 14px base, 18px panel titles; heading levels unchanged. Pages are taller and some rail rows wrap onto more lines. Phone tabs are 66px wide (was 58px) to fit 12px labels | Product decision for readability: the minimums of the requested type guide |
| Sidebar toggle (since 2026-11-09) | Full-width "Collapse menu" button under the logo | 32px icon button (Lucide `ChevronLeft` / `ChevronRight`, 18px, stroke 1.75) at the right of the logo row, with "Collapse sidebar" / "Expand sidebar" labels and tooltips. Collapsed, it sits under the brand symbol | Product decision for a cleaner sidebar header |
| Following and Ask Ourigin (since 2026-11-09) | Hidden in the New design proposal; the older prototype had both, hidden when collapsed | Restored with the current styling: a divider and "Following" heading under Explore, three quieter rows (18px icons, muted 14px labels, 40px tall), then the Ask Ourigin card (`secondary` surface, 13px corners, the Ourigin AI robot at 44px beside a teal title and description). Collapsed, they show icons with tooltips. Each opens a demo dialog | Product decision to complete the sidebar; no routes or AI exist yet |
| Sidebar scrolling (since 2026-11-09) | Sidebar scrolled away with the page | Sidebar contents stay in view (`sticky`) and scroll on their own when taller than the window | Needed once the sidebar outgrew short windows |
| Sidebar destinations | Opened a demo dialog | Real routes with placeholder pages; "Open calendar" links to `/calendar` | Scope decision ([ADR-0010](../decisions/0010-placeholder-routes-for-unbuilt-sections.md)) |
| Toast on phones | Covered the bottom tab bar | Sits above the tab bar | Keep navigation visible |
| Toast interaction | Ignored pointer events | Same, using Sonner | |
| Tab bar on iPhones | Ignored the home indicator | Adds the safe-area inset | Touch targets stay usable |
| Active navigation marker, tablet | Clipped out of view | Flush with the sidebar edge at every width | Bug fix |
| Customize feed | Hidden posts reappeared after switching tabs or searching | Preferences persist | Bug fix |
| Search scope | Matched all card text, including button labels | Matches post content fields | More relevant results |
| Search on other pages | (Single page) | Enter takes you to Home, where results are | Needed once routes exist |
| Search focus | No focus indicator | Focus ring | Accessibility |
| Collapsed sidebar labels | Native `title` tooltips | shadcn tooltips; labels kept for screen readers | Accessibility, consistency |
| Skip link | None | "Skip to content" on keyboard focus | Accessibility |
| Avatars | CSS sprite of a screenshot | Individual image files | Maintainable assets ([ADR-0011](../decisions/0011-temporary-imagery-cropped-from-prototype.md)) |
| Team photo | Crop with an empty strip below | Fills its slot (`object-cover`) | The strip was a cropping artefact |
| ⌘K hint font | Source Sans 3 | Inter | Avoids loading a third font for two characters |
| Motion and hover | Dialogs opened instantly; few hover states | shadcn's 100ms fade and zoom on dialogs; subtle hovers on buttons | Primitive defaults |

## Omitted prototype elements

The prototype's markup includes elements that the New design proposal hides at
every width. They aren't rendered here: the workspace switcher, the sidebar
account row, the top-bar "Create post" button and the date. The sidebar's
"Following" list and "Ask Ourigin" card were restored on 2026-11-09 (see the
deviations above).

## Known gaps

- Imagery is low-resolution until real photos are supplied.
- Copy for the placeholder sections was written for this build and needs review.
- Parity checks aren't automated yet.
