import { Fragment, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link, useLocation } from "react-router"

import { BrandSymbol, Wordmark } from "@/components/atoms/logo"
import { AskOuriginCard } from "@/components/molecules/ask-ourigin-card"
import { FollowingItem } from "@/components/molecules/following-item"
import { NavLink } from "@/components/molecules/nav-link"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { followingNavigation, navigation } from "@/lib/data/navigation"
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
  const { pathname } = useLocation()
  const { reset } = useFeedView()
  const [collapsed, setCollapsed] = useState(false)

  function handleHomeClick(event: React.MouseEvent<HTMLAnchorElement>) {
    reset()
    if (pathname === "/") {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const toggleLabel = collapsed ? "Expand sidebar" : "Collapse sidebar"
  const ToggleIcon = collapsed ? ChevronRight : ChevronLeft

  return (
    <aside
      className={cn(
        "fixed inset-x-0 bottom-0 z-20 h-[calc(65px+env(safe-area-inset-bottom))] rounded-t-[20px] border-t border-[#e3ece8] bg-white/96 px-3 pt-1 pb-[calc(4px+env(safe-area-inset-bottom))] shadow-dock",
        "md:relative md:inset-auto md:z-3 md:h-auto md:shrink-0 md:rounded-none md:border-t-0 md:bg-sidebar md:p-0 md:shadow-none",
        collapsed ? "md:w-[78px]" : "md:w-[185px] lg:w-[210px]"
      )}
    >
      {/* Stays in view and scrolls on its own when taller than the window. */}
      <div
        className={cn(
          "h-full md:sticky md:top-0 md:h-auto md:max-h-dvh md:overflow-y-auto md:py-[25px]",
          collapsed ? "md:px-2.5" : "md:px-3 lg:px-4"
        )}
      >
        {/* Logo row. Collapsed, the toggle sits under the symbol. */}
        <div
          className={cn(
            "mb-4 hidden items-center justify-between gap-2 md:flex",
            collapsed && "flex-col justify-start gap-3"
          )}
        >
          <Link
            to="/"
            aria-label="Ourigin home"
            onClick={handleHomeClick}
            className={cn(
              "flex h-[42px] min-w-0 items-center gap-2.5 px-[5px]",
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

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={toggleLabel}
                aria-controls="workplace-navigation"
                aria-expanded={!collapsed}
                onClick={() => setCollapsed((value) => !value)}
                className="grid size-8 shrink-0 place-items-center rounded-[9px] text-muted-foreground hover:bg-accent hover:text-primary"
              >
                <ToggleIcon aria-hidden="true" strokeWidth={1.75} className="size-[18px]" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              {toggleLabel}
            </TooltipContent>
          </Tooltip>
        </div>

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
                      "mx-3.5 mt-6 mb-3.5 hidden text-caption font-bold tracking-[1px] text-muted-foreground uppercase md:block",
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

          <div className={cn("mt-6 hidden border-t border-border md:block", collapsed ? "mx-1" : "mx-3.5")}>
            <p
              id="nav-group-following"
              className={cn(
                "mt-6 mb-3 text-caption font-bold tracking-[1px] text-muted-foreground uppercase",
                collapsed && "sr-only"
              )}
            >
              Following
            </p>
          </div>
          <ul
            aria-labelledby="nav-group-following"
            className={cn("hidden md:block", collapsed && "md:mt-3")}
          >
            {followingNavigation.map((item) => (
              <li key={item.label}>
                <FollowingItem item={item} collapsed={collapsed} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 hidden md:block">
          <AskOuriginCard collapsed={collapsed} />
        </div>
      </div>
    </aside>
  )
}
