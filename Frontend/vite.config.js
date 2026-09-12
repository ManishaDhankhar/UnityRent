import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

dotenv.config()

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    define: {
      'process.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL || env.VITE_BACKEND_URL),
    }
  }
})
