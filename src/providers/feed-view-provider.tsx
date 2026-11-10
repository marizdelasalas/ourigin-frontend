import { createContext, use, useCallback, useMemo, useState } from "react"

import type { FeedFilter } from "@/types/workplace"

type FeedViewContextValue = {
  query: string
  setQuery: (query: string) => void
  filter: FeedFilter
  setFilter: (filter: FeedFilter) => void
  /** Back to the default view: no search, "Following" tab. */
  reset: () => void
}

const FeedViewContext = createContext<FeedViewContextValue | null>(null)

/**
 * What the Home feed is showing. Lives in the workplace layout because the
 * top bar search and the sidebar's Home link both control it.
 */
export function FeedViewProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FeedFilter>("following")

  const reset = useCallback(() => {
    setQuery("")
    setFilter("following")
  }, [])

  const value = useMemo(
    () => ({ query, setQuery, filter, setFilter, reset }),
    [query, filter, reset]
  )

  return <FeedViewContext value={value}>{children}</FeedViewContext>
}

export function useFeedView() {
  const context = use(FeedViewContext)
  if (!context) {
    throw new Error("useFeedView must be used inside <FeedViewProvider>.")
  }
  return context
}
