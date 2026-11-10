import { useRef, useState } from "react"

import { Button } from "@/components/atoms/button"
import { PreviewDialog } from "@/components/molecules/preview-dialog"
import { Textarea } from "@/components/ui/textarea"

type ComposeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  mode: "post" | "reply"
  onSubmit: (text: string) => void
}

/** Writes a post or reply into the local preview. Nothing is sent anywhere. */
export function ComposeDialog({
  open,
  onOpenChange,
  title,
  mode,
  onSubmit,
}: ComposeDialogProps) {
  const [text, setText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isReply = mode === "reply"

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) setText("")
    onOpenChange(nextOpen)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = text.trim()
    if (!value) {
      textareaRef.current?.focus()
      return
    }
    onSubmit(value)
    setText("")
  }

  return (
    <PreviewDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={title}
      description="Preview only. Nothing is sent to a real workspace."
    >
      <form onSubmit={handleSubmit}>
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={isReply ? "Write a reply…" : "Share with Northstar…"}
          aria-label={isReply ? "Reply text" : "Post text"}
          className="mt-2 mb-[15px] h-[140px] resize-y field-sizing-fixed rounded-md border-border p-3 text-(length:--text-body) md:text-(length:--text-body)"
        />
        <Button type="submit" className="px-3.5 py-[9px]">
          {isReply ? "Add reply to preview" : "Add post to preview"}
        </Button>
      </form>
    </PreviewDialog>
  )
}
