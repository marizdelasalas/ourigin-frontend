import type { Metadata } from "next"

import { SectionTemplate } from "@/components/templates/section-template"
import { getNavItem } from "@/lib/data/navigation"

const section = getNavItem("/calendar")

export const metadata: Metadata = {
  title: section.label,
}

export default function CalendarPage() {
  return <SectionTemplate section={section} />
}
