import { getCollection, getEntry, type CollectionEntry } from "astro:content";
export type FinalCartItem = {
  product: CollectionEntry<"products">;
  quantity: number;
};
export const getTotalCartItems = async (
  cartItems: CollectionEntry<"products">["id"][]
) => {
  const products = await getCollection("products");

  const uniqueCartItems = Array.from(new Set(cartItems));

  const finalCartItems = uniqueCartItems.map((id) => {
    return {
      product: products.find((p) => p.id === id),
      quantity: cartItems.filter((i) => i === id).length,
    };
  }) as FinalCartItem[];

  return finalCartItems;
};

export const getProductPrice = async (product: CollectionEntry<"products">) => {
  const priceItem = await getEntry("prices", product.data.default_price);

  return priceItem
    ? (priceItem.data.unit_amount / 100).toLocaleString("en-US", {
        style: "currency",
        currency: priceItem?.data.currency,
      })
    : "N/A";
};
