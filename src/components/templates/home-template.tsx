import { PageHeading } from "@/components/molecules/page-heading"
import { Composer } from "@/components/organisms/composer"
import { ContextRail } from "@/components/organisms/context-rail"
import { Feed } from "@/components/organisms/feed"
import { CustomizeFeedButton } from "@/components/organisms/feed-controls"
import { HomeFeedProvider } from "@/providers/home-feed-provider"
import type { FeedPost, WorkplaceContext } from "@/types/workplace"

type HomeTemplateProps = {
  posts: FeedPost[]
  context: WorkplaceContext
}

/**
 * Home: feed with composer, plus the workplace context rail. The feed comes
 * first in reading order; from `md` up the rail is placed in the left column.
 */
export function HomeTemplate({ posts, context }: HomeTemplateProps) {
  return (
    <HomeFeedProvider initialPosts={posts}>
      <PageHeading
        title="Home"
        description="Your people, shared work and the conversations that move it forward."
        action={<CustomizeFeedButton />}
      />
      <div className="flex flex-col md:grid md:grid-cols-[220px_minmax(0,1fr)] md:items-start md:gap-4 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-6 2xl:grid-cols-[310px_minmax(0,1fr)] 2xl:gap-7">
        <section aria-label="Feed" className="min-w-0 md:col-start-2 md:row-start-1">
          <Composer />
          <Feed />
        </section>
        <ContextRail
          context={context}
          className="mt-4 md:col-start-1 md:row-start-1 md:mt-0"
        />
      </div>
    </HomeFeedProvider>
  )
}
