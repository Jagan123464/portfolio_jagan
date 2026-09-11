import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base must match the GitHub Pages repo path for deployment to work
export default defineConfig({
  plugins: [react()],
  base: '/portfolio_jagan/',
})
