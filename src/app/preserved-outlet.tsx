import { Activity, Suspense, useState } from "react"
import { useLocation, useOutlet } from "react-router"

/** Hidden routes kept alive beside the visible one. */
const MAX_HIDDEN_ROUTES = 3

type VisitedRoute = { pathname: string; element: React.ReactNode }

/**
 * Renders the matched child route like `<Outlet />`, but keeps the three most
 * recently visited routes mounted inside a hidden `<Activity>` instead of
 * unmounting them. Their state (Home's drafts, saved posts and preferences)
 * survives navigation; their effects are cleaned up while hidden and run again
 * when they are shown.
 */
export function PreservedOutlet() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const [visited, setVisited] = useState<VisitedRoute[]>([])

  // Most recent first, so the visible route always comes first in the DOM.
  if (visited[0]?.pathname !== pathname) {
    setVisited([
      { pathname, element: outlet },
      ...visited
        .filter((route) => route.pathname !== pathname)
        .slice(0, MAX_HIDDEN_ROUTES),
    ])
  }

  return visited.map((route) => {
    const active = route.pathname === pathname
    return (
      <Activity key={route.pathname} mode={active ? "visible" : "hidden"}>
        <Suspense fallback={null}>{active ? outlet : route.element}</Suspense>
      </Activity>
    )
  })
}
