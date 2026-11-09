import Link from "next/link"

import { Icon } from "@/components/atoms/icon"
import { Pill } from "@/components/atoms/pill"
import { ContextPanel } from "@/components/molecules/context-panel"
import { EventItem } from "@/components/molecules/event-item"
import { RailItem } from "@/components/molecules/rail-item"
import { OpenSavedButton } from "@/components/organisms/feed-controls"
import { cn } from "@/lib/utils"
import type { WorkplaceContext } from "@/types/workplace"

type ContextRailProps = {
  context: WorkplaceContext
  className?: string
}

/** Attention items, today's events and related work beside the feed. */
export function ContextRail({ context, className }: ContextRailProps) {
  const { attention, today, connectedWork, meet, following, saved } = context

  return (
    <aside aria-label="Workplace context" className={cn("min-w-0", className)}>
      <ContextPanel
        title="Needs your attention"
        aside={<Pill size="sm">{attention.openCount} open</Pill>}
        headingClassName="mb-[9px]"
      >
        {attention.items.map((item) => (
          <RailItem key={item.title} item={item} className="py-2.5 md:py-2.5" />
        ))}
      </ContextPanel>

      <ContextPanel
        title="Today"
        aside={
          <Link
            href="/calendar"
            className="text-[10px] font-[650] text-primary md:text-[8px]"
          >
            Open calendar
          </Link>
        }
      >
        {today.map((event) => (
          <EventItem key={event.title} event={event} />
        ))}
      </ContextPanel>

      <ContextPanel title="Connected work">
        {connectedWork.map((item) => (
          <RailItem
            key={item.title}
            item={item}
            className="border-0 py-[11px] md:py-[9px]"
          />
        ))}
      </ContextPanel>

      <ContextPanel title="Meet, share, contribute" tone="mint">
        {meet.map((item, index) => (
          <RailItem
            key={item.title}
            item={item}
            className={cn(
              "gap-[7px] pb-3 md:gap-[7px] md:pb-3",
              index === 0 ? "pt-[7px] md:pt-[7px]" : "pt-[15px] md:pt-[15px]"
            )}
          />
        ))}
      </ContextPanel>

      <ContextPanel title="Following in this demo">
        {following.map((item) => (
          <RailItem key={item.title} item={item} className="py-[11px] md:py-[11px]" />
        ))}
      </ContextPanel>

      <ContextPanel
        title={
          <span className="flex items-center gap-4">
            <Icon name="bookmark" className="size-[22px] text-primary" />
            Saved for later
          </span>
        }
        headingClassName="mt-1 mb-[7px]"
      >
        <p className="mb-2.5 text-[9px] leading-[1.7] text-muted-foreground">
          {saved.description}
        </p>
        {saved.items.map((item) => (
          <RailItem
            key={item.title}
            item={item}
            density="compact"
            hideArrow
            className="border-0 py-[5px] md:py-[5px]"
          />
        ))}
        <OpenSavedButton />
      </ContextPanel>
    </aside>
  )
}
