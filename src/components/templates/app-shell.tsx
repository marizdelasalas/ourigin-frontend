import { AppSidebar } from "@/components/organisms/app-sidebar"
import { TopBar } from "@/components/organisms/top-bar"

/**
 * Full-viewport workplace layout: sidebar (bottom bar on phones) flush with the
 * left edge, top bar and the routed page filling the remaining width.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-full pb-[calc(70px+env(safe-area-inset-bottom))] md:pb-0">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <div className="relative flex min-h-dvh w-full overflow-x-clip bg-background">
        <AppSidebar />
        <div className="min-w-0 flex-1">
          <TopBar />
          <main
            id="main-content"
            className="px-4 pt-2 pb-[25px] md:px-[18px] md:pt-0 md:pb-6 lg:px-[30px] lg:pb-[30px] 2xl:px-[34px] 2xl:pb-9"
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
