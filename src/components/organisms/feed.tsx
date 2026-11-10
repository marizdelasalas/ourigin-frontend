import { Icon } from "@/components/atoms/icon"
import { PostCard } from "@/components/organisms/posts/post-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFeedView } from "@/providers/feed-view-provider"
import { type FeedPreferences, useHomeFeed } from "@/providers/home-feed-provider"
import type { FeedFilter, FeedPost } from "@/types/workplace"

const tabs: { value: FeedFilter; label: string; caption: string }[] = [
  {
    value: "following",
    label: "Following",
    caption: "From people and pages you follow",
  },
  {
    value: "highlights",
    label: "Highlights",
    caption: "Announcements and recognition",
  },
  { value: "saved", label: "Saved", caption: "Posts saved in this preview" },
]

function searchableText(post: FeedPost) {
  const parts =
    post.kind === "draft"
      ? [post.byline, post.title, ...post.body]
      : [post.author.name, post.meta, post.title, ...post.body]

  switch (post.kind) {
    case "announcement":
      parts.push(post.linkedWork.title, post.linkedWork.description)
      break
    case "recognition":
      parts.push(post.footnote)
      break
    case "decision":
      parts.push(post.status, post.context, post.cta)
      break
    case "opportunity":
      parts.push(post.opportunity.title, post.opportunity.description)
      break
    case "profile":
      parts.push(post.profile.person.name, post.profile.description)
      break
  }

  return parts.join(" ").toLowerCase()
}

function isVisible(
  post: FeedPost,
  filter: FeedFilter,
  query: string,
  preferences: FeedPreferences,
  saved: boolean
) {
  if (post.kind === "recognition" && !preferences.showRecognition) return false
  if (post.kind === "profile" && !preferences.showProfiles) return false

  const inFilter =
    filter === "following" ||
    (filter === "highlights" && post.kind !== "draft" && post.highlight) ||
    (filter === "saved" && saved)

  return Boolean(inFilter) && searchableText(post).includes(query)
}

/** Filterable Home feed: tabs, posts and the end-of-feed note. */
export function Feed() {
  const { filter, setFilter, query } = useFeedView()
  const { posts, preferences, isSaved } = useHomeFeed()
  const normalizedQuery = query.trim().toLowerCase()
  const visiblePosts = posts.filter((post) =>
    isVisible(post, filter, normalizedQuery, preferences, isSaved(post.id))
  )
  const caption = tabs.find((tab) => tab.value === filter)?.caption

  return (
    <Tabs
      value={filter}
      onValueChange={(value) => setFilter(value as FeedFilter)}
      className="gap-0"
    >
      <div className="mb-[17px] flex items-center justify-between gap-[15px] px-[5px] md:mb-4">
        <TabsList
          variant="line"
          aria-label="Feed filter"
          className="gap-7 rounded-none p-0 group-data-horizontal/tabs:h-auto md:gap-[25px]"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-auto min-h-[33px] flex-none rounded-none border-0 px-0 pt-0 pb-[9px] text-(length:--text-body) font-normal text-muted-foreground after:bottom-0 after:h-0.5 after:bg-primary group-data-horizontal/tabs:after:bottom-0 data-active:font-bold data-active:text-primary md:min-h-0"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <p className="hidden text-caption text-muted-foreground md:block">
          {caption}
        </p>
      </div>

      <TabsContent value={filter} className="text-(length:--text-body)">
        {visiblePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {visiblePosts.length === 0 ? (
          <p className="p-[35px] text-center text-body text-muted-foreground">
            No posts match this view.
          </p>
        ) : null}
        <p className="flex items-center justify-center gap-[7px] pt-2 pb-2.5 text-caption text-muted-foreground sm:gap-3">
          <Icon name="circle-check" className="size-[17px] text-primary" />
          You&apos;re caught up with this illustrative feed.
        </p>
      </TabsContent>
    </Tabs>
  )
}
