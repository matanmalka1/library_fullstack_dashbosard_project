
export const KEYS = {
  BOOKS: 'books',
  USERS: 'users',
  ORDERS: 'orders',
  AUTH: 'auth',
  CART: 'cart',
  WISHLIST: 'wishlist'
};

export const getStore = (key) => JSON.parse(localStorage.getItem(key) || '[]');

export const setStore = (key, data) => localStorage.setItem(key, JSON.stringify(data));
