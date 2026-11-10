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
        "text-body text-muted-foreground",
        className,
        // After className: cn drops a line height that precedes a font size.
        "leading-[1.7]"
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
