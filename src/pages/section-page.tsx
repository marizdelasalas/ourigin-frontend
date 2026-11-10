import { SectionTemplate } from "@/components/templates/section-template"
import type { NavItem } from "@/types/workplace"

/** Inbox, Calendar, Messages and the Explore areas, until they are designed. */
export function SectionPage({ section }: { section: NavItem }) {
  return <SectionTemplate section={section} />
}
