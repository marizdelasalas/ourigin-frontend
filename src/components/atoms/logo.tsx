import Image from "next/image"

import symbol from "@/assets/brand/ourigin-symbol.png"
import { cn } from "@/lib/utils"

type BrandSymbolProps = {
  className?: string
  /** Load immediately when the symbol is above the fold. */
  eager?: boolean
}

/** The open-circle-and-dot symbol. Decorative: always pair it with a label. */
export function BrandSymbol({ className, eager }: BrandSymbolProps) {
  return (
    <Image
      src={symbol}
      alt=""
      sizes="42px"
      loading={eager ? "eager" : undefined}
      className={cn("h-9 w-8 shrink-0 object-contain", className)}
    />
  )
}

/** The lowercase "ourigin" wordmark set in Manrope. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-heading leading-normal text-foreground", className)}>
      ourigin
    </span>
  )
}
