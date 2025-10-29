// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/asd-neuroscience-teaching-app-new/', // IMPORTANT for GitHub Pages
})
