import type { Metadata } from "next"

import { HomeTemplate } from "@/components/templates/home-template"
import { getHomeFeed, getWorkplaceContext } from "@/lib/data"

export const metadata: Metadata = {
  title: "Home",
}

export default async function HomePage() {
  const [posts, context] = await Promise.all([
    getHomeFeed(),
    getWorkplaceContext(),
  ])

  return <HomeTemplate posts={posts} context={context} />
}
