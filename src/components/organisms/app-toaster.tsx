import { Toaster } from "@/components/ui/sonner"

/**
 * Short confirmations for actions taken in the preview: a compact teal pill
 * centred above the bottom edge, or above the tab bar on phones.
 *
 * Sonner pins toasts to the left of a fixed-width container (and stretches
 * them below 600px), so the `!` overrides re-centre a fit-content toast.
 * `translate` is used because Sonner animates `transform`. Like the original
 * prototype, toasts never intercept clicks.
 */
export function AppToaster() {
  return (
    <Toaster
      theme="light"
      position="bottom-center"
      offset={{ bottom: "var(--toast-offset)" }}
      mobileOffset={{ bottom: "var(--toast-offset)", left: 0, right: 0 }}
      visibleToasts={1}
      duration={2500}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "pointer-events-none right-auto! left-1/2! w-fit! max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-[6px] bg-primary px-5 py-2.5 font-sans text-[12px] leading-[1.45] text-primary-foreground",
        },
      }}
    />
  )
}
