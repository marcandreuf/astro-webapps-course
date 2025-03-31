export const dispatchCartUpdateEvent = () => {
  document.dispatchEvent(new CustomEvent("cart:updated"));
};

// COOKIES
export const saveCartCookie = (cartItems: string[]) => {
  document.cookie = `cartItems=${JSON.stringify(cartItems)};path=/;max-age=31536000`;
};

export const getCartCookie = () => {
  const cookie = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("cartItems="))
    ?.split("=")[1];

  return cookie ? JSON.parse(cookie) : [];
};

export const deleteCartCookie = () =>
  (document.cookie =
    "cartItems=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
