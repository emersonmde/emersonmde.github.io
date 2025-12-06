import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://errorsignal.dev',
  integrations: [react()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
