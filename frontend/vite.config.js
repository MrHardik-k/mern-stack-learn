import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Ensure this points to the correct directory
    },
  },
  server: {
    proxy:{
      "/api":{
        target:"http://localhost:5000/",
      }
    }
  },
})