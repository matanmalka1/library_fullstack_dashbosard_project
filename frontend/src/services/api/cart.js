import { http } from "./http";

const getApiErrorMessage = (error, fallback) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return error?.message || fallback;
};

const normalizeCartItem = (item) => ({
  bookId: item.bookId || item.book?._id || item.book,
  quantity: item.quantity,
  book: item.book,
});

export const attachCartMethods = (service) => {
  service.getCart = async () => {
    try {
      const { data } = await http.get("/cart");
      const items = data?.data?.items || [];
      return items.map(normalizeCartItem);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to load cart"));
    }
  };

  service.saveCart = async (_uid, items) => {
    try {
      const payload = {
        items: (items || []).map((item) => ({
          bookId: item.bookId,
          quantity: item.quantity,
        })),
      };
      const { data } = await http.put("/cart", payload);
      const saved = data?.data?.items || [];
      return saved.map(normalizeCartItem);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to save cart"));
    }
  };
};
