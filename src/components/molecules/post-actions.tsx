"use client"

import { Icon } from "@/components/atoms/icon"

type PostActionsProps = {
  reactions: number
  comments: number
  appreciated: boolean
  saved: boolean
  onAppreciate: () => void
  onReply: () => void
  onSave: () => void
}

const textAction =
  "min-h-8 px-[7px] py-2 font-semibold text-primary md:min-h-0 md:px-[5px] md:py-[3px] lg:px-2.5"

/** Reaction summary and the Appreciate / Reply / Save actions of a post. */
export function PostActions({
  reactions,
  comments,
  appreciated,
  saved,
  onAppreciate,
  onReply,
  onSave,
}: PostActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-[9px] md:flex-nowrap lg:gap-[23px]">
      <span className="flex items-center gap-[9px] text-muted-foreground">
        <Icon name="heart" className="size-[13px] text-primary" />
        {reactions + (appreciated ? 1 : 0)} reactions
      </span>
      <button
        type="button"
        onClick={onReply}
        className="flex min-h-8 items-center gap-[9px] text-muted-foreground md:min-h-0"
      >
        <Icon name="message-circle" className="size-[13px] text-primary" />
        {comments} comments
      </button>
      <div className="hidden flex-1 md:block" />
      <button
        type="button"
        aria-pressed={appreciated}
        onClick={onAppreciate}
        className={textAction}
      >
        {appreciated ? "Appreciated" : "Appreciate"}
      </button>
      <button type="button" onClick={onReply} className={textAction}>
        Reply
      </button>
      <button
        type="button"
        aria-pressed={saved}
        onClick={onSave}
        className={textAction}
      >
        {saved ? "Saved" : "Save"}
      </button>
    </div>
  )
}
