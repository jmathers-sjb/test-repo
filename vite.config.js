import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/test-repo/',
  build: {
    outDir: 'docs',
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    strictPort: true,
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    strictPort: true,
  },
})
