import { UserRole } from "../../types";
import { requireRole, requireUser } from "./auth.utils";
import { http } from "./http";
import { getApiErrorMessage } from "./error";
import { normalizeItem } from "./normalize";

export const attachOrderMethods = (service) => {
  const normalizeOrder = (order) => ({
    ...order,
    id: order._id || order.id,
    userId: order.user?._id || order.user || order.userId,
    date: order.placedAt || order.createdAt || order.date,
    items: (order.items || []).map(normalizeItem),
  });

  service.getOrders = async (userId) => {
    try {
      const params = userId ? { userId } : undefined;
      const { data } = await http.get("/orders", { params });
      const orders = data?.data?.orders || [];
      return orders.map(normalizeOrder);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to load orders"));
    }
  };

  service.placeOrder = async (userId, items, total, address) => {
    const authUser = requireUser();
    if (authUser.id !== userId && authUser.role !== UserRole.ADMIN) {
      throw new Error("Not authorized.");
    }
    try {
      const payload = {
        items: items.map((item) => ({
          bookId: item.bookId,
          quantity: item.quantity,
        })),
        total,
        shippingAddress: address,
      };
      const { data } = await http.post("/orders", payload);
      return normalizeOrder(data?.data?.order);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to place order"));
    }
  };

  service.updateOrderStatus = async (id, status) => {
    requireRole([UserRole.ADMIN, UserRole.MANAGER]);
    try {
      const { data } = await http.patch(`/orders/${id}/status`, { status });
      return normalizeOrder(data?.data?.order);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to update order"));
    }
  };

  service.cancelOrder = async (id) => {
    const authUser = requireUser();
    const canCancelAny =
      authUser.role === UserRole.ADMIN || authUser.role === UserRole.MANAGER;
    if (!canCancelAny) {
      // Backend will still enforce ownership for non-privileged users.
    }
    try {
      const { data } = await http.patch(`/orders/${id}/cancel`);
      return normalizeOrder(data?.data?.order);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to cancel order"));
    }
  };
};
