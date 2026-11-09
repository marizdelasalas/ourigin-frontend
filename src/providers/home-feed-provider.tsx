"use client"

import { createContext, use, useCallback, useMemo, useRef, useState } from "react"
import { toast } from "sonner"

import { ComposeDialog } from "@/components/organisms/compose-dialog"
import { CustomizeFeedDialog } from "@/components/organisms/customize-feed-dialog"
import { viewer } from "@/lib/data/people"
import { useFeedView } from "@/providers/feed-view-provider"
import type { ComposeKind, DraftPost, FeedPost } from "@/types/workplace"

export type FeedPreferences = {
  showRecognition: boolean
  showProfiles: boolean
}

type ComposeState = { open: boolean; title: string; mode: "post" | "reply" }

type HomeFeedContextValue = {
  posts: FeedPost[]
  preferences: FeedPreferences
  isSaved: (id: string) => boolean
  isAppreciated: (id: string) => boolean
  toggleSave: (id: string) => void
  toggleAppreciate: (id: string) => void
  openCompose: (kind: ComposeKind) => void
  openReply: () => void
  openCustomize: () => void
}

const HomeFeedContext = createContext<HomeFeedContextValue | null>(null)

function toggleIn(set: Set<string>, id: string) {
  const next = new Set(set)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  return next
}

/**
 * Session-only state for the illustrative Home feed: saved and appreciated
 * posts, drafts written in the composer, and the "Customize feed" options.
 */
export function HomeFeedProvider({
  initialPosts,
  children,
}: {
  initialPosts: FeedPost[]
  children: React.ReactNode
}) {
  const { setFilter } = useFeedView()
  const [drafts, setDrafts] = useState<DraftPost[]>([])
  const [saved, setSaved] = useState<Set<string>>(() => new Set())
  const [appreciated, setAppreciated] = useState<Set<string>>(() => new Set())
  const [preferences, setPreferences] = useState<FeedPreferences>({
    showRecognition: true,
    showProfiles: true,
  })
  const [compose, setCompose] = useState<ComposeState>({
    open: false,
    title: "",
    mode: "post",
  })
  const [customizeOpen, setCustomizeOpen] = useState(false)
  const draftCount = useRef(0)

  const toggleSave = useCallback(
    (id: string) => {
      const willSave = !saved.has(id)
      setSaved(toggleIn(saved, id))
      toast(willSave ? "Saved to this preview" : "Removed from saved")
    },
    [saved]
  )

  const toggleAppreciate = useCallback(
    (id: string) => {
      const willAppreciate = !appreciated.has(id)
      setAppreciated(toggleIn(appreciated, id))
      toast(willAppreciate ? "Appreciation added" : "Appreciation removed")
    },
    [appreciated]
  )

  const openCompose = useCallback((kind: ComposeKind) => {
    setCompose({ open: true, title: kind, mode: "post" })
  }, [])

  const openReply = useCallback(() => {
    setCompose({ open: true, title: "Join the conversation", mode: "reply" })
  }, [])

  const openCustomize = useCallback(() => setCustomizeOpen(true), [])

  function handleComposeSubmit(text: string) {
    if (compose.mode === "post") {
      draftCount.current += 1
      setDrafts((current) => [
        {
          kind: "draft",
          id: `draft-${draftCount.current}`,
          byline: `${viewer.name} · Just now · Preview`,
          title: compose.title,
          body: [text],
        },
        ...current,
      ])
      setFilter("following")
    }
    setCompose((current) => ({ ...current, open: false }))
    toast(
      compose.mode === "post"
        ? "Post added to this preview"
        : "Reply added to this preview"
    )
  }

  const posts = useMemo(() => [...drafts, ...initialPosts], [drafts, initialPosts])

  const value = useMemo(
    () => ({
      posts,
      preferences,
      isSaved: (id: string) => saved.has(id),
      isAppreciated: (id: string) => appreciated.has(id),
      toggleSave,
      toggleAppreciate,
      openCompose,
      openReply,
      openCustomize,
    }),
    [
      posts,
      preferences,
      saved,
      appreciated,
      toggleSave,
      toggleAppreciate,
      openCompose,
      openReply,
      openCustomize,
    ]
  )

  return (
    <HomeFeedContext value={value}>
      {children}
      <ComposeDialog
        open={compose.open}
        onOpenChange={(open) => setCompose((current) => ({ ...current, open }))}
        title={compose.title}
        mode={compose.mode}
        onSubmit={handleComposeSubmit}
      />
      <CustomizeFeedDialog
        open={customizeOpen}
        onOpenChange={setCustomizeOpen}
        preferences={preferences}
        onPreferencesChange={setPreferences}
      />
    </HomeFeedContext>
  )
}

export function useHomeFeed() {
  const context = use(HomeFeedContext)
  if (!context) {
    throw new Error("useHomeFeed must be used inside <HomeFeedProvider>.")
  }
  return context
}
