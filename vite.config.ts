import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk size
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          'vendor-utils': ['zustand', 'lucide-react'],
        },
        // Ensure small chunk size for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          if (info.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (info.match(/\.(png|jpe?g|gif|svg|webp|avif)$/)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Optimize assets
    assetsInlineLimit: 4096, // 4KB
    chunkSizeWarningLimit: 500,
    // Source maps for production debugging (remove for max performance)
    sourcemap: false,
  },
  // Optimize dev experience
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
  // CSS optimization
  css: {
    devSourcemap: true,
  },
  // Server config
  server: {
    port: 5173,
    host: true,
  },
  // Preview config
  preview: {
    port: 4173,
    host: true,
  },
})
