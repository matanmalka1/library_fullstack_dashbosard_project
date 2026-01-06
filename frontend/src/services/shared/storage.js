// LocalStorage utilities
// Note: Auth state is managed separately in auth/store.js but KEYS.AUTH is included for legacy compatibility

export const KEYS = {
  BOOKS: "books",
  USERS: "users",
  ORDERS: "orders",
  AUTH: "auth",
  CART: "cart",
  WISHLIST: "wishlist",
};

const getDefaultValue = (key) => {
  if (key === KEYS.CART || key === KEYS.WISHLIST) return {};
  return [];
};

export const getStorageItem = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return getDefaultValue(key);
    return JSON.parse(raw);
  } catch (error) {
    // Log error but don't throw - return default value
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to parse ${key} from localStorage:`, error);
    }
    return getDefaultValue(key);
  }
};

export const setStorageItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to set ${key} in localStorage:`, error);
    }
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to remove ${key} from localStorage:`, error);
    }
  }
};

