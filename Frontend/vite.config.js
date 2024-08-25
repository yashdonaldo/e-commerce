import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"

export default defineConfig({
  server: {
    proxy: {
        "/api/v1/": "https://e-commerce-backend-fra4.onrender.com/",
    }
  },
  plugins: [react()],
})
