import { Link } from "react-router"

import { Button } from "@/components/atoms/button"
import { EmptyState } from "@/components/molecules/empty-state"
import { PageHeading } from "@/components/molecules/page-heading"
import type { NavItem } from "@/types/workplace"

/** Placeholder for workplace areas that are not designed yet. */
export function SectionTemplate({ section }: { section: NavItem }) {
  return (
    <>
      <PageHeading title={section.label} description={section.description} />
      <EmptyState
        icon={section.icon}
        title={`${section.label} is coming soon`}
        description="This area is part of the Ourigin concept. It will follow the same cards, spacing and teal accents as Home."
        action={
          <Button asChild className="px-[15px] py-3">
            <Link to="/">Back to Home</Link>
          </Button>
        }
      />
    </>
  )
}
