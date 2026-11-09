"use client"

import { Button } from "@/components/atoms/button"
import { Icon, type IconName } from "@/components/atoms/icon"
import { UserAvatar } from "@/components/atoms/user-avatar"
import { useDemoDialog } from "@/providers/demo-dialog-provider"
import type { Person } from "@/types/workplace"

type CalloutProps = {
  title: string
  description: string
  actionLabel: string
  /** Title of the destination opened by the action. */
  destination: string
  icon?: IconName
  person?: Person
}

/** Tinted block inside a post that points to an opportunity or a profile. */
export function Callout({
  title,
  description,
  actionLabel,
  destination,
  icon,
  person,
}: CalloutProps) {
  const { openDemo } = useDemoDialog()

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5 rounded-tile bg-secondary p-3.5 md:mt-[23px] md:gap-[15px] md:p-[17px] xl:flex-nowrap">
      {person ? (
        <UserAvatar person={person} className="size-8 sm:size-[34px]" />
      ) : icon ? (
        <Icon name={icon} className="size-[22px] text-primary" />
      ) : null}
      {/* No min-w-0: the text's min-content width decides when the row wraps. */}
      <div className="flex-1">
        <span className="text-[11px] font-bold">{title}</span>
        <span className="mt-[3px] block text-[9px] leading-[1.6] text-muted-foreground">
          {description}
        </span>
      </div>
      <Button
        tone="soft"
        onClick={() => openDemo(destination)}
        className="mt-[5px] min-h-[42px] px-3 py-2.5 text-[10px] md:mt-0 md:min-h-0"
      >
        <Icon name="arrow-up-right" className="size-[15px]" />
        {actionLabel}
      </Button>
    </div>
  )
}
