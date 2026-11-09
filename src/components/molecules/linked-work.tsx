"use client"

import Image, { type StaticImageData } from "next/image"

import { Icon } from "@/components/atoms/icon"
import { useDemoDialog } from "@/providers/demo-dialog-provider"

type LinkedWorkProps = {
  title: string
  description: string
  image: StaticImageData
}

/** Shared work attached to a post, with a photo on larger screens. */
export function LinkedWork({ title, description, image }: LinkedWorkProps) {
  const { openDemo } = useDemoDialog()

  return (
    <button
      type="button"
      onClick={() => openDemo(title)}
      className="mt-5 mb-[17px] flex min-h-[68px] w-full items-center gap-[9px] overflow-hidden rounded-tile bg-tile p-3 text-left md:mt-6 md:h-[62px] md:min-h-0 md:gap-[13px] md:py-0 md:pr-0 md:pl-4"
    >
      <Icon name="network" className="size-[19px] text-primary" />
      <span className="min-w-0 flex-1">
        <span className="text-[10px] font-bold text-primary md:text-[11px]">
          {title}
        </span>
        <span className="mt-1 block text-[8px] leading-[1.6] text-muted-foreground md:text-[9px] md:leading-[1.45]">
          {description}
        </span>
      </span>
      <Icon name="arrow-up-right" className="mr-2.5 size-[14px] text-primary" />
      <span className="relative hidden h-[62px] w-20 shrink-0 md:block lg:w-[140px]">
        <Image
          src={image}
          alt=""
          fill
          sizes="140px"
          className="object-cover object-left"
        />
      </span>
    </button>
  )
}
