import Image from "next/image"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Person } from "@/types/workplace"

type UserAvatarProps = {
  person: Person
  className?: string
}

/**
 * Round portrait for a person, or their initials when no photo exists.
 * Photos use next/image instead of AvatarImage so they render on the server
 * without flashing the fallback first. Avatars sit beside the person's name,
 * so they are decorative.
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
        <Image
          src={person.avatar}
          alt=""
          fill
          sizes="40px"
          className="object-cover"
        />
      ) : (
        <AvatarFallback className="bg-chip text-[10px] font-bold text-primary">
          {person.initials}
        </AvatarFallback>
      )}
    </Avatar>
  )
}
