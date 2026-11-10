import { Link } from "react-router"

import { Button } from "@/components/atoms/button"
import { BrandSymbol, Wordmark } from "@/components/atoms/logo"

export function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2.5">
          <BrandSymbol eager />
          <Wordmark className="text-[27px] font-[750] tracking-[-1.5px]" />
        </div>
        <h1 className="mt-8 font-heading text-[28px] font-[650] tracking-[-1.2px]">
          Page not found
        </h1>
        <p className="mt-2 text-detail text-muted-foreground">
          This page isn&apos;t part of the Ourigin workplace preview.
        </p>
        <Button asChild className="mt-6 px-[15px] py-3">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  )
}
