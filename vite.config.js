import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const basePath = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base: basePath,
  plugins: [react()],
  resolve: {
    alias: {
      '@': process.cwd() + '/src',
    },
  },
});
