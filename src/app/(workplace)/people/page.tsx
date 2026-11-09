import type { Metadata } from "next"

import { SectionTemplate } from "@/components/templates/section-template"
import { getNavItem } from "@/lib/data/navigation"

const section = getNavItem("/people")

export const metadata: Metadata = {
  title: section.label,
}

export default function PeoplePage() {
  return <SectionTemplate section={section} />
}
