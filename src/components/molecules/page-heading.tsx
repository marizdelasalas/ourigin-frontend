import { Heading } from "@/components/atoms/heading"
import { workspace } from "@/lib/data/people"

type PageHeadingProps = {
  title: string
  description: string
  eyebrow?: string
  action?: React.ReactNode
}

export function PageHeading({
  title,
  description,
  eyebrow = workspace.tagline,
  action,
}: PageHeadingProps) {
  return (
    <div className="mb-[23px] flex items-end justify-between gap-3 md:mb-[27px] md:gap-5">
      <div>
        <p className="mb-2 text-[7px] tracking-[1.5px] text-muted-foreground uppercase md:mb-[9px] md:text-[8px]">
          {eyebrow}
        </p>
        <Heading as="h1" level="page">
          {title}
        </Heading>
        <p className="mt-[7px] max-w-[260px] text-[10px] leading-[1.7] text-muted-foreground md:max-w-none md:text-[11px] md:leading-[1.45]">
          {description}
        </p>
      </div>
      {action}
    </div>
  )
}
