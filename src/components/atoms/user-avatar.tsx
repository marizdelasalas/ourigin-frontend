import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Person } from "@/types/workplace"

type UserAvatarProps = {
  person: Person
  className?: string
}

/**
 * Round portrait for a person, or their initials when no photo exists.
 * Photos use a plain <img> instead of AvatarImage, which shows the initials
 * until the photo has loaded. Avatars sit beside the person's name, so they
 * are decorative.
 */
export function UserAvatar({ person, className }: UserAvatarProps) {
  return (
    <Avatar
      className={cn(
        "size-[34px] overflow-hidden bg-[#f2f4f4] after:hidden",
        className
      )}
    >
      {person.avatar ? (
        <img
          src={person.avatar}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <AvatarFallback className="bg-chip text-(length:--text-caption) font-bold text-primary">
          {person.initials}
        </AvatarFallback>
      )}
    </Avatar>
  )
}
