import { AppShell } from "@/components/templates/app-shell"
import { DemoDialogProvider } from "@/providers/demo-dialog-provider"
import { FeedViewProvider } from "@/providers/feed-view-provider"

export default function WorkplaceLayout({ children }: LayoutProps<"/">) {
  return (
    <FeedViewProvider>
      <DemoDialogProvider>
        <AppShell>{children}</AppShell>
      </DemoDialogProvider>
    </FeedViewProvider>
  )
}
