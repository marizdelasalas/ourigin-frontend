import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  // `/` locally. The GitHub Pages build sets `BASE_PATH=/ourigin-frontend/`.
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    // `@/*` → `src/*`, read from tsconfig.app.json.
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
})
