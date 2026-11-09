import type { SVGProps } from "react"

import { cn } from "@/lib/utils"

/**
 * Ourigin's soft, two-tone icon set (identity proposal, section 05).
 * Solid silhouettes with translucent supporting shapes on a 24px grid.
 * Every shape inherits `currentColor`, so set the colour with a text-* class.
 */
const icons = {
  "house": (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="2.5"/>
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2.5" opacity=".28"/>
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2.5" opacity=".28"/>
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2.5"/>
    </>
  ),
  "inbox": (
    <>
      <rect x="2" y="5" width="20" height="15" rx="5" opacity=".24"/>
      <path d="M7 5h10a5 5 0 0 1 5 5v5a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-5a5 5 0 0 1 5-5Z"/>
      <path d="M3 11h5l2 3h4l2-3h5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="6" y="3" width="12" height="4" rx="2" opacity=".3"/>
    </>
  ),
  "calendar-days": (
    <>
      <rect x="3" y="5" width="18" height="17" rx="5"/>
      <path d="M8 3v5m8-5v5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M4 10h16" stroke="white" strokeWidth="1.5" opacity=".6"/>
      <g fill="white">
      <circle cx="8" cy="14" r="1"/>
      <circle cx="12" cy="14" r="1"/>
      <circle cx="16" cy="14" r="1"/>
      <circle cx="8" cy="18" r="1"/>
      <circle cx="12" cy="18" r="1"/>
      </g>
    </>
  ),
  "messages-square": (
    <>
      <path d="M12 2C6.5 2 2 5.8 2 10.5c0 2.6 1.4 5 3.6 6.5L5 22l5-3.2 2 .2c5.5 0 10-3.8 10-8.5S17.5 2 12 2Z" opacity=".2"/>
      <path d="M18 7c3 1 4 3.5 4 6 0 2-1 4-3 5l.4 3-3.5-1.7H13c-4 0-7-2.8-7-6.2S9 7 13 7Z"/>
      <g fill="white">
      <circle cx="10" cy="13" r="1"/>
      <circle cx="14" cy="13" r="1"/>
      <circle cx="18" cy="13" r="1"/>
      </g>
    </>
  ),
  "network": (
    <>
      <path d="M12 8v6M6 14h12M6 14v3m12-3v3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity=".4"/>
      <rect x="8" y="2" width="8" height="8" rx="3"/>
      <rect x="2" y="15" width="8" height="7" rx="2.5" opacity=".5"/>
      <rect x="14" y="15" width="8" height="7" rx="2.5"/>
    </>
  ),
  "target": (
    <>
      <circle cx="12" cy="12" r="10" opacity=".17"/>
      <circle cx="12" cy="12" r="6.5" opacity=".35"/>
      <circle cx="12" cy="12" r="3.5"/>
      <path d="m13 11 7-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="m17 3 4 0 0 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  "users-round": (
    <>
      <circle cx="16.5" cy="7" r="3.5" opacity=".3"/>
      <path d="M16 12c4 0 6 2.5 6 6v1H12v-1c0-3 1-6 4-6" opacity=".3"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M9 13c-4 0-7 2.8-7 6v1c0 1 1 2 2 2h10c1 0 2-1 2-2v-1c0-3.2-3-6-7-6Z"/>
    </>
  ),
  "panels-top-left": (
    <>
      <path d="M3 6a3 3 0 0 1 3-3h4l3 3h5a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z" opacity=".28"/>
      <rect x="2" y="8" width="20" height="13" rx="4"/>
      <path d="M8 13h8m-8 4h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </>
  ),
  "chevron-down": (
    <>
      <circle cx="12" cy="12" r="10" opacity=".12"/>
      <path d="m7 10 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2.3"/>
    </>
  ),
  "book-open": (
    <>
      <path d="M3 4h5c2 0 3 1 3 3v14c-1-2-3-2-5-2H3Z" opacity=".35"/>
      <path d="M21 4h-5c-2 0-3 1-3 3v14c1-2 3-2 5-2h3Z"/>
    </>
  ),
  "sparkles": (
    <>
      <path d="m10 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/>
      <path d="m20 1 1.2 3L24 5l-2.8 1.2L20 9l-1.2-2.8L16 5l2.8-1Z" opacity=".35"/>
    </>
  ),
  "sliders-horizontal": (
    <>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.5" opacity=".25"/>
      <rect x="6" y="3" width="5" height="6" rx="2"/>
      <rect x="14" y="9" width="5" height="6" rx="2"/>
      <rect x="7" y="15" width="5" height="6" rx="2"/>
    </>
  ),
  "search": (
    <>
      <circle cx="10.5" cy="10.5" r="8" opacity=".18"/>
      <circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" strokeWidth="2.5"/>
      <path d="m16 16 5 5" stroke="currentColor" strokeWidth="3.5"/>
    </>
  ),
  "bell": (
    <>
      <path d="M12 2c-4 0-7 3-7 7v3l-2 4c-.5 1 .2 2 1.5 2h15c1.3 0 2-1 1.5-2l-2-4V9c0-4-3-7-7-7Z"/>
      <path d="M9 20a3 3 0 0 0 6 0" opacity=".4"/>
    </>
  ),
  "circle-help": (
    <>
      <circle cx="12" cy="12" r="10" opacity=".18"/>
      <path d="M9 8a3 3 0 1 1 5 2.3c-1.5 1-2 1.2-2 3" fill="none" stroke="currentColor" strokeWidth="2.3"/>
      <circle cx="12" cy="17" r="1.3"/>
    </>
  ),
  "plus": (
    <>
      <rect x="2" y="2" width="20" height="20" rx="7" opacity=".16"/>
      <path d="M6 12h12M12 6v12" stroke="currentColor" strokeWidth="2.5"/>
    </>
  ),
  "pencil": (
    <>
      <path d="M3 17v4h4L18 10l-4-4Z"/>
      <path d="m16 4 2-2c1-1 2-1 3 0l1 1c1 1 1 2 0 3l-2 2Z" opacity=".45"/>
    </>
  ),
  "message-circle": (
    <>
      <path d="M12 2C6 2 2 6 2 11c0 3 1 5 3 7l-1 4 5-2h3c6 0 10-4 10-9S18 2 12 2Z" opacity=".22"/>
      <circle cx="7" cy="11" r="1.5"/>
      <circle cx="12" cy="11" r="1.5"/>
      <circle cx="17" cy="11" r="1.5"/>
    </>
  ),
  "award": (
    <>
      <path d="m7 12-2 10 7-3 7 3-2-10Z" opacity=".3"/>
      <circle cx="12" cy="8" r="7"/>
      <circle cx="12" cy="8" r="3" fill="white" opacity=".65"/>
    </>
  ),
  "paperclip": (
    <>
      <rect x="3" y="3" width="18" height="18" rx="7" opacity=".12"/>
      <path d="m15 7-7 7a2 2 0 0 0 3 3l7-7a4 4 0 0 0-6-6l-7 7a6 6 0 0 0 8 9" fill="none" stroke="currentColor" strokeWidth="2.2"/>
    </>
  ),
  "ellipsis": (
    <>
      <circle cx="5" cy="12" r="2" opacity=".5"/>
      <circle cx="12" cy="12" r="2"/>
      <circle cx="19" cy="12" r="2" opacity=".5"/>
    </>
  ),
  "arrow-up-right": (
    <>
      <rect x="2" y="2" width="20" height="20" rx="7" opacity=".12"/>
      <path d="M7 17 17 7M7 7h10v10" fill="none" stroke="currentColor" strokeWidth="2.2"/>
    </>
  ),
  "heart": (
    <>
      <path d="M12 21 3 12C-3 5 6-2 12 5c6-7 15 0 9 7Z" opacity=".22"/>
      <path d="M12 18 5 11C1 6 7 2 12 8c5-6 11-2 7 3Z"/>
    </>
  ),
  "trophy": (
    <>
      <path d="M6 5H2v4c0 4 3 6 7 6m9-10h4v4c0 4-3 6-7 6" fill="none" stroke="currentColor" strokeWidth="3" opacity=".35"/>
      <path d="M6 2h12v7c0 4-2 6-5 7v3h4v3H7v-3h4v-3c-3-1-5-3-5-7Z"/>
    </>
  ),
  "bookmark": (
    <>
      <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-5-8 5V4a2 2 0 0 1 2-2Z" opacity=".22"/>
      <path d="M8 4h8v14l-4-3-4 3Z"/>
    </>
  ),
  "circle-check": (
    <>
      <circle cx="12" cy="12" r="10" opacity=".18"/>
      <path d="m6.5 12 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.8"/>
    </>
  ),
  "heart-handshake": (
    <>
      <path d="M12 21 3 12C-3 5 6-2 12 5c6-7 15 0 9 7Z" opacity=".22"/>
      <path d="m5 12 4 4c1 1 2 1 3 0l5-5-3-3-4 3-2-2 3-3" fill="none" stroke="currentColor" strokeWidth="2.4"/>
    </>
  ),
  "panel-left-close": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="4" opacity=".13"/>
      <path d="M6 7h3v10H6Z"/>
      <path d="m16 9-3 3 3 3" fill="none" stroke="currentColor" strokeWidth="1.7"/>
    </>
  ),
  "panel-left-open": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="4" opacity=".13"/>
      <path d="M6 7h3v10H6Z"/>
      <path d="m13 9 3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.7"/>
    </>
  ),
}

export type IconName = keyof typeof icons

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  name: IconName
}

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      data-slot="icon"
      className={cn("block size-[18px] shrink-0", className)}
      {...props}
    >
      {icons[name]}
    </svg>
  )
}
