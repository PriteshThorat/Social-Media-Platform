import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import sitemap from 'vite-sitemap';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    sitemap({
      hostname: 'https://social-media-platform-seven-orpin.vercel.app',
      exclude: ['/404'],                 
      changefreq: 'daily',
    }),
  ],
  server: {
    historyApiFallback: true // Ensure correct routing in dev
  }
})