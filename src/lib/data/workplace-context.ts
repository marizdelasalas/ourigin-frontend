import type { WorkplaceContext } from "@/types/workplace"

import { priya } from "./people"

export const workplaceContext: WorkplaceContext = {
  attention: {
    openCount: 3,
    items: [
      {
        icon: "panels-top-left",
        title: "Review H2 contractor request",
        description: "$240k already included in the forecast",
        tag: "Resources · Finance AI",
      },
      {
        icon: "network",
        title: "Confirm the receiving owner",
        description: "2 late handoffs need a named follow-up",
        tag: "Organization · AI-request pilot",
      },
      {
        icon: "heart-handshake",
        title: "Protect Amira’s learning time",
        description: "Check the final two weeks with her manager",
        tag: "People · Development agreement",
      },
    ],
  },
  today: [
    {
      time: "10:00",
      title: "Pilot handoff review",
      description: "30 min · Operations + Engineering",
    },
    {
      time: "14:30",
      title: "Development check-in",
      description: "30 min · Amira + manager",
    },
  ],
  connectedWork: [
    {
      icon: "network",
      title: "AI-request handoff pilot",
      description: "Review-path map + owner checklist",
    },
    {
      icon: "panels-top-left",
      title: "Finance AI",
      description: "FY27 · Jan–Dec 2026 · as of 30 Jun",
    },
  ],
  meet: [
    {
      person: priya,
      title: "Priya Nair",
      description: "Systems design · self-listed expertise",
      actionLabel: "View profile",
    },
    {
      icon: "book-open",
      title: "Responsible AI learning circle",
      description: "Explore one of 2 participation opportunities",
    },
  ],
  following: [
    {
      icon: "panels-top-left",
      title: "Finance AI",
      description: "Resource context",
    },
    {
      icon: "network",
      title: "AI-request pilot",
      description: "Organizational work",
    },
    {
      icon: "book-open",
      title: "Learning circle",
      description: "People & community",
    },
  ],
  saved: {
    description: "Your private shortcuts · Illustrative saved items",
    items: [
      {
        icon: "bookmark",
        title: "Pilot handoff review",
        description: "Review the two late cases",
      },
      {
        icon: "bookmark",
        title: "Responsible AI learning circle",
        description: "Explore a cross-team community",
      },
    ],
  },
}
