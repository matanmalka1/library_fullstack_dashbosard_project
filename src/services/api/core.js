export const KEYS = {
  BOOKS: "books",
  USERS: "users",
  ORDERS: "orders",
  AUTH: "auth",
  CART: "cart",
  WISHLIST: "wishlist",
};

export const getStore = (key) => {
  const raw = localStorage.getItem(key);
  if (!raw) {
    if (key === KEYS.CART || key === KEYS.WISHLIST || key === KEYS.AUTH)
      return {};
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to parse ${key} from localStorage`, e);
    return key === KEYS.CART || key === KEYS.WISHLIST || key === KEYS.AUTH
      ? {}
      : [];
  }
};

export const setStore = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
