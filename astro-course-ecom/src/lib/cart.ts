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
  if(!priceItem) {
    return "N/A"; 
  }
  return getTotalItemPrice(priceItem, quantity);
}

export const getTotalProductPriceValue = async (
  product: CollectionEntry<"products">,
  quantity: number
) => {
  const priceItem = await getEntry("prices", product.data.default_price);
  if(!priceItem) {
    return 0; 
  }
  return getTotalItemPriceValue(priceItem, quantity);
}

export const getTotalCartPrice = async (
  cartItems: FinalCartItem[],
  currency: string
) => {
  const prices = await Promise.all(
    cartItems.map(cartItem => 
      getTotalProductPriceValue(cartItem.product, cartItem.quantity)
    )
  );
  const totalCartPrice = prices.reduce((acc, price) => acc + price, 0);

  return totalCartPrice.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });
}



export const getTotalItemPriceValue = (
  priceItem: CollectionEntry<"prices">,
  quantity: number
) => {
  return (priceItem.data.unit_amount / 100) * quantity;
}

export const getTotalItemPrice = async (
  priceItem: CollectionEntry<"prices">,
  quantity: number
) => {
  return priceItem
    ? (getTotalItemPriceValue(priceItem, quantity)).toLocaleString("en-US", {
        style: "currency",
        currency: priceItem?.data.currency,
      })
    : "N/A";
}
