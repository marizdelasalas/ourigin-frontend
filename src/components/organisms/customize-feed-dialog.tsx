import { PreviewDialog } from "@/components/molecules/preview-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { FeedPreferences } from "@/providers/home-feed-provider"

type CustomizeFeedDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  preferences: FeedPreferences
  onPreferencesChange: (preferences: FeedPreferences) => void
}

const options: { key: keyof FeedPreferences; label: string }[] = [
  { key: "showRecognition", label: "Show recognition" },
  { key: "showProfiles", label: "Show profile posts" },
]

export function CustomizeFeedDialog({
  open,
  onOpenChange,
  preferences,
  onPreferencesChange,
}: CustomizeFeedDialogProps) {
  return (
    <PreviewDialog open={open} onOpenChange={onOpenChange} title="Customize feed">
      {options.map((option) => (
        <div key={option.key} className="my-[15px] flex items-center gap-2">
          <Checkbox
            id={`feed-${option.key}`}
            checked={preferences[option.key]}
            onCheckedChange={(checked) =>
              onPreferencesChange({ ...preferences, [option.key]: checked === true })
            }
          />
          <Label
            htmlFor={`feed-${option.key}`}
            className="text-(length:--text-body) leading-[1.45] font-normal"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </PreviewDialog>
  )
}
