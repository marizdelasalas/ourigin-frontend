import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // `@/*` → `src/*`, read from tsconfig.app.json.
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
})
