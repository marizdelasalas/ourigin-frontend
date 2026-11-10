import type { FollowingItem, NavGroup, NavItem } from "@/types/workplace"

export const primaryNavigation: NavGroup = {
  items: [
    {
      href: "/",
      label: "Home",
      icon: "house",
      description:
        "Your people, shared work and the conversations that move it forward.",
    },
    {
      href: "/inbox",
      label: "Inbox",
      icon: "inbox",
      count: 3,
      description: "Requests, approvals and updates that need your response.",
    },
    {
      href: "/calendar",
      label: "Calendar",
      icon: "calendar-days",
      description: "Meetings, reviews and check-ins across your teams.",
    },
    {
      href: "/messages",
      label: "Messages",
      icon: "messages-square",
      description: "Direct and group conversations with colleagues.",
    },
  ],
}

export const exploreNavigation: NavGroup = {
  label: "Explore",
  items: [
    {
      href: "/organization",
      label: "Organization",
      icon: "network",
      description: "Teams, structure and shared work across Northstar.",
    },
    {
      href: "/goals",
      label: "Goals",
      icon: "target",
      description: "Shared objectives and the progress behind them.",
    },
    {
      href: "/people",
      label: "People",
      icon: "users-round",
      description: "Colleagues, profiles and self-listed expertise.",
    },
    {
      href: "/resources",
      label: "Resources",
      icon: "panels-top-left",
      description: "Budgets, forecasts and the context behind decisions.",
    },
  ],
}

export const navigation = [primaryNavigation, exploreNavigation]

/** Shown under "Following" in the sidebar from `md` up. No routes yet. */
export const followingNavigation: FollowingItem[] = [
  { label: "Finance AI", icon: "panels-top-left", demo: "Finance AI" },
  { label: "AI-request pilot", icon: "network", demo: "AI-request handoff pilot" },
  { label: "Learning circle", icon: "book-open", demo: "Responsible AI learning circle" },
]

export function getNavItem(href: string): NavItem {
  const item = navigation
    .flatMap((group) => group.items)
    .find((entry) => entry.href === href)

  if (!item) {
    throw new Error(`No navigation item is registered for "${href}".`)
  }

  return item
}
