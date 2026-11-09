import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Manrope heading styles from the identity proposal's type hierarchy. */
const headingVariants = cva("font-heading font-[650]", {
  variants: {
    level: {
      page: "text-[28px] leading-[1.2] tracking-[-1.2px] md:text-[32px]",
      feature:
        "text-[25px] leading-[1.35] tracking-[-0.5px] md:leading-[1.22] md:tracking-[-0.7px] lg:text-[29px] 2xl:text-[33px]",
      post: "text-[21px] leading-[1.35] tracking-[-0.5px] md:leading-[1.3] md:tracking-[-0.7px]",
      recognition:
        "text-[23px] leading-[1.35] tracking-[-0.5px] text-primary md:leading-[1.2] md:tracking-[-0.7px] lg:text-[27px]",
      panel:
        "text-[21px] leading-[1.3] tracking-[-0.3px] sm:text-[18px] md:text-[15px] 2xl:text-[17px]",
    },
  },
  defaultVariants: {
    level: "post",
  },
})

type HeadingProps = ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3"
  }

export function Heading({ as: Tag = "h2", level, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ level }), className)} {...props} />
}
