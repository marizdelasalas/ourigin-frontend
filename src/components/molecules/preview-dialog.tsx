"use client"

import { Dialog as DialogPrimitive } from "radix-ui"

import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"

type PreviewDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: React.ReactNode
}

/**
 * Modal used by every illustrative interaction. Composed from the shadcn
 * dialog parts so the overlay and close control can follow the Ourigin design.
 */
export function PreviewDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: PreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-[#172b3555] supports-backdrop-filter:backdrop-blur-none" />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          {...(description ? {} : { "aria-describedby": undefined })}
          className="fixed top-1/2 left-1/2 z-50 w-[min(520px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-control border border-border bg-popover p-[30px] text-[12px] text-popover-foreground shadow-dialog duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
        >
          <DialogTitle className="mb-[15px] font-sans text-[21px] leading-[1.25] font-[750]">
            {title}
          </DialogTitle>
          {description ? (
            <DialogDescription className="my-2.5 text-[12px] text-muted-foreground">
              {description}
            </DialogDescription>
          ) : null}
          {children}
          <DialogClose
            aria-label="Close dialog"
            className="absolute top-2.5 right-[15px] text-[25px] leading-[1.45] text-muted-foreground"
          >
            ×
          </DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
