import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"

export default defineConfig({
  server: {
    // proxy: {
    //     "/api/v1/": "https://e-commerce-backend-fra4.onrender.com/",
    //     // https://e-commerce-backend-fra4.onrender.com
    //     // "/paymentsuccess/": "http://localhost:4000/",
    //     // "/api/v1/process/payment": "http//localhost:4000/",
    // }
  },
  plugins: [react()],
})
