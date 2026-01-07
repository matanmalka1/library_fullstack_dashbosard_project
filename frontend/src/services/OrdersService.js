import { httpClient } from "./shared/httpClient";
import { normalizeId, normalizeOrder } from "./shared/normalize";
import { BaseService } from "./BaseService";

class OrdersServiceClass extends BaseService {
  constructor() {
    super();
    this.httpClient = httpClient;
  }

  placeOrder(_userId, items = [], _totalPrice, shippingAddress) {
    const payloadItems = items.map((item) => ({
      bookId: normalizeId(item.bookId),
      quantity: item.quantity,
    }));

    return this.handlePost(
      "/orders",
      { items: payloadItems, shippingAddress },
      {
        normalize: (data) => normalizeOrder(data?.order),
        fallback: "Unable to place order.",
      }
    );
  }

  getOrders(userId) {
    const url = userId ? `/orders?userId=${userId}` : "/orders";

    return this.handleGetList(url, {
      dataKey: "orders",
      normalize: normalizeOrder,
      fallback: "Unable to load orders.",
    });
  }

  updateOrderStatus(orderId, status) {
    return this.handlePatch(
      `/orders/${orderId}/status`,
      { status },
      {
        normalize: (data) => normalizeOrder(data?.order),
        fallback: "Unable to update order.",
      }
    );
  }

  cancelOrder(orderId) {
    return this.handlePatch(
      `/orders/${orderId}/cancel`,
      {},
      {
        normalize: (data) => normalizeOrder(data?.order),
        fallback: "Unable to cancel order.",
      }
    );
  }
}

export const ordersService = new OrdersServiceClass();
