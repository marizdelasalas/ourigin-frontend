"use client"

import { Icon } from "@/components/atoms/icon"
import { UserAvatar } from "@/components/atoms/user-avatar"
import { cn } from "@/lib/utils"
import { useDemoDialog } from "@/providers/demo-dialog-provider"
import type { ContextItem } from "@/types/workplace"

type RailItemProps = {
  item: ContextItem
  /** Compact rows use smaller titles (saved shortcuts). */
  density?: "default" | "compact"
  /** Hide the trailing arrow. */
  hideArrow?: boolean
  className?: string
}

/** A row in a context panel that opens its destination. */
export function RailItem({
  item,
  density = "default",
  hideArrow,
  className,
}: RailItemProps) {
  const { openDemo } = useDemoDialog()
  const compact = density === "compact"

  return (
    <button
      type="button"
      onClick={() => openDemo(item.title)}
      className={cn(
        "flex w-full items-start gap-3 border-b border-divider py-[13px] text-left last:border-b-0 md:gap-[9px] md:py-[11px]",
        className
      )}
    >
      {item.person ? (
        <UserAvatar person={item.person} className="size-[26px]" />
      ) : item.icon ? (
        <Icon name={item.icon} className="mt-0.5 size-[15px] text-primary" />
      ) : null}
      {/* Font sizes come before `leading-*`: cn drops a line height that precedes a font size. */}
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            compact
              ? "text-[11px] md:text-[10px]"
              : "text-[12px] md:text-[10px] 2xl:text-[11px]",
            "block leading-[1.5] font-semibold"
          )}
        >
          {item.title}
        </span>
        <span
          className={cn(
            compact
              ? "text-[10px] md:text-[9px]"
              : "text-[10px] md:text-[9px] 2xl:text-[10px]",
            "mt-1 block leading-[1.65] text-muted-foreground"
          )}
        >
          {item.description}
        </span>
        {item.tag ? (
          <span className="mt-1.5 block text-[9px] font-semibold text-primary md:text-[8px] 2xl:text-[9px]">
            {item.tag}
          </span>
        ) : null}
      </span>
      {item.actionLabel ? (
        <span className="mt-1 text-[8px] font-semibold whitespace-nowrap text-primary">
          {item.actionLabel}
        </span>
      ) : hideArrow ? null : (
        <Icon name="arrow-up-right" className="size-[11px] self-center text-primary" />
      )}
    </button>
  )
}
