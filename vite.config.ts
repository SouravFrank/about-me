import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // or '0.0.0.0' or your local IP address
    port: 5173, // Keep your port
    headers: {
      // Allow analytics services to work properly
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://*.firebaseio.com https://firebaseinstallations.googleapis.com https://firebaseremoteconfig.googleapis.com;",
      'X-Content-Type-Options': 'nosniff',
    },
  },
  base: '/about-me/', // Changed the base directory
});