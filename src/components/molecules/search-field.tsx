"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

import { Icon } from "@/components/atoms/icon"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"
import { useFeedView } from "@/providers/feed-view-provider"

/**
 * Workplace search. Filters the Home feed as you type and focuses with ⌘K.
 * Below `md` it collapses to an icon that expands over the top bar on focus.
 */
export function SearchField() {
  const { query, setQuery } = useFeedView()
  const inputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <label
      className={cn(
        "group/search relative flex max-w-[38px] flex-none items-center gap-0 rounded-control bg-white p-2.5 shadow-soft focus-within:ring-3 focus-within:ring-ring/50",
        "max-md:focus-within:absolute max-md:focus-within:right-[72px] max-md:focus-within:left-5 max-md:focus-within:z-4 max-md:focus-within:max-w-none max-md:focus-within:gap-2",
        "md:max-w-[260px] md:flex-1 md:gap-3 md:px-3.5 lg:max-w-[365px]"
      )}
    >
      <Icon name="search" className="text-muted-foreground" />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          // Results only exist on Home, so searching elsewhere goes there.
          if (event.key === "Enter" && pathname !== "/") router.push("/")
        }}
        placeholder="Search people, teams, goals and work"
        aria-label="Search people, teams, goals and work"
        aria-keyshortcuts="Meta+K Control+K"
        enterKeyHint="search"
        className={cn(
          "w-full min-w-0 border-0 bg-transparent p-0 text-[11px] text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none",
          "max-md:pointer-events-none max-md:absolute max-md:size-px max-md:opacity-0",
          "max-md:group-focus-within/search:pointer-events-auto max-md:group-focus-within/search:static max-md:group-focus-within/search:h-auto max-md:group-focus-within/search:w-full max-md:group-focus-within/search:opacity-100"
        )}
      />
      <Kbd
        aria-hidden="true"
        className="hidden h-auto min-w-0 bg-transparent px-0 text-[11px] font-normal whitespace-nowrap text-muted-foreground md:inline-flex"
      >
        ⌘ K
      </Kbd>
    </label>
  )
}
