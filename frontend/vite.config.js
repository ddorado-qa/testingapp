// Configuración básica Vite con React y --host para acceder localmente desde otras IPs si se quiere
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  }
})
