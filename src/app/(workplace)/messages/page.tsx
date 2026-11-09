import type { Metadata } from "next"

import { SectionTemplate } from "@/components/templates/section-template"
import { getNavItem } from "@/lib/data/navigation"

const section = getNavItem("/messages")

export const metadata: Metadata = {
  title: section.label,
}

export default function MessagesPage() {
  return <SectionTemplate section={section} />
}
