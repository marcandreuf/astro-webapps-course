// @ts-check
import { defineConfig } from "astro/config";


import icon from "astro-icon";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
    port: 3002,
  },

  image: {
    domains: ["files.stripe.com"],
  },

  integrations: [icon()],

  output: "server",

  adapter: node({
    mode: "standalone",
  }),
});