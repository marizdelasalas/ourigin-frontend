import { createContext, use, useCallback, useMemo, useRef, useState } from "react"

import { PreviewDialog } from "@/components/molecules/preview-dialog"
import { getDemoDetail } from "@/lib/data/demo-details"

type DemoDialogContextValue = {
  /** Explain a destination that the concept doesn't include yet. */
  openDemo: (title: string) => void
}

const DemoDialogContext = createContext<DemoDialogContextValue | null>(null)

export function DemoDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  // The dialog has no DialogTrigger, so Radix can't return focus on its own.
  const returnFocusTo = useRef<HTMLElement | null>(null)
  // Show the focus ring on return only if the opener was showing one.
  const returnFocusVisible = useRef(false)

  const openDemo = useCallback((nextTitle: string) => {
    const opener = document.activeElement
    returnFocusTo.current = opener instanceof HTMLElement ? opener : null
    returnFocusVisible.current = opener?.matches(":focus-visible") ?? false
    setTitle(nextTitle)
    setOpen(true)
  }, [])

  const value = useMemo(() => ({ openDemo }), [openDemo])

  return (
    <DemoDialogContext value={value}>
      {children}
      <PreviewDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={getDemoDetail(title)}
        onCloseAutoFocus={(event) => {
          const target = returnFocusTo.current
          if (target?.isConnected) {
            event.preventDefault()
            target.focus({ focusVisible: returnFocusVisible.current })
          }
        }}
      />
    </DemoDialogContext>
  )
}

export function useDemoDialog() {
  const context = use(DemoDialogContext)
  if (!context) {
    throw new Error("useDemoDialog must be used inside <DemoDialogProvider>.")
  }
  return context
}
