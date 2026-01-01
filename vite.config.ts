import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// Plugin to create 404.html for GitHub Pages SPA routing
const create404Plugin = () => {
  return {
    name: 'create-404',
    closeBundle() {
      const distPath = resolve(__dirname, 'dist')
      const indexPath = resolve(distPath, 'index.html')
      const html404Path = resolve(distPath, '404.html')
      
      try {
        // Simply copy index.html to 404.html
        // GitHub Pages will serve 404.html for any 404, and React Router will handle routing
        copyFileSync(indexPath, html404Path)
        console.log('Created 404.html for GitHub Pages SPA routing')
      } catch (error) {
        console.warn('Failed to create 404.html:', error)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), create404Plugin()],
  base: process.env.BASE_PATH || '/',
})
