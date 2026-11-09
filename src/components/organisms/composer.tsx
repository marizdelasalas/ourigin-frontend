"use client"

import { Button } from "@/components/atoms/button"
import { Icon, type IconName } from "@/components/atoms/icon"
import { Surface } from "@/components/atoms/surface"
import { UserAvatar } from "@/components/atoms/user-avatar"
import { viewer } from "@/lib/data/people"
import { cn } from "@/lib/utils"
import { useHomeFeed } from "@/providers/home-feed-provider"
import type { ComposeKind } from "@/types/workplace"

const tools: { kind: ComposeKind; label: string; icon: IconName }[] = [
  { kind: "Question", label: "Question", icon: "message-circle" },
  { kind: "Recognition", label: "Recognition", icon: "award" },
  { kind: "Source", label: "Attach a source", icon: "paperclip" },
]

/** Entry point for sharing progress, questions and recognition. */
export function Composer() {
  const { openCompose } = useHomeFeed()

  return (
    <Surface className="mb-[18px] flex gap-2.5 rounded-[18px] p-[13px] md:mb-[19px] md:gap-3 md:px-[18px] md:py-[15px]">
      <UserAvatar person={viewer} className="mt-[3px] size-[29px] md:mt-1 md:size-[34px]" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => openCompose("Create post")}
            className="min-h-[38px] flex-1 rounded-control bg-secondary px-3 py-2.5 text-left text-[10px] leading-[1.5] text-muted-foreground md:min-h-0 md:px-[15px] md:py-3 md:text-[11px] md:leading-[1.45]"
          >
            Share progress, ask a question, or say thanks...
          </button>
          <Button
            onClick={() => openCompose("Create post")}
            className="min-w-[34px] p-2.5 text-[11px] md:min-w-[35px] md:p-3 lg:min-w-[120px] lg:px-[15px]"
          >
            <Icon name="pencil" className="size-4" />
            <span className="sr-only lg:not-sr-only">Create post</span>
          </Button>
        </div>
        <div className="mt-[9px] flex gap-5 md:mt-2.5 md:gap-[15px] lg:gap-[30px]">
          {tools.map((tool) => (
            <button
              key={tool.kind}
              type="button"
              onClick={() => openCompose(tool.kind)}
              className={cn(
                "flex min-h-[25px] items-center gap-[5px] text-[8px] font-semibold text-primary md:min-h-0 md:gap-1.5 md:text-[9px]",
                tool.kind === "Source" && "max-md:hidden"
              )}
            >
              <Icon name={tool.icon} className="size-[13px]" />
              {tool.label}
            </button>
          ))}
        </div>
      </div>
    </Surface>
  )
}
