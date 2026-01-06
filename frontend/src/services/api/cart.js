import { http } from "./http";
import { getApiErrorMessage } from "./error";
import { normalizeItem } from "./normalize";

export const attachCartMethods = (service) => {
  service.getCart = async () => {
    try {
      const { data } = await http.get("/cart");
      const items = data?.data?.items || [];
      return items.map(normalizeItem);
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
      return saved.map(normalizeItem);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to save cart"));
    }
  };
};
