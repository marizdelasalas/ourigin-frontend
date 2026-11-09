import type { ComponentProps } from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

type SurfaceProps = ComponentProps<"div"> & { asChild?: boolean }

/** White, softly shadowed card surface shared by posts and composer. */
export function Surface({ asChild, className, ...props }: SurfaceProps) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="surface"
      className={cn("rounded-card bg-card shadow-card", className)}
      {...props}
    />
  )
}
