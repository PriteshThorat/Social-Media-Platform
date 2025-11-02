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
      baseURL: 'ttps://social-media-platform-seven-orpin.vercel.app', // Replace with your actual domain
      // Optionally, specify URLs manually if not all routes are automatically discoverable
      urls: ['/profile'],
    }),
  ],
  server: {
    historyApiFallback: true // Ensure correct routing in dev
  }
})
