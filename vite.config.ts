import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/about-me/',
  server: {
    host: true,
    port: 5173,
    // NO HEADERS HERE! We let index.html handle security.
  },
});