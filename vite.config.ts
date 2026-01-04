import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // ✅ ADD THIS BLOCK
  server: {
    proxy: {
      '/world-geo': {
        target: 'https://raw.githubusercontent.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/world-geo/, ''),
      },
      '/hrjust-json': {
        target: 'https://www.hrjust-climate-claims.eu',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/hrjust-json/, ''),
      },
    },
  },
})
