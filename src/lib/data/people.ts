import amiraHassan from "@/assets/people/amira-hassan.png"
import noraChen from "@/assets/people/nora-chen.png"
import priyaNair from "@/assets/people/priya-nair.png"
import type { Person } from "@/types/workplace"

export const viewer: Person = {
  id: "nora-chen",
  name: "Nora Chen",
  initials: "NC",
  role: "Organization lead",
  avatar: noraChen,
}

export const priya: Person = {
  id: "priya-nair",
  name: "Priya Nair",
  initials: "PN",
  role: "Systems design",
  avatar: priyaNair,
}

export const amira: Person = {
  id: "amira-hassan",
  name: "Amira Hassan",
  initials: "AH",
  role: "Operations analyst",
  avatar: amiraHassan,
}

export const operationsAndEngineering: Person = {
  id: "operations-engineering",
  name: "Operations & Engineering",
  initials: "OE",
}

export const workspace = {
  name: "Northstar",
  tagline: "Northstar / Your workplace",
}
