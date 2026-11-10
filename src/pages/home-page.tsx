import { use } from "react"

import { HomeTemplate } from "@/components/templates/home-template"
import { getHomeFeed, getWorkplaceContext } from "@/lib/data"
import { getNavItem } from "@/lib/data/navigation"

// Requested once, when the route module loads; read with use() below.
const homeData = Promise.all([getHomeFeed(), getWorkplaceContext()])

export function HomePage() {
  const [posts, context] = use(homeData)

  return (
    <HomeTemplate section={getNavItem("/")} posts={posts} context={context} />
  )
}
