import { httpClient } from "./shared/httpClient";
import { normalizeId, normalizeOrder } from "./shared/normalize";
import { BaseService } from "./BaseService";

class OrdersServiceClass extends BaseService {
  placeOrder(_userId, items = [], _totalPrice, shippingAddress) {
    return this.handleRequest(async () => {
      const payloadItems = items.map((item) => ({
        bookId: normalizeId(item.bookId),
        quantity: item.quantity,
      }));
      const { data } = await httpClient.post("/orders", {
        items: payloadItems,
        shippingAddress,
      });
      return normalizeOrder(data?.data?.order);
    }, "Unable to place order.");
  }

  getOrders(userId) {
    return this.handleRequest(async () => {
      const params = userId ? { userId } : undefined;
      const { data } = await httpClient.get("/orders", { params });
      const orders = data?.data?.orders || [];
      return orders.map(normalizeOrder);
    }, "Unable to load orders.");
  }

  updateOrderStatus(orderId, status) {
    return this.handleRequest(async () => {
      const { data } = await httpClient.patch(`/orders/${orderId}/status`, {
        status,
      });
      return normalizeOrder(data?.data?.order);
    }, "Unable to update order.");
  }

  cancelOrder(orderId) {
    return this.handleRequest(async () => {
      const { data } = await httpClient.patch(`/orders/${orderId}/cancel`);
      return normalizeOrder(data?.data?.order);
    }, "Unable to cancel order.");
  }
}

export const ordersService = new OrdersServiceClass();
