import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const pillVariants = cva(
  "h-auto rounded-[20px] border-0 font-[650] whitespace-nowrap text-primary",
  {
    variants: {
      tone: {
        default: "bg-[#eef5f4]",
        decision: "bg-[#e7f2ef]",
        /** Round counter, e.g. unread items in the navigation. */
        count: "grid size-[21px] place-items-center rounded-full bg-[#f1f5f4] p-0 font-bold",
      },
      size: {
        sm: "px-2.5 py-[5px] text-[8px]",
        md: "px-3 py-1.5 text-[8px] md:text-[9px]",
        count: "text-[10px]",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "md",
    },
  }
)

type PillProps = ComponentProps<typeof Badge> & VariantProps<typeof pillVariants>

export function Pill({ tone, size, className, ...props }: PillProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(pillVariants({ tone, size }), className)}
      {...props}
    />
  )
}
