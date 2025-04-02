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
  return getTotalProductPrice(product, 1);
};

export const getProductPriceItem = async (defaultPrice: string) => {
  return await getEntry("prices", defaultPrice);
};

export const getTotalProductPrice = async (
  product: CollectionEntry<"products">,
  quantity: number
) => {
  const priceItem = await getEntry("prices", product.data.default_price);

  return priceItem
    ? ((priceItem.data.unit_amount / 100) * quantity).toLocaleString("en-US", {
        style: "currency",
        currency: priceItem?.data.currency,
      })
    : "N/A";
}

export const getTotalItemPrice = async (
  priceItem: CollectionEntry<"prices">,
  quantity: number
) => {
  return priceItem
    ? ((priceItem.data.unit_amount / 100) * quantity).toLocaleString("en-US", {
        style: "currency",
        currency: priceItem?.data.currency,
      })
    : "N/A";
}
