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
            : "size-8 *:data-[slot=avatar-fallback]:text-caption md:size-9"
        }
      />
      {/* The name stays inline so its line box keeps the base line height. */}
      <div className="min-w-0">
        <span className="text-body font-[650]">
          {author.name}
        </span>
        <span className="mt-[3px] block text-caption text-muted-foreground">
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
