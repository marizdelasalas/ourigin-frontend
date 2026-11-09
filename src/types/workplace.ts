import type { StaticImageData } from "next/image"

import type { IconName } from "@/components/atoms/icon"

export type Person = {
  id: string
  name: string
  initials: string
  role?: string
  avatar?: StaticImageData | string
}

export type NavItem = {
  href: string
  label: string
  icon: IconName
  count?: number
  description: string
}

export type NavGroup = {
  label?: string
  items: NavItem[]
}

/* ------------------------------------------------------------------ */
/* Feed                                                                */
/* ------------------------------------------------------------------ */

export type FeedFilter = "following" | "highlights" | "saved"

type PostBase = {
  id: string
  author: Person
  meta: string
  title: string
  body: string[]
  menuLabel: string
  highlight?: boolean
}

export type AnnouncementPost = PostBase & {
  kind: "announcement"
  linkedWork: {
    title: string
    description: string
    image: StaticImageData
  }
  reactions: number
  comments: number
}

export type RecognitionPost = PostBase & {
  kind: "recognition"
  footnote: string
  reactions: number
  comments: number
}

export type DecisionPost = PostBase & {
  kind: "decision"
  status: string
  context: string
  cta: string
}

export type OpportunityPost = PostBase & {
  kind: "opportunity"
  opportunity: {
    title: string
    description: string
    cta: string
    detail: string
  }
}

export type ProfilePost = PostBase & {
  kind: "profile"
  profile: {
    person: Person
    description: string
    cta: string
  }
}

/** A post written in the composer during this session. */
export type DraftPost = {
  kind: "draft"
  id: string
  byline: string
  title: string
  body: string[]
}

export type FeedPost =
  | AnnouncementPost
  | RecognitionPost
  | DecisionPost
  | OpportunityPost
  | ProfilePost
  | DraftPost

export type ComposeKind = "Create post" | "Question" | "Recognition" | "Source"

/* ------------------------------------------------------------------ */
/* Workplace context rail                                              */
/* ------------------------------------------------------------------ */

export type ContextItem = {
  title: string
  description: string
  icon?: IconName
  person?: Person
  tag?: string
  /** Text shown instead of the arrow, e.g. "View profile". */
  actionLabel?: string
}

export type CalendarEvent = {
  time: string
  title: string
  description: string
}

export type WorkplaceContext = {
  attention: { openCount: number; items: ContextItem[] }
  today: CalendarEvent[]
  connectedWork: ContextItem[]
  meet: ContextItem[]
  following: ContextItem[]
  saved: { description: string; items: ContextItem[] }
}
