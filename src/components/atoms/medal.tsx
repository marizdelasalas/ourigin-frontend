import { cn } from "@/lib/utils"

import { Icon } from "./icon"

/** Trophy medal with a ribbon, used on recognition posts. */
export function Medal({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative mt-[3px] grid size-[46px] shrink-0 place-items-center rounded-full border-4 border-white bg-primary shadow-medal md:mt-0 md:size-16 md:border-[6px]",
        "after:absolute after:top-[37px] after:left-1/2 after:h-5 after:w-[34px] after:-translate-x-1/2 after:bg-[#d2e0de] after:[clip-path:polygon(10%_0,90%_0,100%_100%,50%_65%,0_100%)] md:after:top-[53px] md:after:h-[25px] md:after:w-12",
        className
      )}
    >
      <Icon name="trophy" className="relative z-1 size-[25px] text-white md:size-[33px]" />
    </div>
  )
}
