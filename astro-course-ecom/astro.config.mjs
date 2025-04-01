// @ts-check
import { defineConfig, envField } from "astro/config";


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

  env: {
    schema: {
      PUBLIC_STRIPE_KEY: envField.string({ context: "client", access: "public" }),
      SECRET_STRIPE_KEY: envField.string({ context: "server", access: "secret" }),
    },
  },
});