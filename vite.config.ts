import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import pkg from './package.json' with { type: 'json' };

import { cloudflare } from "@cloudflare/vite-plugin";
import { adminSyncPlugin } from './src/admin/vite-plugin-admin-sync';

export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [tailwindcss(), react(), cloudflare(), adminSyncPlugin()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    cssMinify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      // Prevent admin-requests.json writes from triggering HMR reloads.
      // Without this, the sync effect in AdminTasksPage would create an
      // infinite loop: write → Vite reloads → effect runs → write → ...
      ignored: ['**/docs/admin-requests.json'],
    },
  },
});