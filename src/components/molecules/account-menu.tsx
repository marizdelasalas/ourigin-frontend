import { useRef } from "react"
import { ChevronDown, LogOut, Settings, SlidersHorizontal, User } from "lucide-react"

import { UserAvatar } from "@/components/atoms/user-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { viewer } from "@/lib/data/people"
import { useDemoDialog } from "@/providers/demo-dialog-provider"

const itemClassName =
  "gap-2.5 rounded-[9px] px-2.5 py-2 text-(length:--text-body) text-foreground [&_svg]:text-muted-foreground"

/**
 * The signed-in user at the right of the top bar, with the account menu.
 * Avatar only on phones. There is no authentication yet: every item except
 * My Profile opens the demo dialog, which says the action isn't part of the
 * preview.
 */
export function AccountMenu() {
  const { openDemo } = useDemoDialog()
  const triggerRef = useRef<HTMLButtonElement>(null)
  // Opened once the menu has closed and focus is back on the trigger, so the
  // dialog returns focus there when it closes.
  const pendingDemo = useRef<string | null>(null)
  // Return focus without a ring after mouse or touch use, as browsers do.
  const usedPointer = useRef(false)

  function openAfterClose(title: string) {
    pendingDemo.current = title
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          onPointerDown={() => (usedPointer.current = true)}
          onKeyDown={() => (usedPointer.current = false)}
          className="group/account flex items-center gap-[9px] rounded-full text-left md:rounded-[13px] md:py-1 md:pr-2 md:pl-1 md:hover:bg-accent md:data-[state=open]:bg-accent"
        >
          <UserAvatar person={viewer} className="size-[30px] ring-3 ring-white md:size-[34px]" />
          <span className="max-md:sr-only">
            <span className="block text-body font-bold whitespace-nowrap text-foreground">
              {viewer.name}
            </span>
            <span className="block text-caption whitespace-nowrap text-muted-foreground">
              {viewer.role}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="hidden size-[13px] shrink-0 text-muted-foreground transition-transform group-data-[state=open]/account:rotate-180 md:block"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={8}
        onPointerDown={() => (usedPointer.current = true)}
        onKeyDown={() => (usedPointer.current = false)}
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          triggerRef.current?.focus({ focusVisible: !usedPointer.current })
          const title = pendingDemo.current
          pendingDemo.current = null
          if (title) openDemo(title)
        }}
        className="w-[200px] rounded-[12px] p-1.5 shadow-[0_10px_30px_#172b3518] ring-border"
      >
        <DropdownMenuItem className={itemClassName} onSelect={() => openAfterClose(viewer.name)}>
          <User />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem className={itemClassName} onSelect={() => openAfterClose("Account Settings")}>
          <Settings />
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem className={itemClassName} onSelect={() => openAfterClose("Preferences")}>
          <SlidersHorizontal />
          Preferences
        </DropdownMenuItem>
        <DropdownMenuSeparator className="-mx-1.5 my-1.5" />
        <DropdownMenuItem className={itemClassName} onSelect={() => openAfterClose("Log out")}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
