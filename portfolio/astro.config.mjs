// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  server: {
      host: true,
      port: 3002,
  },

  integrations: [icon()],
output: 'hybrid',

  adapter: node({
    mode: 'standalone'
  })
});