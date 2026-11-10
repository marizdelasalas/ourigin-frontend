# Adding components

## 1. Choose the layer

Ask these questions in order:

1. **Is it a generic primitive from shadcn** (select, popover, dropdown)? Add
   it to `components/ui/` with the CLI (step 2).
2. **Is it one element** (a badge, a heading style, an icon) or an Ourigin
   version of a primitive? → **atom**.
3. **Is it a few atoms that only make sense together** (an icon, a title and a
   description in one row)? → **molecule**.
4. **Is it a distinct section of the interface with its own purpose** (a
   panel, a dialog, a navigation bar)? → **organism**.
5. **Is it the arrangement of a whole page with no content of its own?** →
   **template**.

If a component needs something from a higher layer, move it up a layer.

## 2. Add a shadcn primitive

```bash
npx shadcn@latest add select
```

- The CLI writes the file to `src/components/ui/` and installs its
  dependencies. **Don't restyle the generated file.**
- Read the generated classes before wrapping the primitive. shadcn components
  set fixed heights, text sizes, borders and focus rings that your atom may
  need to override.
- Check what changed upstream with `npx shadcn@latest add select --diff`.

## 3. Wrap it in an atom

Atoms add Ourigin variants on top of the primitive and pass everything else
through. This is the pattern used by `atoms/pill.tsx`:

```tsx
import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const pillVariants = cva("h-auto rounded-[20px] border-0 font-[650] text-primary", {
  variants: {
    tone: { default: "bg-[#eef5f4]", decision: "bg-[#e7f2ef]" },
  },
  defaultVariants: { tone: "default" },
})

type PillProps = ComponentProps<typeof Badge> & VariantProps<typeof pillVariants>

export function Pill({ tone, className, ...props }: PillProps) {
  return <Badge className={cn(pillVariants({ tone }), className)} {...props} />
}
```

Remember the [cn rules](conventions.md#cn-rules). Put `leading-*` after any
font size, and pass arbitrary radius or shadow values (not the custom token
names) into primitives.

## 4. Build molecules and organisms

- Accept a `className` prop and merge it last.
- Read shared state through provider hooks (`useDemoDialog`, `useFeedView`,
  `useHomeFeed`) rather than passing setters through several layers.
- Take content as props. A molecule shouldn't import fixtures, apart from
  reference data like the signed-in user.

```tsx
import { Icon, type IconName } from "@/components/atoms/icon"
import { cn } from "@/lib/utils"
import { useDemoDialog } from "@/providers/demo-dialog-provider"

type StatusRowProps = {
  icon: IconName
  title: string
  className?: string
}

export function StatusRow({ icon, title, className }: StatusRowProps) {
  const { openDemo } = useDemoDialog()
  return (
    <button
      type="button"
      onClick={() => openDemo(title)}
      className={cn("flex items-center gap-3 text-left", className)}
    >
      <Icon name={icon} className="size-[15px] text-primary" />
      <span className="text-[10px] font-semibold">{title}</span>
    </button>
  )
}
```

## 5. Add an icon

Icons live in the `icons` map in `src/components/atoms/icon.tsx`. Use them for
navigation and content. Lucide is only for standard controls such as menus,
chevrons and panel toggles ([ADR-0014](../decisions/0014-lucide-icons-for-standard-controls.md)).

- Draw on a 24×24 grid with filled shapes. Use `opacity` (around 0.15–0.5) for
  the secondary layer, and `fill="none" stroke="currentColor"` only for detail
  strokes (2–2.5px).
- Use `currentColor` for every shape (white is allowed for cut-outs), so the
  icon follows its text colour.
- Name the key in kebab-case after the shape, not the feature (`network`, not
  `organization`). The `IconName` type updates automatically.

## 6. Update the docs

Add the component to the
[inventory](../architecture/components.md#inventory), and add a log entry to
[progress.md](../progress.md).
