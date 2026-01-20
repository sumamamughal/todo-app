import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Output directory
    outDir: 'dist',
    // Generate sourcemaps for production debugging
    sourcemap: false,
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Optimize bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor splitting for better caching
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
          utils: ['date-fns'],
        },
      },
    },
  },
  // Preview server config
  preview: {
    port: 4173,
    strictPort: false,
  },
  // Development server config
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
})
