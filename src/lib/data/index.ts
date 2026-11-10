import type { FeedPost, WorkplaceContext } from "@/types/workplace"

import { homeFeed } from "./home-feed"
import { workplaceContext } from "./workplace-context"

/*
 * Data access layer. Pages read through these functions so the illustrative
 * fixtures can be swapped for real API calls without touching the UI.
 */

export async function getHomeFeed(): Promise<FeedPost[]> {
  return homeFeed
}

export async function getWorkplaceContext(): Promise<WorkplaceContext> {
  return workplaceContext
}
