# Conventions

## Files and naming

- File names are kebab-case (`post-byline.tsx`); components are PascalCase
  named exports (`export function PostByline`). Pages and layouts are named
  exports too, referenced from `app/router.tsx`.
- Keep one component family per file. Small private helpers can stay in the
  same file (`PostShell` in `post-card.tsx`).
- There are no barrel `index.ts` files for components; import from the file
  directly. `lib/data/index.ts` is the data access layer, not a barrel.
- Import with the `@/` alias (`@/components/atoms/icon`). Order imports as:
  React and React Router, then third-party packages, then `@/` imports, then
  relative imports, with a blank line between groups.

## Components

- Put each component in the right layer and import downwards only. See the
  [layering rules](../architecture/components.md#rules).
- Leave `components/ui/` untouched; wrap primitives in atoms instead.
- Don't add `"use client"`: there are no Server Components in this app.
  Keep components without state or effects free of hooks anyway.
- Pass images as URL strings. A static import (`import photo from
  "@/assets/…/photo.png"`) gives you the URL.
- Navigate with React Router: `Link to`, `useLocation`, `useNavigate`.
- Use `cva` for variants in atoms (see `atoms/button.tsx`, `atoms/pill.tsx`),
  and accept a `className` prop merged last with `cn()`.

## Styling

- Use Tailwind utilities in `className`; avoid inline `style`.
- Prefer tokens (`bg-primary`, `text-muted-foreground`, `rounded-card`,
  `shadow-card`) over raw hex values. Values used only once in the design can
  stay as arbitrary values in their component.
- Write mobile-first: unprefixed classes are the phone layout. The
  breakpoints are the design's, not Tailwind's defaults; see
  [responsive layout](../design-system/responsive-layout.md).
- Set font sizes with the type tokens: `text-caption` (12px), `text-detail`
  (13px) and `text-body` (14px). Headings come from the `Heading` atom. Don't
  add one-off pixel sizes, and don't go below 12px. See
  [typography](../design-system/foundations.md#typography).

### cn rules

`cn` merges classes and resolves conflicts. Two behaviours matter here:

1. **Put line height after font size.** `cn` treats `text-[size]` and
   `leading-*` as conflicting, so a font size that comes *later* removes an
   earlier line height:

   ```ts
   cn("leading-[1.5]", "text-[12px]")   // → "text-[12px]" (line height lost)
   cn("text-[12px]", "leading-[1.5]")   // → both kept
   ```

2. **Use arbitrary values for custom tokens inside shadcn primitives.**
   `@/lib/utils` knows the custom names (`rounded-card`, `shadow-soft`,
   `text-body`), but `components/ui/*` uses the default `cn`, which doesn't.
   When you pass a class into a primitive (for example through the `Button`
   atom, `TabsTrigger` or `DropdownMenuItem`), use `rounded-[12px]` rather than
   `rounded-control`, and `text-(length:--text-body)` rather than `text-body`.
   Otherwise the default `cn` mistakes `text-body` for a colour and drops it
   next to `text-muted-foreground`, or keeps two radius classes and leaves the
   result to CSS order.

In application code, always import `cn` from `@/lib/utils`.

## Accessibility

- Icon-only buttons need an `aria-label`, or a visible label hidden with
  `sr-only` at the sizes where it isn't shown.
- Use `aria-current="page"` on the active navigation link and `aria-pressed`
  on toggle buttons (Save, Appreciate).
- Give decorative images `alt=""`, for example avatars next to a person's name.
- Every dialog needs a title. If it has no description, pass
  `aria-describedby={undefined}` (`PreviewDialog` does this).
- There is one focus indicator: a 2px `ring` outline (`#128D89`) with a 2px
  offset, shown only for keyboard focus (`:focus-visible`). The base layer
  draws it on links, buttons, inputs and textareas, and an unlayered rule in
  `globals.css` gives shadcn primitives the same outline in place of their
  translucent ring. Menu items show their highlight background instead. Don't
  add other focus rings, and don't remove this one.
- When you move focus in code, keep the user's input mode:
  `focus({ focusVisible: false })` after mouse or touch use (as `AccountMenu`
  does), so the ring doesn't appear after a click.
- Keep touch targets at least 32px tall on phones; primary actions are 42px.

## Data

- Pages get their data through the async getters in `lib/data/index.ts`.
- Static reference data (navigation, the signed-in user, demo copy) can be
  imported directly from its module.
- Shared types live in `src/types/workplace.ts`.

## Before merging

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`, then `npm run preview` to try the production build
4. Check the change at 390, 900 and 1440px. Check all
   [testing widths](../design-system/responsive-layout.md#testing-widths) if
   the layout changed.
5. Update the docs:
   - Add a log entry to [progress.md](../progress.md).
   - Update [components.md](../architecture/components.md#inventory) if
     components changed.
   - Add an [ADR](../decisions/README.md) if a decision was made.
