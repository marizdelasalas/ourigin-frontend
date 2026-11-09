"use client"

import { Icon } from "@/components/atoms/icon"
import { UserAvatar } from "@/components/atoms/user-avatar"
import { useDemoDialog } from "@/providers/demo-dialog-provider"
import type { Person } from "@/types/workplace"

type PostBylineProps = {
  author: Person
  meta: string
  menuLabel: string
}

export function PostByline({ author, meta, menuLabel }: PostBylineProps) {
  const { openDemo } = useDemoDialog()

  return (
    <div className="mb-4 flex items-center gap-[9px] md:gap-2.5">
      <UserAvatar
        person={author}
        className={
          author.avatar
            ? "size-[30px] md:size-[34px]"
            : "size-8 *:data-[slot=avatar-fallback]:text-[9px] md:size-9 md:*:data-[slot=avatar-fallback]:text-[10px]"
        }
      />
      {/* The name stays inline so its line box keeps the 12px base line height. */}
      <div className="min-w-0">
        <span className="text-[10px] font-[650] md:text-[11px] 2xl:text-[12px]">
          {author.name}
        </span>
        <span className="mt-[3px] block text-[8px] leading-[1.6] text-muted-foreground md:text-[9px] md:leading-[1.45] 2xl:text-[10px]">
          {meta}
        </span>
      </div>
      <button
        type="button"
        aria-label={menuLabel}
        onClick={() => openDemo(menuLabel)}
        className="ml-auto self-start rounded-md p-0.5 text-muted-foreground"
      >
        <Icon name="ellipsis" className="size-[17px]" />
      </button>
    </div>
  )
}
