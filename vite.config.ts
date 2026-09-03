import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    sitemap({
      hostname: 'https://social-media-platform-seven-orpin.vercel.app', // full domain required
      dynamicRoutes: ['/'],   // add all your routes
      exclude: ['/login', '/signup', '/forgot-password', '/change-avatar'],
    }),
  ],
  server: {}
})