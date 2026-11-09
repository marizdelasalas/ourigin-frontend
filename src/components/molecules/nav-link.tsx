"use client"

import Link from "next/link"

import { Icon } from "@/components/atoms/icon"
import { Pill } from "@/components/atoms/pill"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types/workplace"

type NavLinkProps = {
  item: NavItem
  active: boolean
  /** Icon-only sidebar on tablet and desktop. */
  collapsed: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

/**
 * One destination in the workplace navigation. Renders as a stacked tab on
 * the mobile bottom bar and as a labelled row in the sidebar from `md` up.
 */
export function NavLink({ item, active, collapsed, onClick }: NavLinkProps) {
  const link = (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "group/nav relative flex min-h-12 w-[58px] flex-col items-center justify-center gap-[5px] rounded-xl px-2 py-[7px] text-foreground hover:bg-accent",
        "md:mb-2 md:min-h-[46px] md:w-full md:flex-row md:justify-start md:gap-[13px] md:rounded-[13px] md:px-3.5 md:py-[13px]",
        collapsed && "md:mb-[13px] md:justify-center md:px-2.5 md:py-[14px]",
        active && [
          "bg-sidebar-accent font-bold text-sidebar-accent-foreground hover:bg-sidebar-accent",
          "before:absolute before:inset-x-[19px] before:bottom-px before:h-[3px] before:rounded-[4px] before:bg-brand-turquoise",
          "md:before:top-[13px] md:before:right-auto md:before:bottom-[13px] md:before:h-auto md:before:w-1 md:before:rounded-l-none md:before:rounded-r-[5px]",
          // The marker sits flush with the sidebar's left edge.
          collapsed ? "md:before:-left-2.5" : "md:before:-left-3 lg:before:-left-4",
        ]
      )}
    >
      <Icon
        name={item.icon}
        className={cn(
          "size-[22px] text-nav-icon group-hover/nav:text-primary",
          active && "text-primary"
        )}
      />
      <span
        className={cn(
          "text-[8px] leading-none md:text-[11px] md:leading-[1.45] lg:text-[12px]",
          collapsed && "md:sr-only"
        )}
      >
        {item.label}
      </span>
      {item.count ? (
        <Pill
          tone="count"
          size="count"
          className={cn("ml-auto hidden md:grid", collapsed && "md:hidden")}
        >
          {item.count}
          <span className="sr-only"> unread</span>
        </Pill>
      ) : null}
    </Link>
  )

  if (!collapsed) return link

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {item.label}
      </TooltipContent>
    </Tooltip>
  )
}
