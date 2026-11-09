import { Fragment } from "react"

import { cn } from "@/lib/utils"

/** Post copy where each entry starts on a new line. */
export function PostText({
  lines,
  className,
}: {
  lines: string[]
  className?: string
}) {
  return (
    <p
      className={cn(
        "text-[11px] text-muted-foreground 2xl:text-[12px]",
        className,
        // After className: cn drops a line height that precedes a font size.
        "leading-[1.85]"
      )}
    >
      {lines.map((line, index) => (
        <Fragment key={index}>
          {index > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </p>
  )
}
