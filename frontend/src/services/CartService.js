import { httpClient } from "./shared/httpClient";
import { normalizeId, normalizeCartItem } from "./shared/normalize";
import { BaseService } from "./BaseService";

class CartServiceClass extends BaseService {
  constructor() {
    super();
    this.httpClient = httpClient;
  }

  getCart() {
    return this.handleGetList("/cart", {
      dataKey: "items",
      normalize: normalizeCartItem,
      fallback: "Unable to load cart.",
    });
  }

  saveCart(_userId, items = []) {
    const payloadItems = items.map((item) => ({
      bookId: normalizeId(item.bookId),
      quantity: item.quantity,
    }));

    return this.handlePut(
      "/cart",
      { items: payloadItems },
      {
        normalize: (data) => {
          const savedItems = data?.items || [];
          return savedItems.map(normalizeCartItem);
        },
        fallback: "Unable to save cart.",
      }
    );
  }

  clearCart() {
    return this.handleDelete("/cart", {
      fallback: "Unable to clear cart.",
    });
  }
}

export const cartService = new CartServiceClass();
