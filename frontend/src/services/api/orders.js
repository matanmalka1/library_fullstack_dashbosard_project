import { OrderStatus, UserRole } from "../../types";
import { getStore, setStore, KEYS } from "./core";
import { requireRole, requireUser } from "./auth.utils";

export const attachOrderMethods = (service) => {
  service.getOrders = async (userId) => {
    const orders = getStore(KEYS.ORDERS) || [];
    return userId ? orders.filter((o) => o.userId === userId) : orders;
  };

  service.placeOrder = async (userId, items, total, address) => {
    const authUser = requireUser();
    if (authUser.id !== userId && authUser.role !== UserRole.ADMIN) {
      throw new Error("Not authorized.");
    }
    const orders = await service.getOrders();
    const books = await service.getBooks();

    for (const item of items) {
      const book = books.find((b) => b.id === item.bookId);
      if (!book) {
        throw new Error("One or more items are no longer available.");
      }
      if (book.stockQuantity < item.quantity) {
        throw new Error(`Not enough stock for "${book.title}".`);
      }
    }

    const newOrder = {
      id: `ORD-${Math.random().toString(36).slice(2, 11).toUpperCase()}`,
      userId,
      items,
      total,
      shippingAddress: address,
      status: OrderStatus.PENDING,
      date: new Date().toISOString(),
      statusHistory: [
        { status: OrderStatus.PENDING, date: new Date().toISOString() },
      ],
    };

    orders.push(newOrder);
    setStore(KEYS.ORDERS, orders);

    items.forEach((item) => {
      const book = books.find((b) => b.id === item.bookId);
      if (book) book.stockQuantity -= item.quantity;
    });
    setStore(KEYS.BOOKS, books);

    return newOrder;
  };

  service.updateOrderStatus = async (id, status) => {
    requireRole([UserRole.ADMIN, UserRole.MANAGER]);
    const orders = await service.getOrders();
    const order = orders.find((o) => o.id === id);
    if (order) {
      order.status = status;
      order.statusHistory = order.statusHistory || [];
      order.statusHistory.push({ status, date: new Date().toISOString() });
    }
    setStore(KEYS.ORDERS, orders);
  };

  service.cancelOrder = async (id) => {
    const authUser = requireUser();
    const orders = await service.getOrders();
    const order = orders.find((o) => o.id === id);
    if (!order) return null;
    const canCancelAny =
      authUser.role === UserRole.ADMIN || authUser.role === UserRole.MANAGER;
    if (!canCancelAny && order.userId !== authUser.id) {
      throw new Error("Not authorized.");
    }
    if (order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED) {
      return order;
    }

    order.status = OrderStatus.CANCELLED;
    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status: OrderStatus.CANCELLED,
      date: new Date().toISOString(),
      note: "Refund initiated",
    });

    const books = await service.getBooks();
    order.items.forEach((item) => {
      const book = books.find((b) => b.id === item.bookId);
      if (book) {
        book.stockQuantity += item.quantity;
      }
    });
    setStore(KEYS.BOOKS, books);
    setStore(KEYS.ORDERS, orders);

    return order;
  };
};
