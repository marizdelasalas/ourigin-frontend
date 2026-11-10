import { createCn } from "cn/config"

/**
 * Class merging aware of the custom radius, shadow and font-size tokens in
 * globals.css, so `cn("rounded-card", "rounded-[18px]")` resolves to the latter
 * and `cn("text-body", "text-muted-foreground")` keeps both.
 *
 * shadcn primitives in components/ui use the default `cn` export, so pass
 * them arbitrary values (`rounded-[12px]`, `text-(length:--text-body)`)
 * rather than these token names.
 */
export const cn = createCn({
  extend: {
    theme: {
      radius: ["card", "tile", "control"],
      shadow: ["frame", "card", "soft", "medal", "dock", "dialog"],
      text: ["caption", "detail", "body"],
    },
  },
})
