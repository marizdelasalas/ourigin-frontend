# Responsive layout

Styles are written **mobile-first**: unprefixed classes describe the phone
layout, and prefixed classes (`md:`, `lg:` and so on) apply from that width up.
Tailwind's default breakpoints are replaced with the design's
([ADR-0006](../decisions/0006-brand-tokens-and-design-breakpoints.md)).

## Breakpoints

| Prefix | Min width | Defined as | Role |
| --- | --- | --- | --- |
| _(none)_ | 0 | | Phones: bottom tab bar, single column |
| `sm` | 651px | `40.6875rem` | Small adjustments carried over from the prototype |
| `md` | 701px | `43.8125rem` | Tablet: sidebar replaces the tab bar, rail beside the feed |
| `lg` | 1151px | `71.9375rem` | Desktop spacing and column widths |
| `xl` | 1351px | `84.4375rem` | Callout and decision rows stop wrapping |
| `2xl` | 1500px | `93.75rem` | Wide desktop: wider rail, larger type in cards |

`max-md:` targets phones only. It's used for behaviour that only exists there,
such as the collapsing search field.

## Layout by width

| | Phone (< 701) | Tablet (701–1150) | Desktop (1151–1499) | Wide (≥ 1500) |
| --- | --- | --- | --- | --- |
| Shell | Full viewport, `#EFF5F3`; bottom padding for the tab bar | Full viewport (`w-full min-h-dvh`), no outer margin or frame | Same | Same |
| Navigation | Bottom tab bar, 65px plus safe area: Home, Inbox, Calendar, Messages | Sidebar 185px (78px collapsed) | Sidebar 210px (78px collapsed) | Same |
| Top bar | 77px: symbol and wordmark, search icon, avatar | 92px: wordmark, 260px search, notifications, help, avatar | 365px search | Same |
| Page padding (top, sides, bottom) | 8 / 16 / 25px | 0 / 18 / 24px | 0 / 30 / 30px | 0 / 34 / 36px |
| Columns | Feed, then context rail below | Rail 220px + feed, 16px gap | Rail 290px + feed, 24px gap | Rail 310px + feed, 28px gap |

The context rail comes **after** the feed in the HTML at every width, so phones
read feed-first. From `md` up it's placed in the left grid column.

## Component behaviour

| Component | Behaviour |
| --- | --- |
| `SearchField` | Icon-only on phones; it expands across the top bar while focused. ⌘K hint from `md` |
| `Composer` | Create post is icon-only below `lg`; "Attach a source" is hidden on phones |
| `CustomizeFeedButton` | Icon-only on phones (the label stays available to screen readers) |
| `Feed` tabs | The caption on the right is hidden on phones; tabs are at least 33px tall for touch |
| `LinkedWork` | Photo hidden on phones; 80px wide on tablet, 140px from `lg` |
| `PostActions` | Wraps on phones with 32px touch targets; the spacer pushes actions right from `md` |
| Decision post | Call to action is full width on phones; the row wraps below `xl` |
| `Callout` | Wraps below `xl`; action button is 42px tall on phones |
| Recognition post | Medal 46px on phones, 64px from `md`; footer wraps below `lg` |
| `ContextPanel` titles | 21px below `sm`, 18px to `md`, 15px on tablet and desktop, 17px from `2xl` |
| Toasts | Above the tab bar on phones (`--toast-offset`); 25px from the bottom from `md` |

## Safe areas

The viewport uses `viewport-fit=cover`. The tab bar height and the page's bottom
padding add `env(safe-area-inset-bottom)`, so nothing sits under the iPhone
home indicator. Browsers without insets treat it as 0.

## Testing widths

Check changes at **390, 680, 900, 1280, 1440 and 1600px**. Together these cover
every breakpoint and are the widths used for the parity check in
[prototype parity](prototype-parity.md).
