import { useEffect } from "react"
import { Outlet, ScrollRestoration, useMatches } from "react-router"

import { AppToaster } from "@/components/organisms/app-toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

/** Per-route metadata, set with `handle` in `router.tsx`. */
export type RouteHandle = {
  /** Shown in the tab as "<title> · Ourigin". */
  title?: string
}

/** Keeps `document.title` in step with the deepest route that names one. */
function useRouteTitle() {
  const matches = useMatches()
  const title = matches
    .map((match) => (match.handle as RouteHandle | undefined)?.title)
    .findLast(Boolean)

  useEffect(() => {
    document.title = title ? `${title} · Ourigin` : "Ourigin"
  }, [title])
}

/** App-wide providers and the toaster, around every route. */
export function RootLayout() {
  useRouteTitle()

  return (
    <>
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
      <AppToaster />
      <ScrollRestoration />
    </>
  )
}
