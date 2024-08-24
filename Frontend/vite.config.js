import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"

export default defineConfig({
  server: {
    proxy: {
        "/api/v1/": "http://yashdonaldo.com.s3-website.ap-south-1.amazonaws.com/",
        // "/paymentsuccess/": "http://localhost:4000/",
        // "/api/v1/process/payment": "http//localhost:4000/",
    }
  },
  plugins: [react()],
})
