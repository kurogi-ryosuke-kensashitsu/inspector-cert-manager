import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/inspector-cert-manager/',
  plugins: [react()],
})
