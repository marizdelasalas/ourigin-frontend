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
        className="w-[43px] text-body font-bold text-primary"
      >
        {event.time}
      </time>
      <span className="border-l-2 border-primary pl-[9px]">
        {/* Inline, so the line box keeps the base line height. */}
        <span className="text-body font-[650]">
          {event.title}
        </span>
        <span className="mt-[3px] block text-detail text-muted-foreground">
          {event.description}
        </span>
      </span>
    </button>
  )
}
