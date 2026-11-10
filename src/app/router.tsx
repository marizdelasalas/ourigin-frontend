import { createBrowserRouter } from "react-router"

import { RootLayout, type RouteHandle } from "@/app/root-layout"
import { WorkplaceLayout } from "@/app/workplace-layout"
import { navigation } from "@/lib/data/navigation"
import { HomePage } from "@/pages/home-page"
import { NotFoundPage } from "@/pages/not-found-page"
import { SectionPage } from "@/pages/section-page"

/** Every workplace destination except Home is a placeholder for now. */
const sections = navigation
  .flatMap((group) => group.items)
  .filter((item) => item.href !== "/")

export const router = createBrowserRouter(
  [
    {
      Component: RootLayout,
      children: [
        {
          Component: WorkplaceLayout,
          children: [
            {
              index: true,
              Component: HomePage,
              handle: { title: "Home" } satisfies RouteHandle,
            },
            ...sections.map((section) => ({
              path: section.href,
              element: <SectionPage section={section} />,
              handle: { title: section.label } satisfies RouteHandle,
            })),
          ],
        },
        { path: "*", Component: NotFoundPage },
      ],
    },
  ],
  {
    // Vite's `base`: `/` locally, `/ourigin-frontend/` on GitHub Pages.
    basename: import.meta.env.BASE_URL,
  }
)
