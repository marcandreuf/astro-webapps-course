import { defineCollection, z } from "astro:content";
import { stripePriceLoader, stripeProductLoader } from "stripe-astro-loader";
import Stripe from "stripe";
import { SECRET_STRIPE_KEY } from "astro:env/server";

const stripe = new Stripe(SECRET_STRIPE_KEY);


const products = defineCollection({
  loader: stripeProductLoader(stripe),
  schema: z.object({
    id: z.string(),
    active: z.boolean(),
    name: z.string(),
    description: z.string(),
    images: z.array(z.string()),
    default_price: z.string(),
    }),
});

const prices = defineCollection({
  loader: stripePriceLoader(stripe),
  schema: z.object({
    id: z.string(),
    currency: z.string(),
    unit_amount: z.number(),
  }),
});

export const collections = { products, prices };