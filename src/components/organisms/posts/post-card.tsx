import { Heading } from "@/components/atoms/heading"
import { Icon } from "@/components/atoms/icon"
import { Medal } from "@/components/atoms/medal"
import { Pill } from "@/components/atoms/pill"
import { Surface } from "@/components/atoms/surface"
import { Button } from "@/components/atoms/button"
import { Callout } from "@/components/molecules/callout"
import { LinkedWork } from "@/components/molecules/linked-work"
import { PostActions } from "@/components/molecules/post-actions"
import { PostByline } from "@/components/molecules/post-byline"
import { PostText } from "@/components/molecules/post-text"
import { cn } from "@/lib/utils"
import { useHomeFeed } from "@/providers/home-feed-provider"
import type {
  AnnouncementPost,
  DecisionPost,
  DraftPost,
  FeedPost,
  OpportunityPost,
  ProfilePost,
  RecognitionPost,
} from "@/types/workplace"

function PostShell({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <Surface asChild>
      <article className={cn("mb-[18px] p-5 md:mb-6 md:p-[25px]", className)}>
        {children}
      </article>
    </Surface>
  )
}

function AnnouncementCard({ post }: { post: AnnouncementPost }) {
  const { isSaved, isAppreciated, toggleSave, toggleAppreciate, openReply } =
    useHomeFeed()

  return (
    <PostShell className="overflow-hidden p-[21px] md:p-[22px] lg:px-7 lg:pt-[27px] lg:pb-5">
      <PostByline author={post.author} meta={post.meta} menuLabel={post.menuLabel} />
      <Heading level="feature" className="mt-5 mb-[13px]">
        {post.title}
      </Heading>
      <PostText lines={post.body} />
      <LinkedWork {...post.linkedWork} />
      <PostActions
        reactions={post.reactions}
        comments={post.comments}
        appreciated={isAppreciated(post.id)}
        saved={isSaved(post.id)}
        onAppreciate={() => toggleAppreciate(post.id)}
        onReply={openReply}
        onSave={() => toggleSave(post.id)}
      />
    </PostShell>
  )
}

function RecognitionCard({ post }: { post: RecognitionPost }) {
  const { isSaved, isAppreciated, toggleSave, toggleAppreciate, openReply } =
    useHomeFeed()
  const appreciated = isAppreciated(post.id)
  const saved = isSaved(post.id)

  return (
    <PostShell className="bg-[linear-gradient(115deg,#e6f3ef_0%,#f8fcfa_90%)] md:px-[26px] md:pt-[23px] md:pb-[18px]">
      <PostByline author={post.author} meta={post.meta} menuLabel={post.menuLabel} />
      <div className="mt-[17px] mb-[22px] flex items-start gap-[17px] md:mx-[3px] md:my-5 md:items-center md:gap-[18px] lg:gap-[25px]">
        <Medal />
        <div>
          <Heading level="recognition" className="mb-2.5 md:mt-2">
            {post.title}
          </Heading>
          <PostText
            lines={post.body}
            className="text-foreground"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2.5 md:gap-3 lg:flex-nowrap lg:gap-0">
        <p className="text-caption text-muted-foreground">
          {post.footnote}
        </p>
        <div className="flex items-center gap-[25px]">
          <button
            type="button"
            aria-label="Appreciate recognition"
            aria-pressed={appreciated}
            onClick={() => toggleAppreciate(post.id)}
            className="flex min-h-8 items-center gap-[9px] text-caption whitespace-nowrap text-muted-foreground md:min-h-0"
          >
            <Icon name="heart" className="size-[15px] text-primary" />
            <span>{post.reactions + (appreciated ? 1 : 0)}</span>
          </button>
          <button
            type="button"
            onClick={openReply}
            className="flex min-h-8 items-center gap-[9px] text-caption whitespace-nowrap text-muted-foreground md:min-h-0"
          >
            <Icon name="message-circle" className="size-[15px] text-primary" />
            {post.comments} comments
          </button>
          <button
            type="button"
            aria-label="Save recognition"
            aria-pressed={saved}
            onClick={() => toggleSave(post.id)}
            className="flex min-h-8 items-center text-muted-foreground md:min-h-0"
          >
            <Icon name="bookmark" className="size-[15px] text-primary" />
          </button>
        </div>
      </div>
    </PostShell>
  )
}

function DecisionCard({ post }: { post: DecisionPost }) {
  const { openReply } = useHomeFeed()

  return (
    <PostShell>
      <PostByline author={post.author} meta={post.meta} menuLabel={post.menuLabel} />
      <Heading className="mt-2 mb-[11px]">{post.title}</Heading>
      <PostText lines={post.body} />
      <div className="mt-5 flex flex-wrap items-center gap-3 xl:flex-nowrap">
        <Pill tone="decision">{post.status}</Pill>
        <p className="text-caption text-muted-foreground">
          {post.context}
        </p>
        <Button
          onClick={openReply}
          className="mt-[5px] ml-auto min-h-[42px] w-full px-3.5 py-[11px] sm:mt-0 md:min-h-0 md:w-auto"
        >
          <Icon name="message-circle" className="size-4" />
          {post.cta}
        </Button>
      </div>
    </PostShell>
  )
}

function OpportunityCard({ post }: { post: OpportunityPost }) {
  return (
    <PostShell>
      <PostByline author={post.author} meta={post.meta} menuLabel={post.menuLabel} />
      <Heading className="mt-2 mb-[11px]">{post.title}</Heading>
      <PostText lines={post.body} />
      <Callout
        icon="book-open"
        title={post.opportunity.title}
        description={post.opportunity.description}
        actionLabel={post.opportunity.cta}
        destination={post.opportunity.detail}
      />
    </PostShell>
  )
}

function ProfileCard({ post }: { post: ProfilePost }) {
  return (
    <PostShell>
      <PostByline author={post.author} meta={post.meta} menuLabel={post.menuLabel} />
      <Heading className="mt-2 mb-[11px]">{post.title}</Heading>
      <PostText lines={post.body} />
      <Callout
        person={post.profile.person}
        title={post.profile.person.name}
        description={post.profile.description}
        actionLabel={post.profile.cta}
        destination={post.profile.person.name}
      />
    </PostShell>
  )
}

function DraftCard({ post }: { post: DraftPost }) {
  return (
    <PostShell>
      <p className="font-bold">{post.byline}</p>
      <Heading className="mt-2 mb-[11px]">{post.title}</Heading>
      <PostText lines={post.body} />
    </PostShell>
  )
}

export function PostCard({ post }: { post: FeedPost }) {
  switch (post.kind) {
    case "announcement":
      return <AnnouncementCard post={post} />
    case "recognition":
      return <RecognitionCard post={post} />
    case "decision":
      return <DecisionCard post={post} />
    case "opportunity":
      return <OpportunityCard post={post} />
    case "profile":
      return <ProfileCard post={post} />
    case "draft":
      return <DraftCard post={post} />
  }
}
