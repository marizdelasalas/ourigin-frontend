import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Button as BaseButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/*
 * Ourigin button styles layered on the shadcn Button primitive. The base
 * component still provides focus rings, disabled states and `asChild`.
 */
const buttonVariants = cva(
  "h-auto gap-[9px] border-0 font-sans whitespace-nowrap [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      tone: {
        /** Deep teal fill for the main action in a surface. */
        primary:
          "rounded-[11px] bg-primary font-bold text-primary-foreground hover:bg-primary/90",
        /** White, borderless button that sits on tinted surfaces. */
        soft: "rounded-[10px] border-0 bg-white font-[650] text-primary hover:bg-accent hover:text-primary [&_svg:not([class*='size-'])]:size-[15px]",
        /** Text-only action, used inline in posts. */
        plain:
          "rounded-md bg-transparent p-0 font-semibold text-primary hover:bg-transparent hover:text-primary",
      },
    },
    defaultVariants: {
      tone: "primary",
    },
  }
)

const baseVariant = {
  primary: "default",
  soft: "outline",
  plain: "ghost",
} as const

type ButtonProps = Omit<ComponentProps<typeof BaseButton>, "variant" | "size"> &
  VariantProps<typeof buttonVariants>

export function Button({ tone, className, ...props }: ButtonProps) {
  return (
    <BaseButton
      variant={baseVariant[tone ?? "primary"]}
      className={cn(buttonVariants({ tone }), className)}
      {...props}
    />
  )
}
