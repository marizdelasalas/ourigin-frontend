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

## Intentional deviations

Each of these changes something the prototype did, and why:

| Area | Prototype | This app | Why |
| --- | --- | --- | --- |
| App shell (since 2026-11-09) | Floating frame: max 1560px, 28px radius and shadow, on a gradient backdrop with 24–38px padding | Fills the viewport edge to edge; sidebar flush left, content takes the remaining width | Product decision to use the full browser viewport. Page heights from `md` up are now shorter than in the parity table above, which was measured with the frame |
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
| Avatars | CSS sprite of a screenshot | Individual images via `next/image` | Maintainable assets ([ADR-0011](../decisions/0011-temporary-imagery-cropped-from-prototype.md)) |
| Team photo | Crop with an empty strip below | Fills its slot (`object-cover`) | The strip was a cropping artefact |
| ⌘K hint font | Source Sans 3 | Inter | Avoids loading a third font for two characters |
| Motion and hover | Dialogs opened instantly; few hover states | shadcn's 100ms fade and zoom on dialogs; subtle hovers on buttons | Primitive defaults |

## Omitted prototype elements

The prototype's markup includes elements that the New design proposal hides at
every width. They aren't rendered here: the workspace switcher, the sidebar's
"Following" list, the "Ask Ourigin" card, the account row, the top-bar "Create
post" button and the date.

## Known gaps

- Imagery is low-resolution until real photos are supplied.
- Copy for the placeholder sections was written for this build and needs review.
- Parity checks aren't automated yet.
