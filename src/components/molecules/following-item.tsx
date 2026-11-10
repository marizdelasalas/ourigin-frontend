import { Icon } from "@/components/atoms/icon"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useDemoDialog } from "@/providers/demo-dialog-provider"
import type { FollowingItem as FollowingItemData } from "@/types/workplace"

type FollowingItemProps = {
  item: FollowingItemData
  /** Icon-only sidebar on tablet and desktop. */
  collapsed: boolean
}

/**
 * A followed resource in the sidebar. Quieter than the main navigation:
 * smaller icon, muted label. Opens its demo dialog until it has a page.
 */
export function FollowingItem({ item, collapsed }: FollowingItemProps) {
  const { openDemo } = useDemoDialog()

  const button = (
    <button
      type="button"
      onClick={() => openDemo(item.demo)}
      className={cn(
        "group/following flex min-h-10 w-full items-center gap-[13px] rounded-[13px] px-3.5 py-2 text-left text-body text-muted-foreground hover:bg-accent hover:text-foreground",
        collapsed && "justify-center px-2.5"
      )}
    >
      <Icon
        name={item.icon}
        className="size-[18px] shrink-0 text-nav-icon group-hover/following:text-primary"
      />
      <span className={cn("min-w-0", collapsed && "sr-only")}>{item.label}</span>
    </button>
  )

  if (!collapsed) return button

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {item.label}
      </TooltipContent>
    </Tooltip>
  )
}
