import assistant from "@/assets/brand/ourigin-ai-assistant.png"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useDemoDialog } from "@/providers/demo-dialog-provider"

/**
 * Entry point for asking questions across connected context. There is no
 * assistant yet, so it opens the demo dialog that says so.
 */
export function AskOuriginCard({ collapsed }: { collapsed: boolean }) {
  const { openDemo } = useDemoDialog()

  const card = (
    <button
      type="button"
      onClick={() => openDemo("Ask Ourigin")}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-tile bg-secondary px-2 py-2.5 text-left hover:bg-accent",
        collapsed && "justify-center px-0"
      )}
    >
      {/* Decorative: the title names the card. */}
      <img
        src={assistant}
        alt=""
        decoding="async"
        className="h-11 w-auto shrink-0"
      />
      <span className={cn("min-w-0", collapsed && "sr-only")}>
        <span className="block text-body font-bold text-primary">Ask Ourigin</span>
        <span className="block text-caption text-muted-foreground">
          Your AI at work
        </span>
      </span>
    </button>
  )

  if (!collapsed) return card

  return (
    <Tooltip>
      <TooltipTrigger asChild>{card}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        Ask Ourigin
      </TooltipContent>
    </Tooltip>
  )
}
