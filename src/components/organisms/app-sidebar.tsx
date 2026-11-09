"use client"

import { Fragment, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Icon } from "@/components/atoms/icon"
import { BrandSymbol, Wordmark } from "@/components/atoms/logo"
import { NavLink } from "@/components/molecules/nav-link"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { navigation } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"
import { useFeedView } from "@/providers/feed-view-provider"

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

/**
 * Workplace navigation. A labelled, collapsible sidebar from `md` up and a
 * bottom tab bar with the four primary destinations on phones.
 */
export function AppSidebar() {
  const pathname = usePathname()
  const { reset } = useFeedView()
  const [collapsed, setCollapsed] = useState(false)

  function handleHomeClick(event: React.MouseEvent<HTMLAnchorElement>) {
    reset()
    if (pathname === "/") {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const toggleLabel = collapsed ? "Expand menu" : "Collapse menu"
  const toggle = (
    <button
      type="button"
      aria-controls="workplace-navigation"
      aria-expanded={!collapsed}
      onClick={() => setCollapsed((value) => !value)}
      className={cn(
        "mb-[21px] hidden min-h-[42px] w-full items-center gap-3 rounded-[11px] border border-sidebar-border px-3.5 py-[11px] text-[10px] text-primary hover:bg-accent md:flex",
        collapsed && "justify-center px-0"
      )}
    >
      <Icon
        name={collapsed ? "panel-left-open" : "panel-left-close"}
        className="size-[19px]"
      />
      <span className={cn(collapsed && "sr-only")}>{toggleLabel}</span>
    </button>
  )

  return (
    <aside
      className={cn(
        "fixed inset-x-0 bottom-0 z-20 h-[calc(65px+env(safe-area-inset-bottom))] rounded-t-[20px] border-t border-[#e3ece8] bg-white/96 px-3 pt-1 pb-[calc(4px+env(safe-area-inset-bottom))] shadow-dock",
        "md:relative md:inset-auto md:z-3 md:h-auto md:shrink-0 md:rounded-none md:border-t-0 md:bg-sidebar md:py-[25px] md:shadow-none",
        collapsed ? "md:w-[78px] md:px-2.5" : "md:w-[185px] md:px-3 lg:w-[210px] lg:px-4"
      )}
    >
      <Link
        href="/"
        aria-label="Ourigin home"
        onClick={handleHomeClick}
        className={cn(
          "mb-[22px] hidden h-[42px] items-center gap-2.5 px-[5px] md:flex",
          collapsed && "justify-center px-0"
        )}
      >
        <BrandSymbol eager className={collapsed ? "h-[42px] w-[38px]" : undefined} />
        <Wordmark
          className={cn(
            "text-[23px] font-[750] tracking-[-1.5px] lg:text-[27px]",
            collapsed && "hidden"
          )}
        />
      </Link>

      {collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>{toggle}</TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            {toggleLabel}
          </TooltipContent>
        </Tooltip>
      ) : (
        toggle
      )}

      <nav
        id="workplace-navigation"
        aria-label="Main navigation"
        className="h-full md:h-auto"
      >
        {navigation.map((group, index) => {
          const labelId = group.label ? `nav-group-${index}` : undefined
          return (
            <Fragment key={group.label ?? "primary"}>
              {group.label ? (
                <p
                  id={labelId}
                  className={cn(
                    "mx-3.5 mt-6 mb-3.5 hidden text-[8px] font-bold tracking-[1px] text-muted-foreground uppercase md:block",
                    collapsed && "md:hidden"
                  )}
                >
                  {group.label}
                </p>
              ) : null}
              <ul
                aria-labelledby={labelId}
                className={
                  index === 0
                    ? "flex h-full items-center justify-around md:block md:h-auto"
                    : "hidden md:block"
                }
              >
                {group.items.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      item={item}
                      active={isActive(pathname, item.href)}
                      collapsed={collapsed}
                      onClick={item.href === "/" ? handleHomeClick : undefined}
                    />
                  </li>
                ))}
              </ul>
            </Fragment>
          )
        })}
      </nav>
    </aside>
  )
}
