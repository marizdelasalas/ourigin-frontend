import { useId } from "react"

import { Heading } from "@/components/atoms/heading"
import { cn } from "@/lib/utils"

type ContextPanelProps = {
  title: React.ReactNode
  /** Badge or link shown opposite the title. */
  aside?: React.ReactNode
  tone?: "default" | "mint"
  className?: string
  headingClassName?: string
  children: React.ReactNode
}

/** Rounded card with a heading, used for each block in the context rail. */
export function ContextPanel({
  title,
  aside,
  tone = "default",
  className,
  headingClassName,
  children,
}: ContextPanelProps) {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "mb-[18px] rounded-card bg-card p-[23px] shadow-card md:mb-[22px] md:px-[15px] md:py-[18px] lg:px-5 lg:py-[22px] 2xl:px-[23px] 2xl:py-[25px]",
        tone === "mint" && "bg-[linear-gradient(130deg,#dff0e9,#eaf4f1)]",
        className
      )}
    >
      <div
        className={cn(
          "mb-[19px] flex items-center justify-between gap-[15px]",
          headingClassName
        )}
      >
        <Heading id={headingId} level="panel">
          {title}
        </Heading>
        {aside}
      </div>
      {children}
    </section>
  )
}
