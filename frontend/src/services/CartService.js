import { httpClient } from "./shared/httpClient";
import { normalizeId, normalizeCartItem } from "./shared/normalize";
import { BaseService } from "./BaseService";

class CartServiceClass extends BaseService {
  getCart() {
    return this.handleRequest(async () => {
      const { data } = await httpClient.get("/cart");
      const items = data?.data?.items || [];
      return items.map(normalizeCartItem);
    }, "Unable to load cart.");
  }

  saveCart(_userId, items = []) {
    return this.handleRequest(async () => {
      const payloadItems = items.map((item) => ({
        bookId: normalizeId(item.bookId),
        quantity: item.quantity,
      }));
      const { data } = await httpClient.put("/cart", { items: payloadItems });
      const savedItems = data?.data?.items || [];
      return savedItems.map(normalizeCartItem);
    }, "Unable to save cart.");
  }

  clearCart() {
    return this.handleRequest(async () => {
      await httpClient.delete("/cart");
      return true;
    }, "Unable to clear cart.");
  }
}

export const cartService = new CartServiceClass();
