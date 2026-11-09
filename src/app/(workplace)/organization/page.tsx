import type { Metadata } from "next"

import { SectionTemplate } from "@/components/templates/section-template"
import { getNavItem } from "@/lib/data/navigation"

const section = getNavItem("/organization")

export const metadata: Metadata = {
  title: section.label,
}

export default function OrganizationPage() {
  return <SectionTemplate section={section} />
}
