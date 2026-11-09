# Design foundations

The values here come from the Ourigin brand identity proposal (sections 03–05)
and the "New design proposal" page, which is the design source
([ADR-0002](../decisions/0002-build-the-new-design-proposal.md)). They're
defined in `src/app/globals.css`
([ADR-0006](../decisions/0006-brand-tokens-and-design-breakpoints.md)).

The design is **light only**. There is no dark palette, and shadcn's `dark:`
classes never activate.

## Colour

### Brand palette

| Name | Hex | CSS variable | Use |
| --- | --- | --- | --- |
| Deep teal (primary) | `#075E63` | `--brand-deep-teal` | Wordmark, navigation, primary actions |
| Turquoise | `#2CBDB3` | `--brand-turquoise` | Logo ribbon, active navigation marker |
| Overlap teal | `#128D89` | `--brand-overlap` | Logo ribbon overlap |
| Sea teal | `#2FA8A0` | `--brand-sea` | Logo person dot |
| Ink | `#172B35` | `--brand-ink` | Primary text |
| Muted | `#647680` | `--brand-muted` | Secondary text |
| Border | `#D9E3E5` | `--brand-border` | Dividers and outlines |

### Semantic tokens (shadcn)

Use these through Tailwind utilities (`bg-primary`, `text-muted-foreground`, …).

| Token | Value | Notes |
| --- | --- | --- |
| `background` / `foreground` | `#EFF5F3` / ink | App surface inside the frame |
| `card`, `popover` | `#FFFFFF` / ink | |
| `primary` / `primary-foreground` | deep teal / white | |
| `secondary`, `muted` | `#F3F7F5` | Composer field, callouts |
| `muted-foreground` | muted | |
| `accent` / `accent-foreground` | `#E9F3EF` / deep teal | Hover backgrounds |
| `destructive` | `#C94444` | Brand "Error" |
| `border`, `input` | border | |
| `ring` | `#4D78C9` | Focus outline, from the prototype |
| `sidebar` | white at 85% | Sidebar surface |
| `sidebar-accent` | `#E0F0EC` | Active navigation item |
| `sidebar-border` | `#DCE8E2` | Collapse toggle outline |
| `chart-1` … `chart-5` | deep teal, `#4D78C9`, `#8A6BC1`, `#D89A39`, `#D97869` | Brand data-visualisation palette |

### Product and status tokens

| Utility | Value | Use |
| --- | --- | --- |
| `divider` | `#ECF2EF` | Rows inside context panels |
| `tile` | `#F1F7F4` | Linked-work block |
| `chip` | `#EAF4EF` | Initials avatar |
| `nav-icon` | `#168D88` | Inactive navigation icons |
| `success` | `#24864B` | Brand "Success": pair with a label or icon |
| `warning` | `#A86508` | Brand "Warning" |
| `info` | `#2865B4` | Brand "Information" |

Colours used once in the design (the recognition gradient, medal ribbon, pill
tints) stay as arbitrary values in the component that uses them.

## Typography

| Role | Font | Weights in use |
| --- | --- | --- |
| Headings, wordmark | Manrope (`font-heading`) | 650, 700, 750 |
| Body and interface | Inter (`font-sans`) | 400, 600, 650, 700, 750 (dialog titles) |

The base text is **12px with a 1.45 line height**. The design's small type
(7–14px) uses arbitrary values such as `text-[11px]`, copied from the
prototype.

Heading levels (`atoms/heading.tsx`):

| Level | Base | `sm` | `md` | `lg` | `2xl` | Used for |
| --- | --- | --- | --- | --- | --- | --- |
| `page` | 28px | | 32px | | | Page `h1` |
| `feature` | 25px | | | 29px | 33px | Featured announcement |
| `post` | 21px | | | | | Post titles, empty states |
| `recognition` | 23px | | | 27px | | Recognition title (teal) |
| `panel` | 21px | 18px | 15px | | 17px | Context panel titles |

Post body copy (`PostText`) is 11px with a 1.85 line height (12px from `2xl`).

## Radius

| Utility | Value | Use |
| --- | --- | --- |
| `rounded-card` | 21px | Posts and context panels |
| `rounded-tile` | 13px | Linked work, callouts |
| `rounded-control` | 12px | Search field, dialog, composer field |
| `rounded-[18px]` | 18px | Composer card |
| `rounded-[11px]` / `rounded-[10px]` | | Primary / soft buttons (set in `atoms/button.tsx`) |
| shadcn scale (`rounded-sm` … `rounded-4xl`) | from `--radius: 0.625rem` | Used inside shadcn primitives |

Don't pass the custom radius names into shadcn primitives; see the
[cn rules](../guides/conventions.md#cn-rules).

## Shadow

| Utility | Value | Use |
| --- | --- | --- |
| `shadow-frame` | `0 30px 80px #075e6314` | Unused since the shell went full-viewport |
| `shadow-card` | `0 6px 23px #075e6305` | Posts, panels, composer |
| `shadow-soft` | `0 4px 14px #075e6305` | Search field, Customize feed |
| `shadow-medal` | `0 8px 20px #075e6315` | Recognition medal |
| `shadow-dock` | `0 -5px 25px #075e6309` | Phone bottom tab bar |
| `shadow-dialog` | `0 20px 80px #172b3525` | Dialogs |

The `bg-backdrop` utility (the soft gradient that sat behind the old floating
frame) is kept in `globals.css` but is currently unused.

## Iconography

[ADR-0007](../decisions/0007-custom-duotone-icon-set.md)

- `atoms/icon.tsx` contains the brand's two-tone set: solid shapes with
  translucent secondary layers on a 24px grid. Use `<Icon name="…" />`.
- Every shape uses `currentColor`, so colour icons with `text-*`. The default
  size is 18px; change it with `size-*`.
- Typical sizes follow the brand guide: 20–24px for navigation and actions,
  13–17px inside cards.
- Available names: `house`, `inbox`, `calendar-days`, `messages-square`,
  `network`, `target`, `users-round`, `panels-top-left`, `chevron-down`,
  `book-open`, `sparkles`, `sliders-horizontal`, `search`, `bell`,
  `circle-help`, `plus`, `pencil`, `message-circle`, `award`, `paperclip`,
  `ellipsis`, `arrow-up-right`, `heart`, `trophy`, `bookmark`, `circle-check`,
  `heart-handshake`, `panel-left-close`, `panel-left-open`.
- Lucide is installed only because shadcn primitives use it internally. Don't
  use it in Ourigin components.

## Imagery

| Asset | Location | Notes |
| --- | --- | --- |
| Brand symbol | `src/assets/brand/ourigin-symbol.png` (1254×1254) | Rendered with `BrandSymbol` |
| App icons | `src/app/icon.png` (512px), `src/app/apple-icon.png` (180px) | Generated from the symbol |
| People | `src/assets/people/*.png` (39×39) | Temporary crops ([ADR-0011](../decisions/0011-temporary-imagery-cropped-from-prototype.md)) |
| Team photo | `src/assets/content/team-collaboration.png` (202×59) | Temporary crop |

Images are imported statically, so `next/image` knows their size and avoids
layout shift. Avatars next to a name are decorative (`alt=""`).
