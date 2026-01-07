// LocalStorage utilities
const getDefaultValue = () => [];

export const getStorageItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (!value) return getDefaultValue();
    return JSON.parse(value);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to parse ${key} from localStorage:`, error);
    }
    return getDefaultValue();
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
