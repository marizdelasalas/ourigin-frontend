"use client"

import Link from "next/link"

import { Icon } from "@/components/atoms/icon"
import { BrandSymbol, Wordmark } from "@/components/atoms/logo"
import { UserAvatar } from "@/components/atoms/user-avatar"
import { SearchField } from "@/components/molecules/search-field"
import { viewer } from "@/lib/data/people"
import { useDemoDialog } from "@/providers/demo-dialog-provider"

export function TopBar() {
  const { openDemo } = useDemoDialog()

  return (
    <header className="relative flex h-[77px] items-center justify-between gap-[15px] bg-background px-5 py-[18px] md:h-[92px] md:gap-[25px] md:bg-transparent md:px-[22px] md:py-5 lg:px-[30px]">
      <Link
        href="/"
        aria-label="Ourigin home"
        className="mr-auto flex items-center gap-2"
      >
        <BrandSymbol eager className="h-[31px] w-7 md:hidden" />
        <Wordmark className="text-[24px] font-bold tracking-[-1.2px] md:text-[21px] lg:text-[24px]" />
      </Link>

      <SearchField />

      <div className="flex items-center md:gap-[15px] lg:gap-[21px]">
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => openDemo("Notifications")}
          className="relative hidden text-primary md:block"
        >
          <Icon name="bell" className="size-5" />
          <span className="absolute -top-[3px] -right-px size-[5px] rounded-full bg-primary" />
        </button>
        <button
          type="button"
          aria-label="Help"
          onClick={() => openDemo("Help")}
          className="hidden text-primary md:block"
        >
          <Icon name="circle-help" className="size-5" />
        </button>
        <button
          type="button"
          aria-label={`${viewer.name} profile`}
          onClick={() => openDemo(viewer.name)}
          className="rounded-full"
        >
          <UserAvatar person={viewer} className="size-[30px] ring-3 ring-white md:size-[34px]" />
        </button>
      </div>
    </header>
  )
}
