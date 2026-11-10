import { PreservedOutlet } from "@/app/preserved-outlet"
import { AppShell } from "@/components/templates/app-shell"
import { DemoDialogProvider } from "@/providers/demo-dialog-provider"
import { FeedViewProvider } from "@/providers/feed-view-provider"

/** Shell and shared state for every workplace route. */
export function WorkplaceLayout() {
  return (
    <FeedViewProvider>
      <DemoDialogProvider>
        <AppShell>
          <PreservedOutlet />
        </AppShell>
      </DemoDialogProvider>
    </FeedViewProvider>
  )
}
