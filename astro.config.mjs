// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      target: 'esnext', // Usa módulos modernos
      chunkSizeWarningLimit: 1600, // Aumenta límite de chunks
    },
  },
});