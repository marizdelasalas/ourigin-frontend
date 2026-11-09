import { Heading } from "@/components/atoms/heading"
import { Icon, type IconName } from "@/components/atoms/icon"
import { Surface } from "@/components/atoms/surface"

type EmptyStateProps = {
  icon: IconName
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Surface className="flex flex-col items-center px-6 py-14 text-center md:py-20">
      <span className="grid size-16 place-items-center rounded-full bg-sidebar-accent">
        <Icon name={icon} className="size-7 text-primary" />
      </span>
      <Heading level="post" className="mt-5">
        {title}
      </Heading>
      <p className="mt-2 max-w-[340px] text-[11px] leading-[1.85] text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </Surface>
  )
}
