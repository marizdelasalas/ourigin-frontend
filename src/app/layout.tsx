import type { Metadata, Viewport } from "next"
import { Inter, Manrope } from "next/font/google"

import { AppToaster } from "@/components/organisms/app-toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: {
    default: "Ourigin",
    template: "%s · Ourigin",
  },
  description:
    "A people-centric enterprise workplace for employees, teams and leaders.",
  applicationName: "Ourigin",
}

export const viewport: Viewport = {
  themeColor: "#eff5f3",
  viewportFit: "cover",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} antialiased`}
    >
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <AppToaster />
      </body>
    </html>
  )
}
