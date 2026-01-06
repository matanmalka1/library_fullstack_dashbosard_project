import { setStore, KEYS } from "./core";

export const attachCartMethods = (service) => {
  service.getCart = (uid) => {
    return JSON.parse(localStorage.getItem(KEYS.CART) || "{}")[uid] || [];
  };

  service.saveCart = (uid, items) => {
    const carts = JSON.parse(localStorage.getItem(KEYS.CART) || "{}");
    carts[uid] = items;
    setStore(KEYS.CART, carts);
  };
};
