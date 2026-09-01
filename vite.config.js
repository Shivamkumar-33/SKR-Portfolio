import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],

  build: {
    // Modern browsers only — smaller output, no unnecessary polyfills
    target: 'es2020',

    // Split vendor code into separate cacheable chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'react-vendor': ['react', 'react-dom'],
          // Animation libraries (big, rarely change)
          'motion-vendor': ['motion', 'gsap', '@gsap/react'],
          // Smooth scroll
          'lenis-vendor': ['lenis', 'lenis/react'],
          // Icon library
          'lucide-vendor': ['lucide-react'],
        },
      },
    },
  },
});
