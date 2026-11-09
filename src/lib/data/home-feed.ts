import teamCollaboration from "@/assets/content/team-collaboration.png"
import type { FeedPost } from "@/types/workplace"

import { amira, operationsAndEngineering, priya, viewer } from "./people"

export const homeFeed: FeedPost[] = [
  {
    kind: "announcement",
    id: "handoff",
    author: operationsAndEngineering,
    meta: "Announcement · 1 Jul · Visible to Northstar",
    menuLabel: "Post options",
    title: "A clearer handoff for every AI request",
    body: [
      "The pilot checklist now names a receiving owner at each step.",
      "Two late handoffs need a closer look before our next review.",
    ],
    highlight: true,
    linkedWork: {
      title: "AI-request handoff pilot",
      description: "Operations + Engineering · Open shared page",
      image: teamCollaboration,
    },
    reactions: 12,
    comments: 4,
  },
  {
    kind: "recognition",
    id: "thanks",
    author: viewer,
    meta: "Recognition · 30 Jun · AI-request handoff pilot",
    menuLabel: "Recognition options",
    title: "Thank you, Amira",
    body: [
      "For mapping the review path and testing the owner checklist with teams.",
      "That work gave the pilot a much clearer starting point.",
    ],
    highlight: true,
    footnote: "Contribution, not a skills assessment",
    reactions: 8,
    comments: 2,
  },
  {
    kind: "decision",
    id: "decision",
    author: viewer,
    meta: "Decision requested · 1 Jul · Operations + Engineering",
    menuLabel: "Decision options",
    title: "Central coordination or supported team liaisons?",
    body: [
      "Which model would make receiving ownership clearer? Bring the two late cases to our review.",
    ],
    status: "No decision recorded",
    context: "10:00 handoff review · Source cases linked",
    cta: "Join conversation",
  },
  {
    kind: "opportunity",
    id: "learning",
    author: priya,
    meta: "Community invitation · 1 Jul · Responsible AI learning circle",
    menuLabel: "Community options",
    title: "Bring your questions to the learning circle.",
    body: [
      "For colleagues interested in practical, responsible AI.",
      "Help facilitate a shared discussion; agree the scope and time before joining.",
    ],
    opportunity: {
      title: "Facilitate a practical AI learning circle",
      description: "Express interest by 8 Jul · Contact Priya Nair",
      cta: "Explore opportunity",
      detail: "Responsible AI learning circle",
    },
  },
  {
    kind: "profile",
    id: "profile",
    author: amira,
    meta: "Self-shared interests · Professional profile",
    menuLabel: "Profile post options",
    title: "Making a complicated path easier to follow.",
    body: [
      "I'm interested in cross-team coordination and responsible AI.",
      "My profile brings together selected work, interests and colleague recognition.",
    ],
    profile: {
      person: amira,
      description:
        "Operations analyst · Self-listed expertise, not an assessment",
      cta: "View profile",
    },
  },
]
