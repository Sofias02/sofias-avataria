import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path'; // Usamos node:path para compatibilidad moderna

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    open: true, // Abre el navegador automáticamente
  },
});
