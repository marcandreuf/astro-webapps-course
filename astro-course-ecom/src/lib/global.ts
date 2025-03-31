import {
  dispatchCartUpdateEvent,
  getCartCookie,
  saveCartCookie,
} from "./utils";

const quantityEls = document.querySelectorAll(
  "[data-quantity]"
) as NodeListOf<HTMLElement>;

document.addEventListener("cart:updated", () => {
  if (!quantityEls) {
    return;
  }

  const cartItems = getCartCookie();

  quantityEls.forEach((el) => {
    const productId = el.dataset.productid;

    if (!productId) {
      return;
    }

    el.textContent = cartItems.filter((id: string) => id === productId).length;
  });
});

const productButtons = document.querySelectorAll(
  "[data-cart]"
) as NodeListOf<HTMLButtonElement>;

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const cartItems = getCartCookie();

    const productId = button.dataset.productid;
    const actionType = button.dataset.action;

    const newCartItems = [...cartItems];

    if (!productId || !actionType) {
      return;
    }

    if (actionType === "increment") {
      newCartItems.push(productId);
    }

    if (actionType === "decrement") {
      if (newCartItems.includes(productId)) {
        newCartItems.splice(newCartItems.indexOf(productId), 1);
      }
    }

    saveCartCookie(newCartItems);

    dispatchCartUpdateEvent();
  });
});
