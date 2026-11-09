"use client"

import { createContext, use, useCallback, useMemo, useState } from "react"

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

  const openDemo = useCallback((nextTitle: string) => {
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
