# Conventions

## Files and naming

- File names are kebab-case (`post-byline.tsx`); components are PascalCase
  named exports (`export function PostByline`). Pages, layouts and other
  Next.js special files use default exports, as the framework requires.
- Keep one component family per file. Small private helpers can stay in the
  same file (`PostShell` in `post-card.tsx`).
- There are no barrel `index.ts` files for components; import from the file
  directly. `lib/data/index.ts` is the data access layer, not a barrel.
- Import with the `@/` alias (`@/components/atoms/icon`). Order imports as:
  React and Next.js, then third-party packages, then `@/` imports, then
  relative imports, with a blank line between groups.

## Components

- Put each component in the right layer and import downwards only. See the
  [layering rules](../architecture/components.md#rules).
- Leave `components/ui/` untouched; wrap primitives in atoms instead.
- Server Components are the default. Add `"use client"` only to files that
  need state, effects or event handlers, and keep those files small.
- Props for page data must be serialisable. Pass images as static imports or
  URL strings.
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
- Small type sizes are arbitrary pixel values copied from the design
  (`text-[11px]`). Don't round them to Tailwind's scale.

### cn rules

`cn` merges classes and resolves conflicts. Two behaviours matter here:

1. **Put line height after font size.** `cn` treats `text-[size]` and
   `leading-*` as conflicting, so a font size that comes *later* removes an
   earlier line height:

   ```ts
   cn("leading-[1.5]", "text-[12px]")   // → "text-[12px]" (line height lost)
   cn("text-[12px]", "leading-[1.5]")   // → both kept
   ```

2. **Use arbitrary radius and shadow values inside shadcn primitives.**
   `@/lib/utils` knows the custom names (`rounded-card`, `shadow-soft`), but
   `components/ui/*` uses the default `cn`, which doesn't. When you pass a
   class into a primitive (for example through the `Button` atom), use
   `rounded-[12px]` rather than `rounded-control`. Otherwise both radius
   classes are kept and the result depends on CSS order.

In application code, always import `cn` from `@/lib/utils`.

## Accessibility

- Icon-only buttons need an `aria-label`, or a visible label hidden with
  `sr-only` at the sizes where it isn't shown.
- Use `aria-current="page"` on the active navigation link and `aria-pressed`
  on toggle buttons (Save, Appreciate).
- Give decorative images `alt=""`, for example avatars next to a person's name.
- Every dialog needs a title. If it has no description, pass
  `aria-describedby={undefined}` (`PreviewDialog` does this).
- Don't remove focus styles. The base layer draws a 2px `ring`-coloured
  outline for links, buttons, inputs and textareas.
- Keep touch targets at least 32px tall on phones; primary actions are 42px.

## Data

- Pages get their data through the async getters in `lib/data/index.ts`.
- Static reference data (navigation, the signed-in user, demo copy) can be
  imported directly from its module.
- Shared types live in `src/types/workplace.ts`.

## Before merging

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build` (every route should still prerender as static)
4. Check the change at 390, 900 and 1440px. Check all
   [testing widths](../design-system/responsive-layout.md#testing-widths) if
   the layout changed.
5. Update the docs:
   - Add a log entry to [progress.md](../progress.md).
   - Update [components.md](../architecture/components.md#inventory) if
     components changed.
   - Add an [ADR](../decisions/README.md) if a decision was made.
