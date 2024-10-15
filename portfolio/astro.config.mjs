// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  server: {
      host: true,
      port: 3002,
  },

  integrations: [icon()]
});