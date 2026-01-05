
export const KEYS = {
  BOOKS: 'books',
  USERS: 'users',
  ORDERS: 'orders',
  AUTH: 'auth',
  CART: 'cart',
  WISHLIST: 'wishlist'
};

export const getStore = <T>(key: string): T => 
  JSON.parse(localStorage.getItem(key) || '[]');

export const setStore = (key: string, data: any) => 
  localStorage.setItem(key, JSON.stringify(data));
