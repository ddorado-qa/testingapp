import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5175,
    strictPort: true,
    cors: true,
    hmr: { host: 'localhost', clientPort: 5175 },
    proxy: {
      '/api': {
        target: 'http://backend:3001',
        changeOrigin: true,
      }
    }
  }
});
