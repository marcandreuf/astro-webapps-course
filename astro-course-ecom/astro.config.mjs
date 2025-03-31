// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
    port: 3002,
  },
  image: {
    domains: ["files.stripe.com"],
  },

  output: "server",
  adapter: vercel(),
  integrations: [icon()],
});
