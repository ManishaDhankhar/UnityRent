import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  envPrefix: ['VITE_', 'BACKEND_'],
  define: {
    'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL)
  }
})
