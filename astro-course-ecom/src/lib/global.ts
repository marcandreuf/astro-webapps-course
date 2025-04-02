import {
  dispatchCartUpdateEvent,
  getCartCookie,
  saveCartCookie,
} from "./utils";

const cardItems = document.querySelectorAll(
  "[data-cart-item]"
) as NodeListOf<HTMLDivElement>;

const cartTotal = document.querySelector("[data-cart-total]") as HTMLElement;


document.addEventListener("cart:updated", () => {
  if(!cardItems || !cartTotal) {
    return;
  }
  
  const cookieCartItems = getCartCookie();

  let totalCartPrice = 0

  cardItems.forEach((el) => {
    const productId = el.dataset.productid;
    if (!productId) {
      return;
    }

    const priceItem = el.querySelector("[data-price]") as HTMLElement;
    const priceAttribute = priceItem.dataset.unitAmount;
    const price = parseFloat(priceAttribute as string);
    const currencyAttirbute = priceItem.dataset.currency;
    if (!priceItem || !priceAttribute || !currencyAttirbute) {
      return; 
    }

    const quantityItem = el.querySelector("[data-quantity]");
    if(!quantityItem) {
      return;
    }

    const cookieItemQuantity = 
      cookieCartItems.filter((id: string) => id === productId).length;
    const totalItemPrice = (price * cookieItemQuantity).toLocaleString("en-US", {
      style: "currency",
      currency: currencyAttirbute,
    });

    quantityItem.textContent = cookieItemQuantity.toString();    
    priceItem.textContent = totalItemPrice;

    totalCartPrice += price * cookieItemQuantity;
  });

  cartTotal.textContent = totalCartPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "eur",
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
