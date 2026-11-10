# Figma design system

The Figma library mirrors the code and is where design changes start
([ADR-0018](../decisions/0018-fresh-figma-design-system.md)). It uses no
third-party UI kit: components follow the official
[shadcn/ui](https://ui.shadcn.com) docs and the app's `src/components/ui`, styled
with the tokens in `src/styles/globals.css`.

- **Library:** [Ourigin — Design System](https://www.figma.com/design/LPkljQpYBmqh92GebzzaH8)
- **Screens:** [Ourigin — Application](https://www.figma.com/design/Kay1N3cgRMlzbol8pvkLFS)
- **Old file:** "Ourigin Design System" (built on the Obra kit) is kept as a
  backup and is no longer maintained.
- **Credits:** on the Cover page (shadcn/ui, MIT; Lucide, ISC; Inter and
  Manrope, OFL)

## Files and pages

**Ourigin — Design System**

| Page | Contents |
| --- | --- |
| Cover | Purpose, page guide, variable naming, credits |
| Foundations & Variables | Every colour, type style, spacing step, radius and shadow, bound to the live variables and styles |
| Icons & Brand | 29 Ourigin two-tone icons, 52 Lucide icons, logo, wordmark, AI robot, photos |
| shadcn/ui · Index | Every component on ui.shadcn.com/docs/components, linked to its Figma component and page (66 of 68 built; Direction and Toast have nothing to draw) |
| shadcn/ui · Actions & feedback | Button, Button (icon), Button group, Toggle, Toggle group, Spinner, Sonner, Alert, Alert dialog, Progress, Skeleton, Empty |
| shadcn/ui · Forms | Label, Input, Input group, Input OTP, Textarea, Checkbox, Radio group, Switch, Slider, Select, Native select, Combobox, Field, Form, Calendar, Date picker trigger |
| shadcn/ui · Navigation & menus | Tabs, Dropdown menu, Context menu, Menubar, Navigation menu, Breadcrumb, Pagination, Command, Sidebar |
| shadcn/ui · Data display | Badge, Kbd, Avatar, Card, Table, Data table, Accordion, Separator, Item, Carousel, Chart (tooltip, legend, bar chart), Typography |
| shadcn/ui · Overlays | Modal (Dialog, Alert dialog, Sheet or Drawer open over the overlay), Tooltip, Dialog, Popover, Hover card, Sheet, Drawer, Date picker (open) |
| shadcn/ui · Layout | Collapsible, Scroll area, Resizable, Aspect ratio |
| shadcn/ui · AI | Bubble, Message, Message scroller, Marker, Attachment, Code block, Questionnaire, Trace |
| Ourigin Components | The product's atoms, molecules and organisms |
| Patterns | App shell (sidebar, top bar and a Content slot) |
| Playground | Free space for experiments |

**Ourigin — Application:** Cover, then one page per module: Home, Inbox,
Calendar, Messages, Organization, Goals, People, Resources. It uses the
published Ourigin — Design System library.

## Variables

| Collection | Holds | Example |
| --- | --- | --- |
| Primitives | `brand/*` and Tailwind's white and black (hidden from pickers) | `brand/deep-teal` = `--brand-deep-teal` |
| Color (mode Light) | The shadcn theme (`background`, `primary`, `sidebar-accent`, `chart-1`…), Ourigin product colours (`success`, `tile`, `nav-icon`…), `derived/*` and `component/*` | `primary` = `--primary` |
| Spacing | Tailwind's scale, 1 step = 4px | `spacing/4` = `calc(var(--spacing) * 4)` = 16px |
| Radius | `radius/sm` … `radius/4xl`, `radius/card`, `radius/tile`, `radius/control`, `radius/full` | `radius/lg` = `--radius` = 10px |
| Typography | `font/sans` (Inter), `font/heading` (Manrope), `text/*/size` and `text/*/line-height`, `font-weight/*` | `text/sm/size` = `--text-sm` |

Naming follows the CSS so a future sync can map Figma to code one to one:

- **Code syntax:** every variable's web code syntax holds the exact CSS it
  stands for. Dev Mode shows it, and a sync script can read it.
- **Literals and aliases:** colours that are literal values in CSS are literal
  in Figma, and colours that reference a brand variable in CSS are aliases (for
  example `foreground` is `brand/ink`).
- **`derived/*`:** Tailwind opacity modifiers and mixes, such as
  `derived/primary-80` for `bg-primary/80`. They reference their base colour
  with an opacity, so they follow it, and they aren't synced.
- **`component/*`:** hex values hard-coded in components, such as the pill tones
  in `atoms/pill.tsx`. They are candidates for CSS variables.

**Text styles:**
- `text-xs/…` to `text-lg/…`: shadcn component text, plus the `leading-none` and `tracking-widest` variants.
- `heading-base/medium-none`: the dialog title.
- `sonner/*`: toast text.
- `ourigin/caption`, `detail` and `body` with their weights, and `ourigin/heading/*`.

The styles bind family, size, line height and weight to the Typography
variables where Tailwind has a token.

**Effect styles:**
- `shadow/2xs` … `shadow/2xl`: Tailwind's shadows.
- `shadow/frame`, `card`, `soft`, `medal`, `dock` and `dialog`: Ourigin's `--shadow-*`.
- `shadow/toast`: Sonner's default shadow.
- `focus/ring` and `focus/ring-invalid`.

Components draw focus as a "Focus ring" layer: a 2px ring stroke 2px outside the
edge, as `globals.css` does with `outline` and `outline-offset`. Figma's shadow
spread doesn't render on shapes without a fill or clipping, so a layer is the
reliable choice.

## Components

**shadcn/ui:** every component on the shadcn/ui docs list (radix-nova style, the same as the app's `components.json`): 66 of 68, across seven pages, with an Index page that links each one. The 12 the app uses come from `src/components/ui`; the rest come from the registry source, or from the docs for the docs-only patterns (Typography, Data Table, Date Picker, Form). Direction (a provider) and Toast (deprecated, replaced by Sonner) have nothing to draw. shadcn has no component called Modal: its modals are Dialog, Alert Dialog, Sheet and Drawer; the Modal component shows them open over the overlay, and their descriptions include "modal" so a search finds them. Properties are named after the React props. The main ones:

| Component | Variants and properties |
| --- | --- |
| Button | variant (6) × size (default, xs, sm, lg) × state (default, hover, focus, disabled); label, left and right icons |
| Button (icon) | variant (5) × size (icon, icon-xs, icon-sm, icon-lg) × state; icon |
| Sonner | type (default, success, info, warning, error, loading); title, description, action |
| Label | state (default, disabled); text |
| Checkbox | checked × state (default, focus, disabled, invalid) |
| Textarea | content (placeholder, value) × state; text |
| Tabs trigger, Tabs list | variant (default, line) × state (default, hover, active, focus, disabled); label, icon |
| Dropdown menu item | kind (item, destructive, checkbox, radio, submenu) × state (default, highlighted, disabled); label, icon, shortcut, checked |
| Dropdown menu | Items slot, with label and separator components |
| Badge | variant (6); label, icon |
| Kbd, Kbd group | context (default, tooltip); key |
| Avatar, Avatar group | size (default, sm, lg) × type (image, fallback); image, initials, badge; group count |
| Tooltip | side (top, bottom, left, right); text, kbd |
| Dialog | Header, a Content slot, Footer and a close button; Dialog overlay |
| Input, Select trigger, Native select | content or value × state (default, focus, disabled, invalid); sizes where the code has them |
| Field | orientation (vertical, horizontal) × invalid; Field set and Field separator |
| Switch, Radio group item, Slider | checked or type × state |
| Calendar | Calendar day (8 states) and a month in single and range mode |
| Card | size (default, sm) × footer; Content slot |
| Sidebar | Sidebar menu button size × state, sub button, group label, badge; Sidebar expanded and collapsed |
| Command, Dropdown menu, Context menu, Select content, Combobox content, Popover, Sheet, Drawer | Slots for their items or content |

The AI components (Bubble to Trace) aren't used by the app yet; they're
candidates for Ask Ourigin.

**Ourigin components:**

| Layer | Components |
| --- | --- |
| Atoms | Button (tone × state), Pill, User avatar, Medal |
| Molecules | Nav link, Following item, Ask Ourigin card, Nav group label, Search field, Account menu trigger, item and menu, Page heading, Feed tab, Feed tabs, Post byline, Post actions, Linked work, Callout, Rail item, Event item, Context panel (Content slot), Text link |
| Organisms | Composer, Post card (six kinds), Top bar, App sidebar (expanded and collapsed), Toast |

Each description names its source file. Padding, gaps and radii on the Tailwind
scale are bound to variables; values that are arbitrary in code (for example
`gap-[9px]`) stay as numbers.

**Patterns:** App shell (sidebar expanded or collapsed), 1440×900, with a
Content slot for the page.

## Steps that need you in Figma

1. **Publish after library changes:** the library was first published on
   2026-11-10. After changing it, publish again from the Assets panel's library
   dialog, then accept the updates in Ourigin — Application.
2. **Optional:** rename the old file to show it's a backup, for example
   "Ourigin Design System (old, Obra-based)". Set file thumbnails by
   right-clicking a Cover frame and choosing Set as thumbnail.

## Screens

| Module | Status |
| --- | --- |
| Home | Desktop 1440, built from Pattern/App shell with the page heading, the context rail's six panels and the feed (composer, tabs, five post cards) |
| Inbox, Calendar, Messages, Organization, Goals, People, Resources | Pages ready; designed when the sections are |

## Known approximations

- Manrope 650 and 750 are drawn as SemiBold (600) and ExtraBold (800).
- An icon swapped into a component keeps the icon's own colour. Recolour it on
  the instance.
- A Button with an icon trims 2px of padding on that side in code. The Figma
  Button keeps the base padding. Dropdown `inset` items aren't modelled.
- The recognition and mint gradients are hard-coded in the code and in Figma.
- Screens and patterns are desktop (lg, 1440px) first.
- In Ourigin's theme `muted` (#f3f7f5) is almost the same as `background`
  (#eff5f3), so muted surfaces directly on the page background (a Calendar's
  today cell and range band, a Skeleton) are hard to see. On cards and popovers
  they show as intended. This is the app's theme, so the tokens are unchanged.
- `font-mono` has no font in the app's CSS (it falls back to the system mono
  stack); Figma uses Roboto Mono through the `font/mono` variable.
- Chart is a static example; Recharts draws the real one. The tinted Bubble
  colour is computed from `primary` in CSS and stored as `derived/primary-tint`;
  recompute it if `primary` changes.

## Future alignment (code, not now)

- `components.json` uses `"style": "radix-nova"`. The library keeps the same
  shapes and sizes without the name. Decide whether the code keeps the preset
  or moves its classes into Ourigin's own components.
- `component/*` colours (pill tones, avatar backdrop, medal ribbon, Sonner's
  description grey) could become CSS variables.

## Keeping Figma and code in sync

Not set up yet. On the Pro plan, Figma's Variables REST API (Enterprise) and
Code Connect (Organization) aren't available, so a sync would be
semi-automated:

| Change | How |
| --- | --- |
| A token value changes in Figma | An agent reads the variables through the Figma MCP server, writes the values into `:root` in `globals.css` using each variable's code syntax, runs the visual checks and opens a change for review |
| A token value changes in code | The same agent updates the variable in Figma |
| A token is added, renamed or removed | Manual review: code references the name |
| A component's structure changes | Manual in both places; keep names aligned with the code |

Tailwind reads the CSS variables, so value changes need no other code edits.
