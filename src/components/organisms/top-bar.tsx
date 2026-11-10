import { Link } from "react-router"

import { Icon } from "@/components/atoms/icon"
import { BrandSymbol } from "@/components/atoms/logo"
import { AccountMenu } from "@/components/molecules/account-menu"
import { SearchField } from "@/components/molecules/search-field"
import { workspace } from "@/lib/data/people"
import { useDemoDialog } from "@/providers/demo-dialog-provider"

export function TopBar() {
  const { openDemo } = useDemoDialog()

  return (
    <header className="relative flex h-[77px] items-center justify-between gap-[15px] bg-background px-5 py-[18px] md:h-[92px] md:gap-[25px] md:bg-transparent md:px-[22px] md:py-5 lg:px-[30px]">
      <div className="mr-auto flex min-w-0 items-center gap-2.5">
        {/* Phones have no sidebar, so the symbol is their only brand mark. */}
        <Link to="/" aria-label="Ourigin home" className="shrink-0 md:hidden">
          <BrandSymbol eager className="h-[31px] w-7" />
        </Link>
        {/* Static until workspace switching exists. */}
        <p className="flex min-w-0 items-center gap-1.5 font-heading text-[18px] font-bold tracking-[-0.4px] text-foreground">
          <span className="sr-only">Workspace: </span>
          <span className="truncate">{workspace.name}</span>
          <Icon name="chevron-down" aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        </p>
      </div>

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
        <AccountMenu />
      </div>
    </header>
  )
}
