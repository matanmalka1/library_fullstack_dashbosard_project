import { setStore, KEYS } from "./core";

export const attachWishlistMethods = (service) => {
  service.getWishlist = (uid) => {
    return JSON.parse(localStorage.getItem(KEYS.WISHLIST) || "{}")[uid] || [];
  };

  service.toggleWishlist = (uid, bookId) => {
    const wishlists = JSON.parse(localStorage.getItem(KEYS.WISHLIST) || "{}");
    const list = wishlists[uid] || [];

    const index = list.indexOf(bookId);
    index > -1 ? list.splice(index, 1) : list.push(bookId);

    wishlists[uid] = list;
    setStore(KEYS.WISHLIST, wishlists);

    return list;
  };
};
