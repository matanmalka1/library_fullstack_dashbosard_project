import { http } from "./http";

const getApiErrorMessage = (error, fallback) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return error?.message || fallback;
};

const normalizeIds = (items = []) =>
  items.map((id) => id?.toString?.() || id);

export const attachWishlistMethods = (service) => {
  service.getWishlist = async () => {
    try {
      const { data } = await http.get("/wishlist");
      return normalizeIds(data?.data?.items || []);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to load wishlist"));
    }
  };

  service.toggleWishlist = async (_uid, bookId) => {
    try {
      const { data } = await http.post("/wishlist/toggle", { bookId });
      return normalizeIds(data?.data?.items || []);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to update wishlist"));
    }
  };
};
