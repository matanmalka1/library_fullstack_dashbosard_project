// SessionStorage utilities
const getDefaultValue = () => [];

export const getStorageItem = (key) => {
  try {
    const value = sessionStorage.getItem(key);
    if (!value) return getDefaultValue();
    return JSON.parse(value);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to parse ${key} from sessionStorage:`, error);
    }
    return getDefaultValue();
  }
};

export const setStorageItem = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to set ${key} in sessionStorage:`, error);
    }
  }
};

export const removeStorageItem = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to remove ${key} from sessionStorage:`, error);
    }
  }
};
