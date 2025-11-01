import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: Number(process.env.VITE_APP_PORT) || 3000,
  },
  preview: {
    port: Number(process.env.VITE_APP_PORT) || 3000,
  },
})

