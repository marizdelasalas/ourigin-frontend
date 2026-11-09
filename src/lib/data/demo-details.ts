/**
 * Copy for the illustrative "demo" dialog that opens when a destination
 * has no screen yet. Keys are the visible titles that trigger them.
 */
const demoDetails: Record<string, string> = {
  "Review H2 contractor request":
    "$240k is already included in the forecast. Resource context: Finance AI.",
  "Confirm the receiving owner":
    "Two late handoffs need a named follow-up. Review the receiving-owner checklist with Operations + Engineering.",
  "Protect Amira’s learning time":
    "Check the final two weeks of the development agreement with her manager.",
  "Pilot handoff review":
    "10:00 · 30 minutes · Operations + Engineering. Review the two late cases.",
  "Development check-in": "14:30 · 30 minutes · Amira + manager.",
  "Finance AI":
    "FY27 · Jan–Dec 2026 · as of 30 Jun. Resource context for connected work.",
  "AI-request handoff pilot":
    "Operations + Engineering. Review-path map and owner checklist.",
  "Responsible AI learning circle":
    "Express interest by 8 Jul. Contact Priya Nair to agree the scope and time before joining.",
  "Amira Hassan":
    "Operations analyst. Interested in cross-team coordination and responsible AI. Self-listed expertise, not an assessment.",
  "Priya Nair":
    "Systems design. Self-listed expertise. Facilitator for the Responsible AI learning circle.",
  "Nora Chen": "Organization lead at Northstar.",
}

const fallback =
  "This destination is represented in the Ourigin interface concept."

export function getDemoDetail(title: string) {
  return `${demoDetails[title] ?? fallback} This is an illustrative demo.`
}
