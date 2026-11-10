import { Button } from "@/components/atoms/button"
import { Icon } from "@/components/atoms/icon"
import { useFeedView } from "@/providers/feed-view-provider"
import { useHomeFeed } from "@/providers/home-feed-provider"

/** Page-heading action that opens the feed preferences. */
export function CustomizeFeedButton() {
  const { openCustomize } = useHomeFeed()

  return (
    <Button
      tone="soft"
      onClick={openCustomize}
      className="flex-none rounded-[12px] p-[11px] shadow-soft md:px-4 md:py-3"
    >
      <Icon name="sliders-horizontal" className="size-[15px]" />
      <span className="sr-only md:not-sr-only">Customize feed</span>
    </Button>
  )
}

/** Switches the feed to the "Saved" tab from the context rail. */
export function OpenSavedButton() {
  const { setFilter } = useFeedView()

  return (
    <button
      type="button"
      onClick={() => setFilter("saved")}
      className="text-body font-semibold text-primary"
    >
      Open saved items
    </button>
  )
}
