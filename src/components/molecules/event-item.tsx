"use client"

import { useDemoDialog } from "@/providers/demo-dialog-provider"
import type { CalendarEvent } from "@/types/workplace"

/** A time-boxed entry in the "Today" panel. */
export function EventItem({ event }: { event: CalendarEvent }) {
  const { openDemo } = useDemoDialog()

  return (
    <button
      type="button"
      onClick={() => openDemo(event.title)}
      className="mt-[18px] mb-2.5 flex w-full items-start gap-[15px] text-left md:mt-[15px] md:mb-[7px] md:gap-2.5"
    >
      <time
        dateTime={event.time}
        className="w-[43px] text-[14px] font-bold text-primary md:w-[38px] md:text-[12px]"
      >
        {event.time}
      </time>
      <span className="border-l-2 border-primary pl-[9px]">
        {/* Inline, so the line box keeps the 12px base line height. */}
        <span className="text-[12px] font-[650] md:text-[10px]">
          {event.title}
        </span>
        <span className="mt-[3px] block text-[10px] leading-[1.6] text-muted-foreground md:text-[9px]">
          {event.description}
        </span>
      </span>
    </button>
  )
}
